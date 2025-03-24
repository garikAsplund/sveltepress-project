import { defaultTheme } from "@sveltepress/theme-default";
import { sveltepress } from "@sveltepress/vite";
import tailwindcss from "./node_modules/@tailwindcss/vite/dist/index.mjs";
import { defineConfig, loadEnv } from "vite";
import remarkRustFix from "./src/lib/remarkRustFix";
import navbar from "./config/navbar.js";
import sidebar from "./config/sidebar.js";

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  const algoliaAppId = env.VITE_ALGOLIA_APP_ID || '';
  const algoliaApiKey = env.VITE_ALGOLIA_API_KEY || '';
  const algoliaIndexName = env.VITE_ALGOLIA_INDEX_NAME || '';
  
  return {
    plugins: [
      tailwindcss(),
      sveltepress({
        theme: defaultTheme({
          editLink:
            "https://github.com/garikAsplund/sveltepress-project/edit/main/src/routes/:route",
          themeColor: {
            light: "#fff",
            dark: "#000",
            gradient: {
              start: "#D8B4FE",
              end: "#818CF8",
            },
          },
          docsearch: algoliaAppId ? {
            appId: algoliaAppId,
            apiKey: algoliaApiKey,
            indexName: algoliaIndexName,
          } : undefined,
          navbar,
          sidebar,
          github: "https://github.com/hyperlight-dev/hyperlight",
          discord:
            "https://join.slack.com/t/hyperlightgroup/shared_invite/zt-2ytby88df-B_S36BsRiOHEUesjf5fFaQ",
          logo: "/hyperlight.svg",
        }),
        siteConfig: {
          title: "Hyperlight",
          description: "A VMM for executing untrusted code quickly and safely",
        },
        remarkPlugins: [remarkRustFix],
      }),
    ],
  };
});

export default config;