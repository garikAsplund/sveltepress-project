# Hyperlight: Achieving 0.0009-second micro-VM execution time

**February 11, 2025 • 4 min read**

*By Danilo Chiarlone, Software engineer, Microsoft*

In our previous post, [we introduced Hyperlight](https://aka.ms/hyperlight-announcement), a Rust library designed to let developers leverage hypervisor technologies like kernel-based virtual machine (KVM) or Hyper-V to execute untrusted code within micro virtual machines—without the overhead of a full operating system and with cold start performance measured in microseconds to low milliseconds. 

Fast forward to **KubeCon North America 2024**, held just this past November, where Hyperlight took the keynote stage for an exciting introduction and demonstration. In this post, we'll take the demo application we used on stage and show how it demonstrates one way you can use Hyperlight in your applications. 

## What happened on the big stage? 

During the keynote, Microsoft's [Rita Zhang demonstrated](https://youtu.be/f8ornY7h2KE?feature=shared&t=290) how Hyperlight can execute multiple functions inside a micro virtual machine and return results in just **0.0009 seconds on average**. 

![Microsoft's Rita Zhang stands on the KubeCon stage to introduce and demo the Hyperlight project.](https://opensource.microsoft.com/blog/wp-content/uploads/2025/02/image-1-1024x401.webp)

## Taking the demo app apart 

Let's take a closer look at the demo and how it uses hyperlight to enable that kind of speed for a hardware-protected function! The following graphic describes the routes implemented in a simple Rust-based web server designed to mimic a developer-built application: 

![A graphic of the routes the demo application has, ending in hyperlight. There are six routes all told. This article is about those ending in /warm and /cold.](https://opensource.microsoft.com/blog/wp-content/uploads/2025/02/image-2.webp)

This application implements the following routes: 

- hyperlight/hello-world/cold 
- hyperlight/hello-world/warm 
- hyperlight/hello-world/safety/deref-raw-null-prt (only in debug mode) 
- hyperlight/hello-world/vm-count 

 
What happens? Let's look at the host application, which starts [at this line](https://github.com/hyperlight-dev/hyperlight-kubeconNA2024-demo/blob/9fbd85f9c8c5b67c9f607978786889801090d4aa/demo-main/src/main.rs#L15) for a **/cold** virtual machine per request. That is implemented in hello_world.rs, [in this line](https://github.com/hyperlight-dev/hyperlight-kubeconNA2024-demo/blob/9fbd85f9c8c5b67c9f607978786889801090d4aa/demo-main/src/hyperlight/hello_world.rs#L18). 

This function will create a brand-new hardware-protected micro virtual machine for each request that comes in (and destroy it afterward). Then the host application routes the cold request to the routed function but executes inside the guest micro virtual machine. [That happens here](https://github.com/hyperlight-dev/hyperlight-kubeconNA2024-demo/blob/9fbd85f9c8c5b67c9f607978786889801090d4aa/demo-main/src/hyperlight/hello_world.rs#L36-L41): 

```
            let message = "Hello, World! I am executing inside of a VM :)\n".to_string(); 
            multi_use_sandbox 
                .call_guest_function_by_name( 
                    "PrintOutput", 
                    ReturnType::Int, 
                    Some(vec![ParameterValue::String(message.clone())]), 
                ) 
                .unwrap();
```

But to simulate work, this function immediately calls back into the host to print something there because there isn't a print command inside the micro virtual machine (remember, there's no operating system and therefore no system print calls):

```
fn print_output(message: &str) -> hyperlight_guest::error::Result<Vec<u8>> {
    call_host_function(
        "HostPrint",
        Some(Vec::from(&[ParameterValue::String(message.to_string())])),
        ReturnType::Int,
    )?;
    let result = get_host_value_return_as_int()?;
    Ok(get_flatbuffer_result_from_int(result))
}
```

The message is printed on the host's console, and the host function returns to the micro virtual machine guest, which then returns control back to the host and stops executing. Both cold and warm functions use this very same host->guest->host callback->guest-to-host path for each web request. 

In the demo on stage, we sent 1,000 requests to the warm function using five simultaneous connections, to the web server. Upon receiving a request, the web server—almost like a home-baked Function-as-a-Service (FaaS) platform—either creates a new micro-virtual machine (like we see if we use the **/hyperlight/hello-world/cold** endpoint) or reuses pre-created micro virtual machines to execute potentially untrusted code. 

For the demo, our untrusted guest code is a pre-configured x86_64 native Executable and Linkable Format (ELF) binary that implements [each hello-world function](https://github.com/hyperlight-dev/hyperlight-kubeconNA2024-demo/blob/main/demo-guest/src/main.rs), but Hyperlight also runs WebAssembly or even JavaScript directly. (In future blog posts we'll dive deeper into these use cases!) 

During the 0.0009 seconds of the response, our host accessed a pre-warmed micro virtual machine. This approach skips several initialization steps, enabling faster execution. Here's what's already in place: 

- The virtual machine guest—our supposed untrusted code—has already been loaded into memory and is ready for execution inside the micro VM. 
- Key memory regions, such as the guest virtual machines stack, heap, and communication buffers between the guest and host, have been pre-allocated. 
- The micro virtual machine itself has been instantiated, with shared memory already mapped to it. 
- A virtual CPU (vCPU) has been created within the micro virtual machine, complete with initialized registers and appropriate values. 

 
With all that already in place, the HTTP server simply pulls a pre-warmed micro virtual machine from the warm pool and calls a guest function. This involves writing potential parameters for the function call into the shared memory region between the VM guest and the HTTP server host, followed by issuing a VM run command.

During this virtual machine run, the virtual machine guest calls back into the host operating system's standard output to print "Hello, World," then returns back into VM guest. Finally, the guest yields back to the host HTTP server, signaling the successful execution of the function call—and the microVM guest is recycled, its memory reset. The command uses the [hey load tool](https://github.com/rakyll/hey): **hey -n 1000 -c 5 http://localhost:8080/hyperlight/hello-world/warm**. That's two virtual machine exits completed in just 0.0009 seconds on stage! The **hey** tool also gives a nice histogram: 

![Image displays a histogram showing an average latency of .0009 seconds per micro-vm.](https://opensource.microsoft.com/blog/wp-content/uploads/2025/02/image-1024x764.webp)

This demonstration highlights how Hyperlight can bridge the gap between performance and security. Enabling near-instant function execution opens possibilities for handling real-time workloads, optimizing serverless platforms, and securely running untrusted code in production environments. 

To take a closer look at the demo code, you can [check out its GitHub repository](https://github.com/hyperlight-dev/hyperlight-kubeconNA2024-demo). Experiment with the code, try running your own untrusted functions, and explore how Hyperlight can fit into your applications! 

## What's coming next? 

As a newly open-sourced project, Hyperlight is actively evolving and [has submitted the application](https://github.com/cncf/sandbox/issues/312) to join the **Cloud Native Computing Foundation (CNCF)** Sandbox. This milestone represents an exciting opportunity for developers to shape the project's future, whether by contributing code, submitting issues, or sharing feedback on its use cases. 

Get involved by exploring the repository, trying out the demo, and engaging with the Hyperlight community. Join our bi-weekly community meetings on Wednesdays at 9 AM PST to **connect with maintainers, share ideas, and collaborate on making Hyperlight even better**. [Put yourself or your questions on the agenda](https://aka.ms/hyperlight-agenda)!

:::info[Microsoft Open Source]
Open Source enables Microsoft products and services to bring choice, technology, and community to our customers.
[Get involved](https://opensource.microsoft.com/)
:::

---

### About the author:

**Danilo Chiarlone**  
*Software engineer, Microsoft*

Danilo Chiarlone is a software engineer at Microsoft on a project called Hyperlight. He previously worked on SpiderLightning/slight, and is a champion of 7 WASI proposals: wasi:http, wasi;keyvalue, wasi:config, wasi:blobstore, wasi-distributed-lock-service, wasi:messaging, and wasi:sql. Dan loves to help people learn; he teaches Rust and WebAssembly on his YouTube Channel - danlogs and is writing a WebAssembly on the server book for Manning.