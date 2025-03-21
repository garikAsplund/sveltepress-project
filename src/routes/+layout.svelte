<script lang="ts">
  import "../app.css";
  import { page } from "$app/state";

  let { children } = $props();
</script>

<main class={page.url.pathname === "/" ? "bg-black" : ""}>
  {@render children()}
</main>
