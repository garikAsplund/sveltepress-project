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

declare module 'svelte-motion' {
	import type { ComponentType, SvelteComponentTyped } from 'svelte';
	
	// Define the constructor type, not the instance type
	export const Motion: ComponentType<any>;
	export const AnimatePresence: ComponentType<any>;
	
	// For the SVG namespace
	export const M: {
	  path: ComponentType<any>;
	  circle: ComponentType<any>;
	  rect: ComponentType<any>;
	  [key: string]: ComponentType<any>;
	};
  
	// Action type for use:motion
	export const motion: (node: Element, params?: any) => {
	  update?: (params: any) => void;
	  destroy?: () => void;
	};
  }