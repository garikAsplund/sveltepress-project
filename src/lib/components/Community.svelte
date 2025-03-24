<!-- CommunitySection.svelte -->
<script>
  import Slack from "$lib/svgs/Slack.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  // State for calendar integration
  let nextMeetingDate = "";
  let localTime = "";

  // Calculate next meeting date (every other Wednesday at 09:00 PST/PDT)
  onMount(() => {
    calculateNextMeeting();
  });

  function calculateNextMeeting() {
    const now = new Date();
    const dayOfWeek = 3; // Wednesday (0 = Sunday, 3 = Wednesday)

    let nextWednesday = new Date(now);
    nextWednesday.setDate(now.getDate() + ((dayOfWeek + 7 - now.getDay()) % 7));

    // If today is Wednesday and it's before 9am PST/PDT, use today
    if (now.getDay() === dayOfWeek && now.getHours() < 9) {
      nextWednesday = now;
    }

    // Check if it's an "every other Wednesday"
    // Simple logic: if the week number is even, it's a meeting week
    const weekNumber = Math.floor(nextWednesday.getDate() / 7);
    if (weekNumber % 2 !== 0) {
      nextWednesday.setDate(nextWednesday.getDate() + 7);
    }

    // Set time to 9:00 PST/PDT
    nextWednesday.setHours(9, 0, 0, 0);

    // Format the date
    nextMeetingDate = nextWednesday.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    // Get local time
    localTime = nextWednesday.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
</script>

<section class="py-12 bg-[#080c1a] pb-24" id="community">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
    <div class="text-center mb-12">
      <h2 class="font-display text-center text-2xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-4xl md:leading-[5rem]"      >Join our community</h2>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      <!-- Community Meetings Card -->
      <div
        class="max-w-md bg-[#0b1021] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-[#a796ff]/20 hover:-translate-y-1 border border-[#1c2035] flex flex-col"
        transition:fade
      >
        <div class="bg-[#1c2035] px-4 py-0">
          <h3 class="text-xl font-semibold text-gray-300">
            Community Meetings
          </h3>
        </div>
        <div class="p-6 flex-grow flex flex-col">
          <div class="mb-4">
            <div class="flex items-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-[#a796ff] mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span class="font-medium text-gray-300"
                >Every other Wednesday</span
              >
            </div>
            <div class="flex items-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-[#a796ff] mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="font-medium text-gray-300">09:00 (PST/PDT)</span>
            </div>
            <div class="flex items-center mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-[#a796ff] mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span class="font-medium text-gray-300">Via Zoom</span>
            </div>
            {#if nextMeetingDate}
              <div class="mt-4 bg-[#131731] p-3 rounded-md">
                <p class="text-sm text-[#b4b1fd]">
                  Next meeting: <strong>{nextMeetingDate}</strong> at
                  <strong>{localTime}</strong> your time
                </p>
              </div>
            {/if}
          </div>
          <div class="mt-auto">
            <a
              href="https://hackmd.io/blCrncfOSEuqSbRVT9KYkg#Resources"
              class="block text-center bg-[#2e2973] hover:bg-[#3e3993] text-[#d8d6ff] font-medium py-2 px-4 rounded transition duration-300"
              target="_blank"
              rel="noopener"
            >
              View Meeting Notes
            </a>
          </div>
        </div>
      </div>

      <!-- Contributing Card -->
      <div
        class="max-w-md bg-[#0c1124] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-[#a3a7ff]/20 hover:-translate-y-1 border border-[#1d2138] flex flex-col"
        transition:fade
      >
        <div class="bg-[#1d2138]  px-4 py-0">
          <h3 class="text-xl font-semibold text-gray-300">Contributing</h3>
        </div>
        <div class="p-6 flex-grow flex flex-col">
          <ul class="space-y-4 -ml-4">
            <li class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-[#a3a7ff] mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span class="text-gray-300">Fork and clone the repo</span>
            </li>
            <li class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-[#a3a7ff] mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span class="text-gray-300"
                >Work on a new branch and test your changes</span
              >
            </li>
            <li class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-[#a3a7ff] mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span class="text-gray-300"
                >Submit a pull request or a new issue</span
              >
            </li>
          </ul>
          <div class="mt-auto">
            <a
              href="https://github.com/hyperlight-dev/hyperlight/blob/main/CONTRIBUTING.md"
              class="block text-center bg-[#2e2f73] hover:bg-[#3e3f93] text-[#d8daff] font-medium py-2 px-4 rounded transition duration-300"
              target="_blank"
              rel="noopener"
            >
              View Contributing Guide
            </a>
          </div>
        </div>
      </div>

      <!-- Chat & Connect Card -->
      <div
        class="max-w-md bg-[#0a0f1d] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-[#9ba7ff]/20 hover:-translate-y-1 border border-[#1a2038] flex flex-col"
        transition:fade
      >
        <div class="bg-[#1a2038]  px-4 py-0">
          <h3 class="text-xl font-semibold text-gray-300">Chat & Connect</h3>
        </div>
        <div class="p-6 flex-grow flex flex-col">
          <div class="w-full flex justify-center scale-150 py-4">
            <Slack />
          </div>
          <p class="mb-6 text-gray-300">
            Join us on the CNCF Slack in the <strong>#hyperlight</strong> channel
            to ask questions, share ideas, or just hang out with the community.
          </p>
          <div class="mt-auto">
            <a
              href="https://slack.cncf.io/"
              class="block text-center bg-[#2b2f7d] hover:bg-[#393f9d] text-[#d5daff] font-medium py-2 px-4 rounded transition duration-300"
              target="_blank"
              rel="noopener"
            >
              Join CNCF Slack
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
