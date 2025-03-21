<script>
  import DotPattern from "./UI/DotPattern.svelte";
  import YouTubeTalk from "./YouTubeTalk.svelte";
</script>

<section class="w-full flex flex-col items-center">
  <div
    class="relative flex h-48 w-full items-end justify-center overflow-hidden border bg-background md:shadow-xl "
  >
    <p
      class="z-10 whitespace-pre-wrap text-center text-4xl font-medium text-black dark:text-white"
    >
      Serverless functions with speed <i>and</i> security
    </p>
    <DotPattern
      class="[mask-image:linear-gradient(white,transparent)]"
      width="3"
      height="3"
      x={1}
      y={1}
      cy={2}
      cr={0.75}
      cx={2}
    />
  </div>
  <YouTubeTalk />
</section>
