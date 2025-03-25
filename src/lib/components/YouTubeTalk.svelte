<script lang="ts">
  import { onMount } from "svelte";
  import "$lib/lite-youtube/lite-yt-embed.css";
  import { Code, SquareFunction, SunSnow } from "lucide-svelte";
  // Dynamically import the JS to avoid SSR issues
  let liteYouTubeLoaded = $state(false);
  onMount(async () => {
    // Only import and initialize if not already loaded
    if (!customElements.get("lite-youtube")) {
      await import("lite-youtube-embed/src/lite-yt-embed.js");
      liteYouTubeLoaded = true;
      // Force component upgrade if needed
      document.querySelectorAll("lite-youtube").forEach((el) => {
        if (!el.shadowRoot) {
          customElements.upgrade(el);
        }
      });
    }
  });
</script>

<!-- Main container with gradient background -->
<div class="relative w-full py-16">

  <!-- Content section with two columns -->
  <div class="relative mx-auto max-w-7xl px-4 flex justify-center">
    <div class="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
      <!-- LEFT COLUMN: Video embed -->
      <div>
        <div class=" rounded-lg overflow-hidden shadow-2xl">
          <!-- <lite-youtube
            videoid="f8ornY7h2KE"
            playlabel="Hyperlight Demo at KubeCon 2024"
            style="background-image: url('/Talk.png');"
            params="start=289"
          ></lite-youtube> -->
          <lite-youtube
            videoid="EYCA0cR1dkI"
            playlabel="Hyperlight and Edge Actions - Inside Azure Innovations with Microsoft Azure's CTO Mark Russinovich at Microsoft Ignite 2024 "
          ></lite-youtube>
        </div>
      </div>

      <!-- RIGHT COLUMN: Text content (no background) -->
      <div class="rounded-lg p-8">
        <h3 class="text-3xl font-bold text-white mb-2">
          <!-- KubeCon North America 2024 -->
          Hyperlight and Edge Actions 
        </h3>
        <h4 class="text-xl text-blue-300 mb-6">
          Azure's CTO Mark Russinovich at Microsoft Ignite 2024
          <!-- Rita Zhang introduces Hyperlight -->
        </h4>

        <ul class="space-y-4 text-base">
          <li class="flex items-start gap-2">
            <SunSnow />
            <span class="text-gray-200"
              >Micro-VMs can be started cold in isolation or warm from a pool</span
            >
          </li>
          <li class="flex items-start gap-2">
            <Code />
            <span class="text-gray-200"
              >Supports running WebAssembly, JavaScript, and more</span
            >
          </li>
          <li class="flex items-start gap-2">
            <SquareFunction />
            <span class="text-gray-200"
              >Ideal for serverless platforms and real-time applications</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
