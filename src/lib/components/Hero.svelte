<script>
  import { onMount } from "svelte";
  import Logo from "$lib/svgs/Logo.svelte";
  import GitHubButton from "$lib/components/GitHubButton.svelte";
  import WarpspeedLogo from "$lib/components/WarpspeedLogo.svelte";
  import GradualSpacing from "./UI/GradualSpacing.svelte";

  // Animation setup for the terminal typing effect
  let terminalText = $state("cargo run --example hello-world<br>");
  const finalText = "Hello, World! I am executing inside of a micro-VM :)";
  let cursorIndex = 0;
  let typingInterval;

  // Animation visibility states
  let visible = $state(false);

  onMount(() => {
    // Set visible to true after a short delay for the animations
    setTimeout(() => {
      visible = true;
    }, 0);

    // Start the typing animation
    typingInterval = setInterval(() => {
      if (cursorIndex < finalText.length) {
        terminalText += finalText[cursorIndex];
        cursorIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => {
      clearInterval(typingInterval);
    };
  });
</script>

<section class="relative overflow-hidden bg-slate-900 text-white">
  <!-- Background pattern grid -->
  <div
    class="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
  ></div>

  <div
    class="relative mx-auto max-w-7xl px-4 pt-8 pb-24 sm:px-6 sm:pt-24 sm:pb-16 lg:px-8 lg:pb-40 overflow-hidden"
  >
    <div
      style="transition: opacity 600ms ease-in-out;"
      class:opacity-0={!visible}
      class:opacity-100={visible}
      class="w-full overflow-hidden"
    >
      <div
        class="flex flex-col gap-8 items-center mx-auto md:flex-row md:items-center md:justify-between max-w-4xl"
      >
        <!-- Left content -->
        <div class="w-full max-w-2xl">
          <!-- Logo and title -->
          <div
            class="mb-6 flex flex-col items-center gap-4 sm:flex-row overflow-hidden"
          >
            <div
              class="z-10 flex justify-center p-3 opacity-90 shadow-lg scale-90 sm:translate-x-10 md:translate-x-0"
            >
              <WarpspeedLogo />
              <div class="invisible"><Logo /></div>
            </div>
            <GradualSpacing
              class="flex justify-center bg-gradient-to-r from-purple-300 to-indigo-400 bg-clip-text font-['Major_Mono_Display'] text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tight text-transparent items-center sm:-translate-x-12 md:translate-x-0 overflow-hidden"
              words="Hyperlight"
            />
          </div>

          <p class="mb-6 text-xl sm:text-2xl text-blue-100">
            <b>Evolving the cloud.</b>
          </p>

          <p class="mb-8 text-lg sm:text-xl text-slate-300">
            Hyperlight is an open source micro-Virtual Machine Manager for
            executing untrusted code quickly and safely at scale.
          </p>

          <!-- CTA buttons -->
          <div class="flex w-full flex-wrap justify-center gap-4">
            <a
              href="/docs"
              class="group inline-flex items-center justify-center rounded-lg bg-purple-600 px-5 py-3 text-base font-medium text-white shadow-lg transition-all duration-250 hover:bg-purple-500 hover:shadow-purple-600/30"
            >
              Documentation
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2 h-4 w-4 transition-all duration-250 group-hover:scale-120"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
            <GitHubButton />
          </div>
        </div>

        <!-- Terminal visualization -->
        <div class="opacity-75 lg:w-2/5 md:translate-y-24 w-full max-w-xs sm:max-w-sm mx-auto md:mx-0">
          <div
            class="h-36 overflow-hidden rounded-lg border border-slate-700 bg-slate-800 shadow-2xl w-full"
          >
            <div class="flex items-center space-x-2 bg-slate-700 px-4 py-2">
              <div class="h-3 w-3 rounded-full bg-gray-500"></div>
              <div class="h-3 w-3 rounded-full bg-gray-400"></div>
              <div class="h-3 w-3 rounded-full bg-gray-300"></div>
              <div class="ml-2 text-xs text-slate-300"></div>
            </div>
            <div class="p-4 font-mono text-sm relative">
              <p class="text-emerald-400">
                <span>$</span>
                {@html terminalText}<span class="animate-pulse">█</span>
              </p>
              <p
                class="text-emerald-400 blur-md opacity-55 absolute top-0 left-0 mt-4 ml-4"
              >
                <span>$</span>
                {@html terminalText}<span class="animate-pulse">█</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tags/Badges -->
      <div
        class="flex flex-wrap justify-center gap-4 py-16"
        style="transition: opacity 600ms ease-in-out; transition-delay: 300ms;"
        class:opacity-0={!visible}
        class:opacity-100={visible}
      >
        <div
          class="flex items-center rounded-full border border-blue-800 bg-blue-900/30 px-3 py-1 text-sm text-blue-300"
        >
          <span class="mr-2">●</span>
          Cross-Platform
        </div>
        <div
          class="flex items-center rounded-full border border-indigo-800 bg-indigo-900/30 px-3 py-1 text-sm text-indigo-300"
        >
          <span class="mr-2">●</span>
          No OS
        </div>
        <div
          class="flex items-center rounded-full border border-violet-800 bg-violet-900/30 px-3 py-1 text-sm text-violet-300"
        >
          <span class="mr-2">●</span>
          Sandboxed
        </div>
        <div
          class="flex items-center rounded-full border border-sky-800 bg-sky-900/30 px-3 py-1 text-sm text-sky-300"
        >
          <span class="mr-2">●</span>
          1 ms Cold Starts
        </div>
        <div
          class="flex items-center rounded-full border border-cyan-800 bg-cyan-900/30 px-3 py-1 text-sm text-cyan-300"
        >
          <span class="mr-2">●</span>
          Scales to 0
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom wave decoration -->
  <div class="absolute right-0 bottom-0 left-0">
    <svg
      class="w-full fill-slate-800"
      viewBox="0 0 1440 74"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1440 74V0C722 0 720 74 0 74h1440z" />
    </svg>
  </div>
</section>