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
</script>

<main class="flex flex-col w-full">
  <Hero />
  <Evolution />
  <Comparisons />
  <Another />
  <Footer />
</main>
