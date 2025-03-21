<script lang="ts">
  import { onMount } from "svelte";
  import Container from "$lib/svgs/Container.svelte";
  import Sandbox from "$lib/svgs/Sandbox.svelte";
  import Vm from "$lib/svgs/Vm.svelte";
  import WordsFadeIn from "./UI/WordsFadeIn.svelte";
  import { ArrowRight, ArrowDown } from "lucide-svelte";

  // Simple data for the three cards
  const cards = [
    { component: Vm, title: "Virtual Machines" },
    { component: Container, title: "Containers" },
    { component: Sandbox, title: "micro-VMs" },
  ];

  // References to elements
  let titleContainer: HTMLElement;
  let card0Container: HTMLElement;
  let arrow0Container: HTMLElement;
  let card1Container: HTMLElement;
  let arrow1Container: HTMLElement;
  let card2Container: HTMLElement;

  // Animation states for each card (using separate variables for Svelte 5)
  let card0Y = $state(40);
  let card0Opacity = $state(0);
  let card1Y = $state(40);
  let card1Opacity = $state(0);
  let card2Y = $state(40);
  let card2Opacity = $state(0);

  // Animation states for arrows
  let arrow0Opacity = $state(0);
  let arrow1Opacity = $state(0);

  // State to control title visibility
  let showTitle = $state(false);

  // Setup intersection observer on mount
  onMount(() => {
    // Get viewport height to adjust rootMargins dynamically
    const viewportHeight = window.innerHeight;
    // Calculate base spacing - smaller on mobile, larger on desktop
    const baseSpacing = Math.min(viewportHeight * 0.15, 150); // 15% of viewport height, max 150px
    
    // Create separate observers with different rootMargins
    
    // Observer for title
    const titleObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          showTitle = true;
          titleObserver.disconnect();
        }
      },
      { rootMargin: `0px 0px -${baseSpacing}px 0px` }
    );
    
    // Observer for first card
    const card0Observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          card0Y = 0;
          card0Opacity = 1;
          card0Observer.disconnect();
        }
      },
      { rootMargin: `0px 0px -${baseSpacing * 2}px 0px` }
    );
    
    // Observer for first arrow
    const arrow0Observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          arrow0Opacity = 1;
          arrow0Observer.disconnect();
        }
      },
      { rootMargin: `0px 0px -${baseSpacing * 3}px 0px` }
    );
    
    // Observer for second card
    const card1Observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          card1Y = 0;
          card1Opacity = 1;
          card1Observer.disconnect();
        }
      },
      { rootMargin: `0px 0px -${baseSpacing * 4}px 0px` }
    );
    
    // Observer for second arrow
    const arrow1Observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          arrow1Opacity = 1;
          arrow1Observer.disconnect();
        }
      },
      { rootMargin: `0px 0px -${baseSpacing * 5}px 0px` }
    );
    
    // Observer for third card
    const card2Observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          card2Y = 0;
          card2Opacity = 1;
          card2Observer.disconnect();
        }
      },
      { rootMargin: `0px 0px -${baseSpacing * 6}px 0px` }
    );

    // Attach observers to the same container element
    // This is the key - we're using the same element but different rootMargins
    // to trigger animations at different scroll positions
    if (titleContainer) {
      titleObserver.observe(titleContainer);
      card0Observer.observe(titleContainer);
      arrow0Observer.observe(titleContainer);
      card1Observer.observe(titleContainer);
      arrow1Observer.observe(titleContainer);
      card2Observer.observe(titleContainer);
    }
    
    return () => {
      titleObserver.disconnect();
      card0Observer.disconnect();
      arrow0Observer.disconnect();
      card1Observer.disconnect();
      arrow1Observer.disconnect();
      card2Observer.disconnect();
    };
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

<section class="w-full flex flex-col items-center">
  <div bind:this={titleContainer} class="flex justify-center scale-75">
    {#if showTitle}
      <WordsFadeIn words="Evolution of serverless architecture" delay={0.4} />
    {/if}
  </div>
  <div class="max-w-7xl">
    <!-- Modified grid with arrows -->
    <div
      class="grid grid-cols-1 md:grid-cols-5 gap-2 p-4"
    >
      <!-- First card -->
      <div
        class="bg-slate-800 rounded-lg shadow-lg p-6 flex flex-col items-center transition-all duration-700 md:col-span-1"
        style={getCardStyle(0)}
      >
        <div
          class="text-emerald-400/80 w-32 h-32 flex items-center justify-center"
        >
          <Vm />
        </div>
        <h2 class="text-white mt-4 text-xl font-medium">{cards[0].title}</h2>
      </div>

      <!-- First arrow -->
      <div
        class="flex items-center justify-center transition-all duration-700 p-2"
        style={`opacity: ${arrow0Opacity};`}
      >
        <!-- Desktop arrow (right) -->
        <div
          class="hidden md:flex text-emerald-400 w-full justify-center items-center"
        >
          <ArrowRight size={64} />
        </div>
        <!-- Mobile arrow (down) -->
        <div
          class="md:hidden text-emerald-400 h-12 flex flex-col justify-center items-center"
        >
          <ArrowDown size={64} />
        </div>
      </div>

      <!-- Second card -->
      <div
        class="bg-slate-800 rounded-lg shadow-lg p-6 flex flex-col items-center transition-all duration-700 md:col-span-1"
        style={getCardStyle(1)}
      >
        <div
          class="text-emerald-400/80 w-32 h-32 flex items-center justify-center"
        >
          <Container />
        </div>
        <h2 class="text-white mt-4 text-xl font-medium">{cards[1].title}</h2>
      </div>

      <!-- Second arrow -->
      <div
        class="flex items-center justify-center transition-all duration-700 p-2"
        style={`opacity: ${arrow1Opacity};`}
      >
        <!-- Desktop arrow (right) -->
        <div
          class="hidden md:flex text-emerald-400 w-full justify-center items-center"
        >
          <ArrowRight size={64} />
        </div>
        <!-- Mobile arrow (down) -->
        <div
          class="md:hidden text-emerald-400 h-12 flex flex-col justify-center items-center"
        >
          <ArrowDown size={64} />
        </div>
      </div>

      <!-- Third card -->
      <div
        class="bg-slate-800 rounded-lg shadow-lg p-6 flex flex-col items-center transition-all duration-700 md:col-span-1"
        style={getCardStyle(2)}
      >
        <div
          class="text-emerald-400/80 w-32 h-32 flex-col flex items-center justify-center scale-15"
        >
          <div class="flex">
            <Sandbox /><Sandbox /><Sandbox />
          </div>
          <div class="flex">
            <Sandbox /><Sandbox /><Sandbox />
          </div>
          <div class="flex">
            <Sandbox /><Sandbox /><Sandbox />
          </div>
        </div>
        <h2 class="text-white mt-4 text-xl font-medium">{cards[2].title}</h2>
      </div>
    </div>
  </div>
</section>

<style>
  /* Add spring-like transition for the bouncy effect */
  .transition-all {
    transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
    transition-duration: 800ms;
  }
</style>