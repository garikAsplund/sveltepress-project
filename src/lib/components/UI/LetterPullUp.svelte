<script lang="ts">
  import { cn } from "$lib/utils";
  import { AnimatePresence, Motion } from "svelte-motion";

  export let words = "Letter Pull Up";
  export let delay = 0.05;
  let className: any = "";
  export { className as class };
  let pullupVariant = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: any) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * delay },
    }),
  };
  let letters = words.split("");
</script>

<h2 class="flex justify-center">
  <!-- <AnimatePresence let:item list={[{ key: words }]}> -->
  {#each letters as letter, i}
    <Motion
      variants={pullupVariant}
      initial="hidden"
      animate="visible"
      custom={i}
      let:motion
    >
      <p
        class={cn(
          className,
          "font-display text-center text-2xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-4xl md:leading-[5rem]"
        )}
        use:motion
      >
        {#if letter === " "}
          <span>&nbsp;</span>
        {:else}
          {letter}
        {/if}
      </p>
    </Motion>
  {/each}
  <!-- </AnimatePresence> -->
</h2>
