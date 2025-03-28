<script lang="ts">
  import DotPattern from "./UI/DotPattern.svelte";
  import YouTubeTalk from "./YouTubeTalk.svelte";
  import FlipText from "./UI/FlipText.svelte";
  import { onMount } from "svelte";

  let titleElement: HTMLDivElement;
  let titleVisible = $state(false);

  onMount(() => {
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
      if (titleElement) observer.unobserve(titleElement);
    };
  });
</script>

<section
  class="relative w-full flex flex-col items-center transform-gpu will-change-transform"
>
  <div class="absolute inset-0 bg-black">
    <div
      class="absolute inset-0 bg-gradient-to-b from-black to-blue-950 opacity-90"
    ></div>
    <div class="absolute inset-0 backdrop-blur-[2px]"></div>
  </div>

  <div
    class="relative flex h-36 md:h-48 w-full items-end md:items-center justify-center overflow-hidden bg-none"
  >
    <h2 bind:this={titleElement} class="md:pb-16">
      {#if titleVisible}
        <FlipText
          class="font-display text-center text-2xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-4xl md:leading-[5rem]"
          word="Serverless functions with speed and security"
        />
      {:else}
        <div class="invisible">
          <FlipText
            word="Serverless functions with speed and security"
            class="font-display text-center text-2xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-4xl md:leading-[5rem] invisible"
          />
        </div>
      {/if}
    </h2>
    <DotPattern
      class="[mask-image:linear-gradient(white,transparent)] opacity-80"
      width="4"
      height="4"
      x={1}
      y={1}
      cy={2}
      cr={0.75}
      cx={2}
    />
  </div>

  <YouTubeTalk />
</section>
