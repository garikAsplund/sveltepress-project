<script lang="ts">
	import GitHubSVG from '$lib/svgs/GitHubSVG.svelte';
	import Logo from '$lib/svgs/Logo.svelte';

	let { scrollY } = $props();
	let scrolled = $derived(scrollY > 50);
</script>

<nav
	class="fixed top-0 z-50 w-full {scrolled
		? 'bg-black/70 shadow-sm backdrop-blur-md transition-all duration-800'
		: 'bg-transparent md:transition-all md:duration-800'}"
>
	<div class="container mx-auto flex w-full justify-between px-4 py-4 md:px-6">
		<div class="flex items-center justify-start">
			<a
				href="/"
				class="flex justify-center p-3 opacity-90 shadow-lg transition-all duration-200 hover:opacity-75"
			>
				<!-- <Logo /> -->
				<div
					class="flex justify-center bg-gradient-to-r from-purple-300 to-indigo-400 bg-clip-text font-['Major_Mono_Display'] text-xl sm:text-2xl tracking-tight text-transparent {scrolled
						? 'visible'
						: 'invisible sm:visible'}"
				>
					Hyperlight
				</div>
			</a>
		</div>
		<div class="relative flex items-center justify-end">
			<!-- Navigation Links -->
			<div class="flex items-center gap-4 md:gap-8">
				<a
					href="/docs"
					class="hidden sm:block text-sm font-normal text-gray-300 transition hover:text-gray-400 md:text-lg"
					>Documentation</a
				>
				<a
					href="/docs"
					class="block sm:hidden text-sm font-normal text-gray-300 transition hover:text-gray-400 md:text-lg"
					>Docs</a
				>
				<a
					href="/community"
					class="text-sm font-normal whitespace-nowrap text-gray-300 transition hover:text-gray-400 md:text-lg"
					>Community</a
				>
				<a
					href="https://github.com/hyperlight-dev/hyperlight"
					target="_blank"
					rel="noopener noreferrer"
					class="scale-110 text-gray-300 transition hover:opacity-80"
					aria-label="GitHub"
				>
					<GitHubSVG />
				</a>
			</div>
		</div>
	</div>
</nav>
