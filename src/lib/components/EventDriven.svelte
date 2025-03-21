<script lang="ts">
  import FlickeringGrid from "./UI/FlickeringGrid.svelte";
  import BlurInText from "./UI/BlurIn.svelte";
  import { onMount } from "svelte";

  let containerDiv: HTMLDivElement;
  let titleElement: HTMLDivElement;
  let gridWidth = $state(2000);
  let gridHeight = $state(1000);
  let titleVisible = $state(false);

  // Update dimensions on mount and when window resizes
  onMount(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Set up intersection observer for the title
    const options = {
      root: null, // Use viewport as root
      rootMargin: "0px",
      threshold: 0.8, // Trigger when at least 10% is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          titleVisible = true;
          // Optionally unobserve after it becomes visible
          // observer.unobserve(entry.target);
        } else {
          // If you want the animation to happen every time it enters the viewport
          // titleVisible = false;
        }
      });
    }, options);

    if (titleElement) {
      observer.observe(titleElement);
    }

    return () => {
      window.removeEventListener("resize", updateDimensions);
      if (titleElement) observer.unobserve(titleElement);
    };
  });

  function updateDimensions() {
    if (containerDiv) {
      // Make grid slightly larger than container for the overflow effect
      gridWidth = containerDiv.offsetWidth * 1.3;
      gridHeight = containerDiv.offsetHeight;
    }
  }
</script>

<section class="section w-full pt-24">
  <div bind:this={titleElement} class="pb-16">
    {#if titleVisible}
      <BlurInText
        word="How it works"
        class="text-4xl font-bold text-black dark:text-white mb-4"
      />
    {:else}
      <div class="invisible">
        <BlurInText
          word="How it works"
          class="text-4xl font-bold text-black dark:text-white mb-4"
        />
      </div>
    {/if}
  </div>

  <div
    class="w-full bg-cyan-600 relative overflow-hidden"
    bind:this={containerDiv}
  >
    <!-- Flickering background that fills and overflows the container -->
    <div class="absolute inset-0 w-full h-full overflow-hidden">
      <FlickeringGrid
        class="w-[130%] h-full left-[-15%]"
        squareSize={2}
        gridGap={4}
        color="#00000"
        maxOpacity={0.8}
        flickerChance={0.21}
        width={gridWidth}
        height={gridHeight}
      />
    </div>

    <!-- Centered image container -->
    <div
      class="relative flex justify-center items-center h-auto min-h-[300px] md:min-h-[500px] py-4 md:py-8 z-10"
    >
      <img
        src="Overview.webp"
        class="w-[92%] sm:w-[85%] md:w-[80%] max-h-full z-10 object-contain"
        alt="Overview of Hyperlight"
      />
    </div>
  </div>
</section>
