<script lang="ts">
  import FlickeringGrid from "./UI/FlickeringGrid.svelte";
  import BlurInText from "./UI/BlurIn.svelte";
</script>

<section class="section w-full">
  <BlurInText
    word="Who it's for"
    class="text-4xl font-bold text-black dark:text-white"
  />

  <div class="w-full bg-cyan-600">
    <div
      class="relative h-64 md:h-[500px] rounded-lg w-full md:w-[60%] mx-auto bg-cyan-600 overflow-hidden border"
    >
      <FlickeringGrid
        class="z-0 absolute inset-0 size-full"
        squareSize={2}
        gridGap={6}
        color="#00000"
        maxOpacity={0.8}
        flickerChance={0.21}
        width={630}
        height={500}
      />
    </div>
  </div>
</section>
