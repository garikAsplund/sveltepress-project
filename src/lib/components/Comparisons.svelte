<script>
  import DotPattern from "./UI/DotPattern.svelte";
</script>

<section class="w-full flex flex-col items-center">
  <div
    class="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl"
  >
    <!-- Just Delete this P tag for Viewing the Dot Center Pattern -->
    <p
      class="z-10 whitespace-pre-wrap text-center text-5xl font-medium text-black dark:text-white"
    >
      What sets us apart
    </p>
    <DotPattern
      class="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
    />
  </div>

  <div
    class="relative flex h-full w-full max-w-5xl items-center justify-center overflow-hidden border bg-background p-20 md:shadow-xl"
  >
    <!-- Just Delete this P tag for Viewing the Dot Center Pattern -->
    <p
      class="z-10 whitespace-pre-wrap text-center text-5xl font-medium text-black dark:text-white"
    >
      Speed <i>and</i> Security
    </p>
    <DotPattern
    class="[mask-image:linear-gradient(to_right,white,transparent)]"
    width="2"
     height="2"
     x={1}
     y={1}
     cy={2}
     cr={.47}
     cx={2}
     
    />
  </div>
  <div
    class="relative flex h-full w-full max-w-5xl items-center justify-center overflow-hidden  border bg-background p-20 md:shadow-xl"
  >
    <!-- Just Delete this P tag for Viewing the Dot Center Pattern -->
    <p
      class="z-10 whitespace-pre-wrap text-center text-5xl font-medium text-black dark:text-white"
    >
      Speed <i>and</i> Security
    </p>
    <DotPattern
    class="[mask-image:linear-gradient(to_left,white,transparent)]"
    width="4"
     height="4"
     x={1}
     y={1}
     cy={1}
     cr={.4}
     cx={1}
     
    />
  </div>

</section>