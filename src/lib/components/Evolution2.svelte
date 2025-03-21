<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Container from "$lib/svgs/Container.svelte";
  import Sandbox from "$lib/svgs/Sandbox.svelte";
  import Vm from "$lib/svgs/Vm.svelte";
  import { animate } from "motion/mini";
  import { backIn, backOut } from "motion";

  // State to track which visualization is active
  let currentView = $state(0);
  const totalViews = 3;

  // References to SVG elements
  let vmElement: HTMLElement;
  let containerElement: HTMLElement;
  let sandboxElement: HTMLElement;

  // Animation timeout references
  let timeoutId: number;

  // Animation function with smoother crossfade
  function animateTransition(from: number, to: number) {
    const elements = [vmElement, containerElement, sandboxElement];

    // Create smoother crossfade by slightly overlapping animations
    // Fade out current view
    animate(
      elements[from],
      { opacity: 0 },
      {
        duration: 1.3,
        easing: backOut, // Ease-in-out cubic bezier for smoother feel
      }
    );

    // Simultaneously fade in next view with slight delay
    animate(
      elements[to],
      { opacity: 1 },
      {
        duration: 1.3,
        easing: backIn, // Custom easing for smooth entrance
        delay: 1, // Slight delay for better crossfade effect
      }
    );
  }

  // Function to advance to the next view
  function nextView() {
    if (currentView < totalViews - 1) {
      const prevView = currentView;
      currentView++;
      animateTransition(prevView, currentView);

      // If not at the last view, schedule the next transition
      if (currentView < totalViews - 1) {
        timeoutId = setTimeout(nextView, 3000);
      }
    }
  }

  onMount(() => {
    // Set initial visibility
    const elements = [vmElement, containerElement, sandboxElement];

    elements.forEach((el, index) => {
      el.style.opacity = index === 0 ? "1" : "0";
    });

    // Start the sequence after a short delay
    timeoutId = setTimeout(nextView, 1000);
  });

  onDestroy(() => {
    // Clean up timeout when component is destroyed
    clearTimeout(timeoutId);
  });
</script>

<div class="relative w-full text-white/80 h-[60vh]">
  <!-- SVG components with animation -->
  <div class="absolute inset-0 w-fit" bind:this={vmElement}>
    <Vm />
    <p class="text-center w-full">From virtual machines</p>
  </div>

  <div class="absolute inset-0 w-fit" bind:this={containerElement}>
    <Container />
    <p class="text-center w-full">To containers</p>
  </div>

  <div class="absolute inset-0 w-fit" bind:this={sandboxElement}>
    <Sandbox />
    <p class="text-center w-full">And now sandboxes</p>
  </div>
</div>
