import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
  extensions: [".svelte", ".md"],
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter({
      pages: "dist",
    }),
    paths: {
      relative: false,
    },
	  prerender: {
		  handleHttpError: ({ path, referrer, message }) => {
			  // Ignore missing CSS from lite-youtube-embed
			  if (path.includes('lite-youtube-embed') && message.includes('404')) {
				  console.warn(`Ignoring 404 for ${path}`);
				  return;
			  }
		  
			  // For any other 404, throw an error
			  throw new Error(message);
		  }
	  }
  },
};

export default config;
