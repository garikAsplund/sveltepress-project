<!-- WarpspeedLogo.svelte -->
<script>
	import LogoSrc from '$lib/svgs/Logo.svelte';
	import { onMount } from 'svelte';
	
	// Animation settings
	const copies = 6;
	const staggerDelay = 20;
	
	// State
	let animationStarted = $state(false);
	
	const logos = $state(
		Array(copies)
			.fill(null)
			.map((_, i) => ({
				id: `logo-${i}`,
				delay: i * staggerDelay,
				active: false,
				zIndex: copies - i + 10 // Adding base z-index to work with z-100 parent
			}))
	);
	
	// This function is called to start the animation for each logo
	function startAnimation(logo) {
		logo.active = true;
	}
	
	// Start the animation sequence
	function startSequence() {
		animationStarted = true;
		
		// Start animations with staggered delays
		logos.forEach((logo) => {
			setTimeout(() => startAnimation(logo), logo.delay);
		});
	}
	
	// Start animation when component mounts
	onMount(() => {
		startSequence();
	});
</script>

<!-- Used within a flex layout container -->
<div class="warpspeed-container -translate-y-4 -translate-x-4">
	<!-- Animation elements -->
	{#if animationStarted}
		{#each logos as logo (logo.id)}
			<div
				class="logo-wrapper"
				class:active={logo.active}
				style="
					animation-delay: {logo.delay}ms; 
					z-index: {logo.zIndex};
				"
			>
				<div class="logo-inner">
					<LogoSrc />
				</div>
			</div>
		{/each}
	{/if}
</div>

<style>
	.warpspeed-container {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 6rem; /* Ensure there's enough height */
		display: flex;
		align-items: center;
		justify-content: center;
		perspective: 1000px;
	}
	
	.logo-wrapper {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		pointer-events: none;
		animation-fill-mode: forwards;
	}
	
	.logo-wrapper.active {
		animation: warpspeed 370ms ease-out forwards;
	}
	
	.logo-inner {
		width: 4rem;
		height: 4rem;
	}
	
	/* For mobile (smaller screen) */
	@media (max-width: 640px) {
		.logo-inner {
			width: 3rem;
			height: 3rem;
		}
	}
	
	@keyframes warpspeed {
		0% {
			opacity: 0;
			transform: translateZ(-600px) translateX(300px) translateY(-200px) scale(0.4);
		}
		100% {
			opacity: 1;
			transform: translateZ(0) translateX(50px) scale(1);
		}
	}
</style>