// Top features for cards
const coreFeatures = [
    {
      title: "Ultra-Fast VM Creation",
      description: "Create new micro-VMs in just 1-2 milliseconds, about 100x faster than traditional hypervisor approaches, making it practical to spin up VMs on-demand for individual function calls."
    },
    {
      title: "Hypervisor-Level Security",
      description: "Execute untrusted code with real hypervisor-based protection for each function call, providing stronger isolation than sandboxed runtimes while maintaining exceptional performance."
    },
    {
      title: "OS-Free Micro VMs",
      description: "Run micro VMs without a kernel or OS, significantly reducing overhead while still providing the full security benefits of hypervisor-based isolation."
    },
    {
      title: "Multi-Platform Support",
      description: "Works on Windows, Linux, WSL2, and Azure Linux across different hypervisors (WHP, KVM, mshv), providing flexibility across environments."
    }
  ];
  
  // Potential website sections
 export const websiteSections = [
    {
      title: "Host/Guest Architecture",
      description: "Hyperlight uses a powerful bidirectional communication model between host and guest, enabling flexible but controlled interactions.",
      subsections: [
        {
          title: "Host Functions",
          description: "Functions implemented by the host application that guests can call when running"
        },
        {
          title: "Guest Functions",
          description: "Functions implemented by the guest that the host can call to execute tasks in isolation"
        },
        {
          title: "Secure Communication",
          description: "All communication happens through a controlled API surface that maintains strict isolation"
        }
      ]
    },
    {
      title: "Customizable API Surface",
      description: "Take complete control over what your guest code can access, maintaining security by default.",
      subsections: [
        {
          title: "Minimal By Default",
          description: "Guests start with access to only basic printing capabilities to maintain security"
        },
        {
          title: "Explicit Function Registration",
          description: "Host functions must be explicitly registered to be accessible by guests"
        },
        {
          title: "Fine-Grained Control",
          description: "Register exactly the functions you want your guests to be able to call, no more and no less"
        },
        {
          title: "Typed Interfaces",
          description: "Well-defined parameter types and return values for safe cross-boundary communication"
        }
      ]
    },
    {
      title: "Developer Experience",
      description: "Hyperlight provides a smooth developer experience for both host and guest development.",
      subsections: [
        {
          title: "Language Support",
          description: "Write guests in Rust or C using dedicated Hyperlight guest libraries"
        },
        {
          title: "Simple Integration",
          description: "Easy-to-use APIs for embedding Hyperlight in your applications"
        },
        {
          title: "Active Community",
          description: "Regular community meetings and active Slack channel for support and collaboration"
        },
        {
          title: "Comprehensive Documentation",
          description: "Examples, guides, and API documentation to help you get started quickly"
        }
      ]
    },
    {
      title: "Use Cases",
      description: "Hyperlight enables secure function execution in a wide range of scenarios:",
      subsections: [
        {
          title: "Serverless Customizations",
          description: "Add secure serverless customization to your applications"
        },
        {
          title: "IoT Gateway Embedding",
          description: "Securely run untrusted code on IoT gateway devices"
        },
        {
          title: "Industrial Automation",
          description: "Isolate automation functions for safety and reliability"
        },
        {
          title: "High-Throughput Cloud Services",
          description: "Process many requests with minimal overhead and maximum isolation"
        },
        {
          title: "User-Defined Functions",
          description: "Allow users to safely run their own code within your application"
        }
      ]
    },
    {
      title: "Getting Started",
      description: "Start using Hyperlight in your projects with these simple steps:",
      subsections: [
        {
          title: "Prerequisites",
          description: "Set up your development environment with the required dependencies"
        },
        {
          title: "Installation",
          description: "Add Hyperlight to your project and configure for your environment"
        },
        {
          title: "First Micro VM",
          description: "Create your first guest application and run it from a host"
        },
        {
          title: "Advanced Configuration",
          description: "Customize Hyperlight for your specific use case and performance requirements"
        }
      ]
    },
    {
      title: "Performance Metrics",
      description: "Hyperlight delivers exceptional performance for isolated function execution:",
      subsections: [
        {
          title: "1-2ms VM Creation",
          description: "Create new micro VMs orders of magnitude faster than traditional VMs"
        },
        {
          title: "Minimal Memory Overhead",
          description: "Just 64KB stack and 128KB default heap size per micro-VM"
        },
        {
          title: "Scale to Zero",
          description: "Eliminate idle resources when no work is needed"
        },
        {
          title: "High Density",
          description: "Run thousands of isolated functions on a single host"
        }
      ]
    }
 ];
  
 // Even more impressive performance metrics from the KubeCon demo
const demoPerformanceInsights = {
    title: "Blazing Fast Performance",
    description: "Demonstrated at KubeCon North America 2024, Hyperlight achieved incredible execution speed:",
    points: [
      "0.0009 seconds (less than 1ms) average execution time for pre-warmed micro-VMs",
      "Successfully handled 1,000 requests with 5 simultaneous connections",
      "Complete host→guest→host callback→guest-to-host path for each request",
      "Two virtual machine exits completed in under 1 millisecond"
    ]
  };
  
  // Warm vs Cold execution model explained
  const executionModels = {
    title: "Flexible Execution Models",
    description: "Hyperlight supports both cold and warm execution paths to suit your needs:",
    models: [
      {
        title: "Cold Execution",
        description: "Creates a new micro-VM for each request (and destroys it afterward)",
        benefits: [
          "Maximum isolation between requests",
          "Clean state for each execution",
          "Still extremely fast compared to traditional VMs"
        ]
      },
      {
        title: "Warm Execution",
        description: "Reuses pre-created micro-VMs from a pool for even faster performance",
        benefits: [
          "Ultra-fast 0.0009 second execution time",
          "Skips initialization steps like memory allocation and VM instantiation",
          "Pre-allocated memory regions (stack, heap, communication buffers)",
          "Recycled after use with memory reset"
        ]
      }
    ]
  };
  
  // Technical architecture insights
  const technicalArchitecture = {
    title: "How It Works",
    description: "Hyperlight achieves its performance through a sophisticated yet minimal architecture:",
    components: [
      {
        title: "Pre-Warmed Micro-VMs",
        description: "Micro-VMs with untrusted code already loaded, memory allocated, and vCPU initialized"
      },
      {
        title: "Shared Memory Communication",
        description: "Parameters passed through shared memory regions between guest and host"
      },
      {
        title: "Multi-Format Support",
        description: "Runs x86_64 native ELF binaries, WebAssembly, or even JavaScript directly"
      },
      {
        title: "Host Function Callbacks",
        description: "Guest code can call back into host functions (like printing) through a controlled API"
      },
      {
        title: "VM Run Commands",
        description: "Simple VM run commands to execute and control the micro-VM lifecycle"
      }
    ]
  };
  
  // Use case: HTTP server with micro-VM function execution
  const serverlessUseCase = {
    title: "Build Your Own Serverless Platform",
    description: "The KubeCon demo showed how Hyperlight can power a home-built Function-as-a-Service platform:",
    features: [
      {
        title: "HTTP Request Routing",
        description: "Routes like /hyperlight/hello-world/cold and /hyperlight/hello-world/warm for different execution modes"
      },
      {
        title: "Function Execution",
        description: "Execute untrusted functions in isolated micro-VMs upon request"
      },
      {
        title: "Warm Pooling",
        description: "Maintain a pool of pre-warmed micro-VMs for ultra-fast execution"
      },
      {
        title: "Performance Monitoring",
        description: "Track execution times and performance metrics for optimization"
      }
    ]
  };
  
  // Updated four core feature cards with the new information
  const updatedCoreFeatures = [
    {
      title: "Sub-Millisecond Execution",
      description: "Execute functions in as little as 0.0009 seconds using pre-warmed micro-VMs, with full hypervisor-level isolation for each function call."
    },
    {
      title: "Dual Execution Models",
      description: "Choose between cold starts (new VM per request) for maximum isolation or warm execution (pre-warmed VM pool) for ultimate speed."
    },
    {
      title: "Multi-Format Support",
      description: "Run x86_64 native binaries, WebAssembly, or JavaScript code securely within micro-VMs with controlled host function access."
    },
    {
      title: "Build Your Own FaaS",
      description: "Create your own Function-as-a-Service platform with Hyperlight's library approach, as demonstrated at KubeCon North America 2024."
    }
  ];