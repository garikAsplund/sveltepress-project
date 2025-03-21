<script module>
  export const frontmatter = {
    home: false,
  };
</script>

<script>
  import Footer from "$lib/components/Footer.svelte";
  import Evolution from "$lib/components/Evolution2.svelte";
  import Comparisons from "$lib/components/Comparisons.svelte";
  import Another from "$lib/components/Another.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import And from "$lib/components/And.svelte";
  import Community from "$lib/components/Community.svelte";
</script>

<main class="flex flex-col w-full">
  <Hero />
  <Another />
  <Evolution />
  <And />
  <Comparisons />
  <Community />
  <Footer />
</main>
