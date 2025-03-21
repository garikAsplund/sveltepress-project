<script lang="ts">
  import { onMount } from "svelte";
  import { spring } from "svelte/motion";
  import Container from "$lib/svgs/Container.svelte";
  import Sandbox from "$lib/svgs/Sandbox.svelte";
  import Vm from "$lib/svgs/Vm.svelte";
  import Line from "./UI/Line.svelte";

  // Simple data for the three cards
  const cards = [
    { component: Vm, title: "Virtual Machines" },
    { component: Container, title: "Containers" },
    { component: Sandbox, title: "Sandboxes" },
  ];

  // References to card elements
  let cardsContainer: HTMLElement;

  // Animation states for each card (using separate variables for Svelte 5)
  let card0Y = $state(40);
  let card0Opacity = $state(0);

  let card1Y = $state(40);
  let card1Opacity = $state(0);

  let card2Y = $state(40);
  let card2Opacity = $state(0);

  // Setup intersection observer on mount
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Trigger animations with staggered timing when container comes into view
          setTimeout(() => {
            card0Y = 0;
            card0Opacity = 1;
          }, 0);

          setTimeout(() => {
            card1Y = 0;
            card1Opacity = 1;
          }, 150);

          setTimeout(() => {
            card2Y = 0;
            card2Opacity = 1;
          }, 300);

          // Disconnect observer once triggered
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    ); // Trigger when 20% visible

    if (cardsContainer) {
      observer.observe(cardsContainer);
    }

    return () => observer.disconnect();
  });

  // Helper function to get styles for each card
  function getCardStyle(index: number) {
    if (index === 0) {
      return `opacity: ${card0Opacity}; transform: translateY(${card0Y}px);`;
    } else if (index === 1) {
      return `opacity: ${card1Opacity}; transform: translateY(${card1Y}px);`;
    } else if (index === 2) {
      return `opacity: ${card2Opacity}; transform: translateY(${card2Y}px);`;
    }
    return "";
  }
</script>

<section class="">
  <div class="flex justify-center">
    <h1 class="text-4xl text-white font-bold">
      Transforming serverless architecture
    </h1>
  </div>

  <div class="w-full">
    <!-- Simple grid of cards -->
    <div
      bind:this={cardsContainer}
      class="grid grid-cols-1 md:grid-cols-3 gap-6 p-4"
    >
      {#each cards as { component: Component, title }, index}
        <div
          class="bg-slate-800 rounded-lg shadow-lg p-6 flex flex-col items-center transition-all duration-700"
          style={getCardStyle(index)}
        >
          <div
            class="text-emerald-400/80 w-32 h-32 flex items-center justify-center"
          >
            <Component />
          </div>
          <h2 class="text-white mt-4 text-xl font-medium">{title}</h2>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* Add spring-like transition for the bouncy effect */
  .transition-all {
    transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }
</style>
