<script lang="ts">
  import NumberFlow, { continuous, type Format } from "@number-flow/svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import GitHubSVG from "$lib/svgs/GitHubSVG.svelte";

  type Props = HTMLAttributes<HTMLAnchorElement> & {
    repoPath?: string;
  };

  const format: Format = {
    notation: "compact",
    compactDisplay: "short",
    roundingMode: "trunc",
  };

  const {
    repoPath = "hyperlight-dev/hyperlight",
    class: className,
    ...props
  }: Props = $props();

  let starCount = $state(0);

  $effect(() => {
    fetchStarCount();
  });

  async function fetchStarCount() {
    try {
      // Make a request to our server-side API endpoint
      const response = await fetch(`/api/github-stars?repo=${repoPath}`);
      const data = await response.json();
      starCount = data.stars;
    } catch (error) {
      console.error("Error fetching star count:", error);
      starCount = 0;
    }
  }
</script>

<a
  href={`https://github.com/${repoPath}`}
  class={`inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-5 py-3 text-base font-medium text-slate-100 transition duration-150 hover:bg-slate-700 ${className || ""}`}
  target="_blank"
  rel="noopener noreferrer"
  {...props}
>
  <GitHubSVG />
  GitHub
  <div class="ml-2 flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-4 pr-1"
      ><path
        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
      /></svg
    >
    <NumberFlow
      willChange
      plugins={[continuous]}
      value={starCount}
      locales="en-US"
      {format}
    />
	<!-- {starCount} -->
  </div>
</a>
