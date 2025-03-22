<script>
  import Marquee from "./UI/Marquee.svelte";
  import Reviewcard from "./UI/Reviewcard.svelte";
  import contributors from "$lib/contributors";

  let firstRow = contributors.slice(0, contributors.length / 2);
  let secondRow = contributors.slice(contributors.length / 2);
</script>

<div
  class="relative flex h-full w-full flex-col items-center justify-center overflow-hidden"
  style="background: linear-gradient(to bottom, #080c1a 0%, #080c1a 20%, #000000 80%, #000000 100%);"
>
<h1
      class=
        "font-display text-center text-2xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-4xl md:leading-[5rem]"
    >Our contributors
    </h1>
  <!-- Main content -->
  <div class="w-full relative py-16">
    <!-- First row marquee -->
    <div class="relative w-full ">
      <Marquee pauseOnHover class="[--duration:70s] z-10" >
        {#each firstRow as item}
          <Reviewcard {...item} />
        {/each}
      </Marquee>
    </div>

    <!-- Second row marquee -->
    <div class="relative w-full">
      <Marquee reverse pauseOnHover class="[--duration:70s] z-10">
        {#each secondRow as item}
          <Reviewcard {...item} />
        {/each}
      </Marquee>
    </div>
  </div>
  
  <!-- Just side masks - no top or bottom
  <div
    class="pointer-events-none absolute left-0 top-0 bottom-0 w-[20%] z-20"
    style="background: linear-gradient(to right, 
      rgba(0, 0, 0, 0.8) 0%, 
      rgba(0, 0, 0, 0.5) 40%, 
      rgba(0, 0, 0, 0) 100%);"
  ></div>
  
  <div
    class="pointer-events-none absolute right-0 top-0 bottom-0 w-[20%] z-20"
    style="background: linear-gradient(to left, 
      rgba(0, 0, 0, 0.8) 0%, 
      rgba(0, 0, 0, 0.5) 40%, 
      rgba(0, 0, 0, 0) 100%);"
  ></div> -->
</div>