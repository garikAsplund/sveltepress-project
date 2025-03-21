import { defaultTheme } from "@sveltepress/theme-default";
import { sveltepress } from "@sveltepress/vite";
import tailwindcss from './node_modules/@tailwindcss/vite/dist/index.mjs';
import { defineConfig } from "vite";

const config = defineConfig({
  plugins: [
    tailwindcss(),
    sveltepress({
      theme: defaultTheme({
        docsearch: {
          appId: "XXX",
          apiKey: "XXX",
          indexName: "XXX",
        },
        navbar: [
          // Add your navbar configs here
          {
            title: "Documentation",
            to: "/docs",
          },
          {
            title: "Community",
            to: "/community",
          },
        ],
        sidebar: {
          // Add your sidebar configs here
        },
        github: "https://github.com/hyperlight-dev/hyperlight",
        logo: "/hyperlight.svg",
      }),
      siteConfig: {
        title: "Hyperlight",
        description: "A VMM for executing untrusted code quickly and safely",
      },
    }),
    // {
    //   name: "svelte-runes-control",
    //   configResolved(config) {
    //     // Find the Svelte plugin
    //     const sveltePlugin = config.plugins.find(
    //       (plugin) => plugin.name === "vite-plugin-svelte"
    //     );

    //     if (sveltePlugin && sveltePlugin.api) {
    //       // Update the Svelte plugin configuration
    //       const originalOptions = sveltePlugin.api.options || {};
    //       sveltePlugin.api.options = {
    //         ...originalOptions,
    //         dynamicCompileOptions({ filename, compileOptions }) {
    //           // Control runes per file - customize this logic as needed
    //           if (
    //             filename.includes("runes-enabled/") ||
    //             filename.endsWith(".runes.svelte")
    //           ) {
    //             return { runes: true };
    //           } else if (filename.includes("legacy/")) {
    //             return { runes: false };
    //           }
    //           // Fall back to the global setting
    //           return {};
    //         },
    //       };
    //     }
    //   },
    // },
  ],
});

export default config;

