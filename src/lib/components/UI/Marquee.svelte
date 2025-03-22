<script lang="ts">
    import { cn } from "$lib/utils";
    export let pauseOnHover: boolean = false;
    export let vertical: boolean = false;
    export let repeat: number = 4;
    export let reverse: boolean = false;
  
    let className: any = "";
    export { className as class };
  </script>
  
  <div
    class={cn(
      "group flex overflow-hidden p-2 [--duration:4s] [--gap:1rem] [gap:var(--gap)]",
      {
        "flex-row": !vertical,
        "flex-col": vertical,
      },
      className
    )}
  >
    {#each { length: repeat } as _, i (i)}
      <div
        class={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
          "animate-marquee flex-row": !vertical,
          "animate-marquee-vertical flex-col": vertical,
          "group-hover:[animation-play-state:paused]": pauseOnHover,
          "animate-reverse": reverse,
        })}
      >
        <slot>Default</slot>
      </div>
    {/each}
  </div>
  
  <style>
    /* Add the required animation styles directly to the component */
    :global(.animate-marquee) {
      animation: marquee var(--duration) linear infinite;
    }
    
    :global(.animate-marquee-vertical) {
      animation: marquee-vertical var(--duration) linear infinite;
    }
    
    /* Add specific reverse animation class */
    :global(.animate-reverse) {
      animation-direction: reverse !important;
    }
    
    @keyframes marquee {
      from { transform: translateX(0); }
      to { transform: translateX(calc(-100% - var(--gap))); }
    }
    
    @keyframes marquee-vertical {
      from { transform: translateY(0); }
      to { transform: translateY(calc(-100% - var(--gap))); }
    }
  </style>