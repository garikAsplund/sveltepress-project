<script>
  import SimpleCardVariant2 from "./UI/SimpleCardVariant2.svelte";
  

  const features = [
    {
      title: "Ultra-Fast VM Creation",
      description:
        "Create new micro-VMs in just 1-2 milliseconds, about 100x faster than traditional hypervisor approaches, making it practical to spin up VMs on-demand for individual function calls.",
    },
    {
      title: "Hypervisor-Level Security",
      description:
        "Execute untrusted code with real hypervisor-based protection for each function call, providing stronger isolation than sandboxed runtimes while maintaining exceptional performance.",
    },
    {
      title: "Minimal Resource Footprint",
      description:
        "Extremely lightweight with a 64KB stack and 128KB default heap size, enabling true scale-to-zero capabilities and efficient resource utilization.",
    },
    {
      title: "Portable Abstraction Layer",
      description:
        "Run on Hyper-V, mshv, or KVM across different platforms without changing your code, providing flexibility while maintaining consistent security benefits.",
    },
  ];
</script>

<div class="container mx-auto px-4 py-8 w-full max-w-[100vw] box-border overflow-x-clip">
  <h2 class="text-3xl font-bold text-center mb-8">
    Why You'll Love Hyperlight
  </h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
    {#each features as feature}
      <SimpleCardVariant2
        title={feature.title}
        description={feature.description}
        class="w-full max-w-full overflow-hidden pr-4"
      />
    {/each}
  </div>
</div>


