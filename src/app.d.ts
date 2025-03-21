// This help your get the type tips for sveltepress virtual modules
/// <reference types="@sveltepress/theme-default/types" />
/// <reference types="@sveltepress/vite/types" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

declare module 'flubber';
declare module 'svelte-motion' {
	import type { SvelteComponentTyped } from 'svelte';
	
	export class Motion extends SvelteComponentTyped<{
	  // Add appropriate props here
	}> {}
  }