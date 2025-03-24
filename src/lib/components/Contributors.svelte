<script lang="ts">
  import Marquee from "./UI/Marquee.svelte";
  import Reviewcard from "./UI/Reviewcard.svelte";
  import contributors from "$lib/contributors";
  import SparklesText from "./UI/SparklesText.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let titleElement: HTMLDivElement;
  let titleVisible = $state(false);

  let firstRow = contributors.slice(0, contributors.length / 2);
  let secondRow = contributors.slice(contributors.length / 2);

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

<div
  class="relative flex h-full w-full flex-col items-center justify-center overflow-hidden"
  style="background: linear-gradient(to bottom, #080c1a 0%, #080c1a 20%, #000000 80%, #000000 100%);"
>
  <div bind:this={titleElement}>
    {#if titleVisible}
      <div in:fade={{ duration: 200 }}>
        <SparklesText text="Our contributors" />
      </div>
    {:else}
      <SparklesText text="Our contributors" class="invisible" />
    {/if}
  </div>
  <!-- Main content -->
  <div class="w-full relative py-16">
    <!-- First row marquee -->
    <div class="relative w-full">
      <Marquee pauseOnHover class="[--duration:70s] z-10">
        {#each firstRow as item}
          <Reviewcard {...item} />
        {/each}
      </Marquee>
    </div>

    <!-- Second row marquee -->
    <div class="relative w-full">
      <Marquee reverse pauseOnHover class="[--duration:70s] z-10">
        {#each secondRow as item}
          <Reviewcard {...item} />
        {/each}
      </Marquee>
    </div>
  </div>
</div>
