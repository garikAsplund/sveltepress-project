<script>
  import SimpleCardVariant2 from "./UI/SimpleCardVariant2.svelte";
  import FlickeringGrid from "./UI/FlickeringGrid.svelte";
  import BlurInText from "./UI/BlurIn.svelte";
</script>

<BlurInText
  word="Svelte is Vibe"
  class="text-4xl font-bold text-black dark:text-white"
/>
<SimpleCardVariant2 />
<div
  class="relative h-64 md:h-[400px] rounded-lg w-full md:w-[60%] mx-auto bg-background overflow-hidden border"
>
  <FlickeringGrid
    class="z-0 absolute inset-0 size-full"
    squareSize={2}
    gridGap={6}
    color="#6B7280"
    maxOpacity={0.8}
    flickerChance={0.21}
    width={630}
    height={400}
  />
</div>
