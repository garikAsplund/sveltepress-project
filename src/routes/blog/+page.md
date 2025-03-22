# Introducing Hyperlight: Virtual machine-based security for functions at scale

**November 7, 2024 • 6 min read**

*By Yosh Wuyts, Senior Developer Advocate and Ralph Squillace, Principal Product Manager*

The Microsoft Azure Core Upstream team is excited to announce the Hyperlight project, an open-source Rust library you can use to execute small, embedded functions using hypervisor-based protection for each function call at scale. And it can do it at a speed that enables each function request to have its own hypervisor for protection. That's fast. That's new.  

In this post, we'll go deeper into the motivation behind creating Hyperlight, explain how Hyperlight works under the hood, and finally, go through a basic code example. Keep reading to learn more about Hyperlight. Or, if you want to jump right in and get started with Hyperlight, visit the project's [GitHub repositories](https://aka.ms/hyperlight-dev).

> **Visit the Hyperlight repository on GitHub**
>
> Try the sample of Hyperlight with Kernel-based Virtual Machine.
>
> [Get started now](https://github.com/hyperlight-dev/hyperlight)

## Why fast and secure are hard

Running things securely *and* quickly is a core objective for Microsoft, as it is for any number of developers and organizations around the world. Doing both is very hard.  

If security is your highest priority, as it is for a public cloud like Microsoft Azure, you use a **virtual machine** (VM) managed by a hypervisor such as Hyper-V or Kernel-based Virtual Machine (KVM). While secure, VMs are not known for having fast cold starts or a small footprint—though modern ones can be faster and smaller in comparison to those built a decade ago. Hypervisors have been the battle-tested wall between untrusted code and trusted applications for more than 20 years. Hyper-V, for example, is a foundational component of Azure and has delivered on that promise for many years. 

Cold start performance is critical to running small bits of code that respond to events. Prior to Hyperlight, to achieve low-latency cold starts, infrastructure providers needed to keep warm VMs at the ready to execute these bits of code. Each VM can only be used by a single customer as it is the secure isolation boundary between their code and other customers' code. Additionally, these functions often use a small amount of compute resources themselves and are often overshadowed by the compute resources required to run the VM itself. This costs money and wastes compute resources.  

## Introducing Hyperlight 

We built Hyperlight as a library to execute functions as fast as possible while isolating those functions within a VM. Developers and software architects can use Hyperlight to add serverless customizations to their application that are able to securely run untrusted code. Hyperlight enables these customizations in a wide range of scenarios: for Internet of Things (IoT) gateway function embedding, usage in industrial automation, high-throughput cloud services, and so on. 

Hyperlight is able to create new VMs in one to two milliseconds. While this is still slower than using sandboxed runtimes like V8 or Wasmtime directly, with Hyperlight we can take those same runtimes and place them inside of a VM that provides additional protection in the event of a sandbox escape.  

To give you a sense of how fast Hyperlight is, a one to two millisecond cold start for each VM is fast enough that it becomes practical to spin up VMs as needed in response to events. That *also* makes it possible to scale to zero, meaning that depending upon your application, you might not need to keep any VMs idling just in case any work comes in. That's not as fast as native functions or sandboxed runtimes, but it is significantly more secure, and about two orders of magnitude faster than traditional VM architectures:

- **< 0.03 milliseconds**: The time it takes to start a new Wasmtime sandbox 
- **1-2 milliseconds**: The time it takes to spawn a new Hyperlight micro-VM 
- **> 120 milliseconds**: The time it takes to spawn an optimized, traditional VM 

## Not your standard hypervisor manager 

We've made some pretty big claims in this post so far, and many of you will rightfully be wondering how we're able to claim several orders of magnitude improvement on cold start speeds for something as ubiquitous as VMs. The short answer is: by doing significantly less work. The following diagram shows at a very high level how Hyperlight works to deliver on its requirements.  

![Visual overview of hyperlight, showing a host process managing a hypervisor that contains a guest microvm](https://opensource.microsoft.com/blog/wp-content/uploads/2024/11/Hyperlight-1-2-seconds-png.webp)

Rather than creating generalized compute environments intended to host traditional operating systems, all Hyperlight does is create a linear slice of memory and assign it a virtual central processing unit (CPU). There is no virtual device mapping, no booting of kernels, and no starting of processes—at least, not in a traditional way. Within Hyperlight, we run so-called **VM guests**. These are special programs that combine a specialized kernel with an application runtime into a single loadable program.  

Using Hyperlight, applications can execute user-supplied code and users can have the confidence that the application is protected from the function code by a hypervisor but take advantage of the speed of the function engine. This creates new opportunities for serverless embedding, whether using [WebAssembly components](https://aka.ms/wasm-components) or other kinds of processes, like standalone C or Rust functions, both of which have examples in the repository.  

## Using Hyperlight from Rust 

Alright, it's time to actually take a look at what it's like to use Hyperlight from the Rust programming language. In this sample, we'll be using a pre-defined "simple" guest which exposes a single function: "PrintOutput". We're going to be calling that function with a custom string to print. We're also going to show how we can expose functions from the VM host to the VM guest. 

We first start by defining our imports. Hyperlight has a dedicated library for setting up the VM host, multiple custom VM guests, and another common library for types and functionality shared by the host and guest. 

```
use std::thread; 
use std::time::Duration; 
use hyperlight_common::flatbuffer_wrappers::function_types::{ParameterValue, ReturnType}; 
use hyperlight_host::func::HostFunction0; 
use hyperlight_host::sandbox_state::sandbox::EvolvableSandbox; 
use hyperlight_host::sandbox_state::transition::Noop; 
use hyperlight_host::{MultiUseSandbox, UninitializedSandbox}; 
```

In Rust binaries, we use fn main as their entry point, which we'll be doing here. First things first: we're going to create a new sandbox that has not yet been initialized. To do that, we need to provide it with a guest, which in this case we're getting from our utility testing library. 

```
fn main() -> hyperlight_host::Result<()> { 
    let guest = hyperlight_testing::simple_guest_as_string().unwrap(); 
    let guest = hyperlight_host::GuestBinary::FilePath(guest); 
    let mut uninit_sandbox = UninitializedSandbox::new( 
        guest, 
        None, // default configuration 
        None, // default run options 
        None, // default host print function 
    )?; 
```

With our guest program loaded into the sandbox, we can now begin to do additional things with our sandbox. Though our guest won't be calling this function, let's register a function "sleep_5_seconds" that sleeps the host for five seconds. You can think of this as registering a new system call that is available to the VM guest. 

```
fn sleep_5_secs() -> hyperlight_host::Result<()> { 
    thread::sleep(Duration::from_secs(5)); 
    Ok(()) 
} 
let sleep_5_secs = Arc::new(Mutex::new(sleep_5_secs)); 
sleep_5_secs.register(&mut uninit_sandbox, "Sleep5Secs")?; 
```

Now that we're done setting up our sandbox, it's time to create a snapshot of the current sandbox state. This is done by calling the "evolve" method, which will change our sandbox from uninitialized to initialized. This kind of snapshotting is useful for real workloads, where typically you'll want to load a guest, load a program into the guest, and then snapshot that so the future initialization cost is amortized. 

```
let mut sandbox: MultiUseSandbox = uninit_sandbox.evolve(Noop::default())?; 
```

With that, we're ready to call functions inside the VM guest. We're going to be calling the "PrintOutput" function with the string: "Hello from the VM guest". This will print the message to stdout and then return. While this may end up feeling a little more verbose than making regular function calls, everything about this should feel familiar. 

```
    let fn_name = "PrintOutput"; // function defined by the VM guest 
    let ret_ty = ReturnType::Int; 
    let message = "Hello from a VM guest!\n".to_string(); 
    let params = Some(vec![ParameterValue::String(message)]); 
    let result = sandbox.call_guest_function_by_name(fn_name, ret_ty, params); 
    assert!(result.is_ok()); 
    Ok(()) 
} 
```

And that's it! If we run the code it should print: "Hello from the guest VM" and exit successfully. Congrats, you now understand the basics of Hyperlight. 

## The path forward 

Microsoft is pleased to share that Hyperlight will be submitted to the Cloud Native Computing Foundation (CNCF) as a sandbox project. The intent is for Hyperlight to benefit from the CNCF community's guidance, support, governance, best practices, and resources. Hyperlight's incubation and submission to a foundation builds on Microsoft efforts to empower developers by creating open, flexible technology for cloud and edge applications. Our recent work with WebAssembly in the [SpinKube project](https://www.spinkube.dev/) is part of that work. 

We believe our latest contribution, Hyperlight, can be a vital part of the cloud-native landscape and help advance cloud-native technologies.  

## Get involved with Hyperlight 

As an open-source project licensed under the Apache 2.0 license, Hyperlight underscores Microsoft's commitment to fostering innovation and collaboration within the tech community. We welcome developers, solution architects, and IT professionals to help build and enhance Hyperlight. To get started with Hyperlight, please visit the repo at [Hyperlight](https://aka.ms/hyperlight-dev) and let us know what you think. 

[**Get started using Hyperlight today.**](https://github.com/hyperlight-dev/hyperlight)

---

### About the authors:

**Yosh Wuyts**  
*Senior Developer Advocate*

Yosh is a Cloud Native Advocate at Microsoft based in Copenhagen, Denmark. They're a member of the Rust Async WG and a Bytecode Alliance Recognized contributor. They're also a proud cat dad and enthusiast cook.

**Ralph Squillace**  
*Principal Product Manager*

Principal Product Manager, Microsoft Azure Core Upstream. Currently, he is Microsoft's representative on the board of the Bytecode Alliance Foundation and is responsible for WebAssembly outside of the browser at the company. Ralph has worked with Linux for several decades and had worked on many Azure services through the years. His team is also responsible for the ContainerD project Runwasi, part of the SpinKube project.