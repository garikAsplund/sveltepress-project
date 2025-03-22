# Build a Hyperlight C guest to securely execute JavaScript

**March 10, 2025 • 7 min read**

*By Ludvig Liljenberg, Software engineer, Microsoft*

[Hyperlight](https://aka.ms/hyperlight-dev) is an open-source project for safely executing untrusted code inside hardware-protected micro-virtual machines (micro-VMs) with extremely small size and low latency. (Earlier articles have [introduced Hyperlight](https://aka.ms/hyperlight-announcement) and showed [a Rust-based example of how it can be used effectively](https://aka.ms/hl-kubecon-demo-post).) As opposed to general purpose virtual machine managers (VMMs), Hyperlight does not boot any operating system inside the hardware-protected guest and does not initialize any devices, which is how the cold start time of Hyperlight can be well less than 2ms.

This performance benefit, however, doesn't come for free. You need to create a "guest" application that runs inside a micro-VM and a host application that uses the Hyperlight library to execute the guest application in a hypervisor (without an operating system).

[Join the Hyperlight community](https://aka.ms/hyperlight-dev)

This article will show you how to do all this and have fun with some JavaScript. We'll write the guest program using the QuickJS JavaScript engine in C using the Hyperlight-guest C API, we'll write the host CLI application using Rust, and then you can pass any JavaScript file to the program for execution safely inside a micro-VM. If you're just interested in running the final code, you can find it [here](https://aka.ms/hyperlight-quickjs). That repository uses [`just`](https://github.com/casey/just) commands to make building and running easier, but this article spells out the underlying commands explicitly to be clear.

## Setup

To successfully follow this post, please ensure you have the following prerequisites:

- An x86_64 machine running either Linux or Windows with Windows Subsystem for Linux (WSL).
  - Hyperlight requires the KVM Linux kernel module.
  - If operating on a virtual machine, nested virtualization must be activated.
- Rust installed with version 1.80 or higher.
- Clang (versions 14 and 18 have been tested).

## Building the application

You can clone and build the entire application from the repository. However, let's walk through what happens.

## Creating the Hyperlight guest

To execute JavaScript inside a Hyperlight micro-VM, we'll use the QuickJS JavaScript engine. Let's begin by writing a simple guest function which takes in arbitrary JavaScript code as a string, executes the given code using QuickJS, and then returns the result as a string. Create a new folder called `hyperlight-demo`. This folder will contain all the code for this demo, including both the guest and host. For the rest of this blog, we'll assume all commands you run from this point forward are executed from within this `hyperlight-demo` directory. Inside `hyperlight-demo`, create a new folder called `guest`, and in `guest`, create a file called `main.c` and [copy or put this linked code](https://github.com/ludfjig/hyperlight-samples/blob/main/guest/main.c) in it. This function creates a new QuickJS Runtime and Context, evaluates the given string as JavaScript, and then returns the result as a string.

Next, we'll need to hook this up to Hyperlight by registering the guest function using the Hyperlight-guest C-API. By registering the function, we allow it to be called later from outside the micro-VM. We'll name the guest function `EvalScript`, specify that it takes a single string as a parameter, and that it also returns a string back to the host. Add the [following code](https://github.com/ludfjig/hyperlight-samples/blob/main/guest/main.c#L37-L41) below the `guest_function` definition in `main.c`:

```javascript
HYPERLIGHT_WRAP_FUNCTION(guest_function, String, 1, String);

void hyperlight_main(void) {
    HYPERLIGHT_REGISTER_FUNCTION("EvalScript", guest_function);
}
```

Finally, the Hyperlight guest C-API requires that you define a function called `c_guest_dispatch_function`, to handle dynamic guest function calls that have not been registered. Since we don't care about these kinds of function calls, we can simply return null. Add the [following](https://github.com/ludfjig/hyperlight-samples/blob/main/guest/main.c#L45-L47) to your main.c:

```javascript
hl_Vec *c_guest_dispatch_function(const hl_FunctionCall *function_call)    {
    return NULL;
}
```

Finally, we want compile this to an Executable and Linkable Format (ELF) binary using the clang compiler. 

### Things to be careful about 

First, when compiling a C guest for Hyperlight you must use Hyperlight's version of libc, which is a modified version of musl. To get this, first download the `include.tar.gz` artifact from Hyperlight's [release page](https://github.com/hyperlight-dev/hyperlight/releases) on GitHub using the following command (using **wget**, **curl**, or another fetching tool):

```javascript
wget https://github.com/hyperlight-dev/hyperlight/releases/download/v0.2.0/include.tar.gz -P guest/include
```

This includes all the libc headers that Hyperlight supports, as well as `hyperlight_guest.h`, which provides the various function definitions required for communicating between the host from the guest. It's important you don't use your system's own libc headers. Extract the tarball using `tar -xvf guest/include/include.tar.gz -C guest/include/`. You should now see three new folders inside your `guest/include` folder.

Second, we'll download `hyperlight-guest-c-api-linux.tar.gz`, also from Hyperlight's [release page](https://github.com/hyperlight-dev/hyperlight/releases) on GitHub.

```javascript
wget https://github.com/hyperlight-dev/hyperlight/releases/download/v0.2.0/hyperlight-guest-c-api-linux.tar.gz -P guest/libs
```

It contains `libhyperlight_guest.a`, which is a statically compiled library that includes both a modified version of libc, as well as specific Hyperlight functions for communicating with the host. Extract the tarball using the following command

```javascript
tar -xvf guest/libs/hyperlight-guest-c-api-linux.tar.gz -C guest/libs/ 
```

Third, we need a copy of QuickJS. We can download it directly from the author's website using the following command, `wget https://bellard.org/quickjs/quickjs-2024-01-13.tar.xz`, followed by `tar -xvf quickjs-2024-01-13.tar.xz`to extract it.

At this point, your folder structure should look like this when you run `tree -d`:

![A view of a directory tree using the tree -d command](https://opensource.microsoft.com/blog/wp-content/uploads/2025/03/treed.webp)

Finally, let's compile everything using clang. Run the following command:

```javascript
clang -I guest/include/include -I guest/include/musl/include -I guest/include/musl/arch/x86_64/ -I guest/include/printf -I guest/include -I quickjs-2024-01-13 guest/main.c quickjs-2024-01-13/quickjs.c quickjs-2024-01-13/libregexp.c quickjs-2024-01-13/libunicode.c quickjs-2024-01-13/cutils.c quickjs-2024-01-13/libbf.c -O3 -DHYPERLIGHT -DCONFIG_VERSION=\"2024-01-13\" -D_GNU_SOURCE -DCONFIG_BIGNUM -nostdinc -nostdlib -fpie -D putchar=_putchar -Wno-macro-redefined -Wno-ignored-attributes -Wno-implicit-const-int-float-conversion --target=x86_64-unknown-elf -e entrypoint -l hyperlight_guest_capi -L guest/libs/release -o quickjs-guest
```

Now that's some fun, right there.

A quick explanation is in order to describe some of the options here. Importantly, we use `-nostdinc` to not include the standard system #include directories, and the `-nostdlib` linker option to not link any unwanted libraries. The `-I` flags tell clang where to look for header files. We use the `--target=x86_64-unknown-elf` to build an OS-independent ELF file, since we are running in a freestanding environment without OS. We use `-fpie` to make the code relocatable, which is a requirement for Hyperlight. We use `-e entrypoint` to tell the linker to look for an entrypoint called "entrypoint". We silence some warnings and set some necessary defines.

### What to do if the command doesn't work

We get a bunch of errors related to missing files and calls to undeclared library functions. The errors are saying that QuickJS uses parts of libc that Hyperlight doesn't yet support. For example, Hyperlight micro-VMs have no concepts of a filesystem, and as such, we have stripped our version of libc of all functions that take in file descriptors. Another current limitation of Hyperlight is that it is single-threaded, and thus we must get rid of some pthread usage in QuickJS. Luckily, QuickJS doesn't require much from the environment, and we have a [small QuickJS patch available](https://github.com/ludfjig/hyperlight-samples/blob/c33a451672720e1aa78d593efe98a3e2e1cdcd0c/quickjs_hyperlight.patch) to fix up these errors. Apply the patch using the following command:

```javascript
curl -sL https://raw.githubusercontent.com/ludfjig/hyperlight-samples/c33a451672720e1aa78d593efe98a3e2e1cdcd0c/quickjs_hyperlight.patch | patch -p1 -d quickjs-2024-01-13/
```

Use the same clang command given above to compile the guest again, but this time there should be no errors, and if everything worked correctly, you should see a new file called quickjs-guest, ready to be used by our Hyperlight host API. Note, however, that this is not a regular ELF file that can be run outside Hyperlight. For example, it has no regular main function. Hyperlight, however, knows how to execute it inside a micro-VM.

## Writing the Hyperlight host application

Now that the guest is finished, we'll need to create a program that runs on the host and uses Hyperlight to load our `quickjs-guest` binary into a micro-VM. From the `hyperlight-demo` directory, run `cargo new --bin host` to create a new rust binary application in a new host directory. Add a dependency on the `hyperlight-host` crate by running `cargo add hyperlight-host@0.2.0 --manifest-path host/Cargo.toml`. Now let's create a simple CLI that reads stdin into a string. We then use the Hyperlight-host API to create a sandbox, load our binary, call our guest function "`EvalScript`" and pass in the string, receive, and then print out the result of our evaluating our JavaScript code. The entire CLI "main.rs" file should match [this code linked here](https://github.com/ludfjig/hyperlight-samples/blob/main/host/src/main.rs).

Finally, compile and run the code, while passing in some JavaScript to be evaluated on stdin:

```javascript
echo "1+1" | cargo run --manifest-path=host/Cargo.toml
```

![The number 2 being printed after running the command](https://opensource.microsoft.com/blog/wp-content/uploads/2025/03/2.webp)

The first time you run it, it can take a while to compile everything, but subsequent runs should be must faster. What is cool is every time we run this, we create a totally new hardware-protected micro-VM, execute code inside, then tear it down again.

Let's try something more complicated like calculating 1,000,000 digits of pi. This is a code sample taken from QuickJS's website, and it uses the BigFloat QuickJS extension. Create a new folder called "samples" and copy [this file](https://github.com/ludfjig/hyperlight-samples/blob/main/samples/pi_bigfloat.js) into a new file called "pi_bigfloat.js" in the "samples" directory.

Run it using `cargo run --manifest-path=host/Cargo.toml < samples/pi_bigfloat.js`, and it should output the first one million digits of pi.

![The first few digits of pi being printed after running the command cargo run.](https://opensource.microsoft.com/blog/wp-content/uploads/2025/03/pi-3.webp)

And that's it. In this tutorial, we used Hyperlight to create a Rust CLI application that runs JavaScript inside a secure micro-VM. To do this, we created a guest ELF binary written in C that uses QuickJS to execute JavaScript. We then wrote a host-side application that uses Hyperlight to create a new micro-VM. The host application then loads the guest binary into the micro-VM and lets the VM execute it.

## A note on KVM

Q: I get "Error: NoHypervisorFound" when running the host application

A: You might not have access to the `/dev/kvm` device. First make sure it exists by running `ls -l /dev/kvm`. If it does exist, it might be a permission issue if your current user does not have access to it. For more information, you can check out [KVM/Installation – Community Help Wiki](https://help.ubuntu.com/community/KVM/Installation). It may also require ensuring that [nested virtualization is enabled in WSL](https://learn.microsoft.com/en-us/windows/wsl/wsl-config#main-wsl-settings).

## Get involved

[Learn more about Open source on Azure](https://azure.microsoft.com/en-us/solutions/open-source/?msockid=0f29fd8c9c2668ca1142e9e19dbf6990)

Hyperlight is an actively evolving open-source project and welcomes new contributions! To get started, view code samples, see our community, and [learn more on GitHub](https://aka.ms/hyperlight-dev). Recently, Hyperlight has applied to join the [Cloud Native Computing Foundation](https://github.com/cncf/sandbox/issues/312) (CNCF) Sandbox.

---

### About the author:

**Ludvig Liljenberg**  
*Software engineer, Microsoft*

Ludvig is a software engineer at Microsoft. He enjoys working on open-source projects, and is interested in anything relating to Rust, wasm, and virtualization.