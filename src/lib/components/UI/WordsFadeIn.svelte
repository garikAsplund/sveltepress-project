<script lang="ts">
  import { cn } from "$lib/utils";
  import { AnimatePresence, Motion } from "svelte-motion";

  let className: any = "";
  export { className as class };

  export let words = "Fade In";
  export let delay = 0.19;
  export let variants = {
    hidden: { opacity: 0 },
    visible: (i: any) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * delay },
    }),
  };
  let wordsspilit = words.split(" ");
</script>

<Motion {variants} initial="hidden" animate="visible" let:motion>
  <h2
    class={cn(
              "font-display text-center text-2xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-4xl md:leading-[5rem]"
              ,
      className
    )}
    use:motion
  >
    {#each wordsspilit as word, i}
      <Motion {variants} custom={i} let:motion>
        <span use:motion> {word}</span>
      </Motion>
    {/each}
  </h2>
</Motion>
