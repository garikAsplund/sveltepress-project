<script lang="ts">
  import "../app.css";
  import { page } from "$app/state";

  let { children } = $props();
</script>

<main class="{page.url.pathname === "/" ? "bg-black" : ""} selection:bg-teal-300/80 selection:text-black/90 w-full overflow-x-hidden">
  {@render children()}
</main>
