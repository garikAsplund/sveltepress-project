<script>
  import DotPattern from "./UI/DotPattern.svelte";
  import YouTubeTalk from "./YouTubeTalk.svelte";
  import FlipText from "./UI/FlipText.svelte";
</script>

<section
  class="relative w-full flex flex-col items-center transform-gpu will-change-transform"
>
  <div class="absolute inset-0 bg-black">
    <div
      class="absolute inset-0 bg-gradient-to-b from-black to-blue-950 opacity-90"
    ></div>
    <div class="absolute inset-0 backdrop-blur-[2px]"></div>
  </div>

  <div
    class="relative flex h-48 w-full items-center justify-center overflow-hidden bg-none"
  >
    <h2>
      <FlipText
      class="font-display text-center text-2xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-4xl md:leading-[5rem]"
      word="Serverless functions with speed and security"
      />
    </h2>
    <DotPattern
      class="[mask-image:linear-gradient(white,transparent)] opacity-80"
      width="4"
      height="4"
      x={1}
      y={1}
      cy={2}
      cr={0.75}
      cx={2}
    />
  </div>

  <YouTubeTalk />
</section>
