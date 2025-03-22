<script lang="ts">
  import { cn } from "$lib/utils";

  export let img: string;
  export let name: string;
  export let username: string;
  export let body: string;
</script>

<figure
  class={cn(
    "relative w-full sm:w-fit overflow-hidden rounded-2xl border py-3 px-4",
    // light styles
    "border-gray-950/[.1] bg-gray-950/[.03] hover:bg-gray-950/[.07] transition-all duration-200",
    // dark styles
    "dark:border-gray-50/[.1] dark:bg-gray-50/[.07] dark:hover:bg-gray-50/[.12]"
  )}
>
  <a href={img.slice(0, img.length - 4)} aria-label="GitHub for {name}" class="block">
    <div class="flex flex-row items-center gap-4">
      <img 
        class="rounded-full " 
        width="70" 
        height="70" 
        alt="Profile pic of {name}" 
        src={img} 
      />
      <div class="flex flex-col">
        <!-- svelte-ignore a11y-structure -->
        <figcaption class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          {name}
        </figcaption>
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{username}</p>
      </div>
    </div>
  </a>
</figure>
