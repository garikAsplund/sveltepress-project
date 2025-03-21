<script module>
  export const frontmatter = {
    home: false,
  };
</script>

<script>
  import Footer from "$lib/components/Footer.svelte";
  import Evolution from "$lib/components/Evolution.svelte";
  import Comparisons from "$lib/components/Comparisons.svelte";
  import Fold from "$lib/components/Fold.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import EventDriven from "$lib/components/EventDriven.svelte";
  import Community from "$lib/components/Community.svelte";
</script>

<main class="flex flex-col w-full">
  <Hero />
  <Fold />
  <Evolution />
  <EventDriven />
  <Comparisons />
  <Community />
  <Footer />
</main>
