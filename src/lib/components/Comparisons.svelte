<script>
  import DotPattern from "./UI/DotPattern.svelte";
</script>

<section class="w-full flex flex-col items-center">
  <div
    class="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl"
  >
    <!-- Just Delete this P tag for Viewing the Dot Center Pattern -->
    <p
      class="z-10 whitespace-pre-wrap text-center text-5xl font-medium text-black dark:text-white"
    >
      Svelte
    </p>
    <DotPattern
      class="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" 
    />
  </div>

  A micro VM provides VM isolation for each instance with containerlike
  architecture.
  <ul>
    <li>Kata containers</li>
    <li>NanoVMs</li>
    <li>Firecracker</li>
  </ul>
</section>
