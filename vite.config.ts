import { defaultTheme } from "@sveltepress/theme-default";
import { sveltepress } from "@sveltepress/vite";
import tailwindcss from "./node_modules/@tailwindcss/vite/dist/index.mjs";
import { defineConfig } from "vite";
import remarkRustFix from "./src/lib/remarkRustFix";
import navbar from './config/navbar.js'
import sidebar from './config/sidebar.js'

const config = defineConfig({
  plugins: [
    tailwindcss(),
    sveltepress({
      theme: defaultTheme({
        editLink: "https://github.com/garikAsplund/sveltepress-project/edit/main/src/routes/:route",
        themeColor: {
          light: "#fff",
          dark: "#000",
          primary: "#00838f",
          hover: "#00b8c2",
          gradient: {
            start: "#D8B4FE",
            end: "#818CF8",
          },
        },
        docsearch: {
          appId: "SSS54K4ITB",
          apiKey: "ca1cf8479bb21819f3d5f9deaf23b7ad",
          indexName: "hyperlight_draft_vercel_app_sss54k4itb_pages",
        },
        navbar,
        sidebar,
        github: "https://github.com/hyperlight-dev/hyperlight",
        discord: "https://join.slack.com/t/hyperlightgroup/shared_invite/zt-2ytby88df-B_S36BsRiOHEUesjf5fFaQ",
        logo: "/hyperlight.svg",
        // highlighter: {
        //   twoslash: true,
        // },
      }),
      siteConfig: {
        title: "Hyperlight",
        description: "A VMM for executing untrusted code quickly and safely",
      },
      remarkPlugins: [remarkRustFix],
    }),
  ],
});

export default config;
