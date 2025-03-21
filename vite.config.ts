import { defaultTheme } from "@sveltepress/theme-default";
import { sveltepress } from "@sveltepress/vite";
import tailwindcss from "./node_modules/@tailwindcss/vite/dist/index.mjs";
import { defineConfig } from "vite";
import remarkRustFix from "./src/lib/remarkRustFix";

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
            title: "Blog",
            to: "/blog",
          },
          // {
          //   title: "Community",
          //   to: "/community",
          // },
        ],
        sidebar: {
          "/docs": [
            {
              title: "Getting Started",
              collapsible: true,
              items: [
                {
                  title: "Introduction",
                  to: "/readme",
                },
                {
                  title: "Quick Start",
                  to: "/+page",
                },
              ],
            },
            {
              title: "Hyperlight",
              collapsible: true,
              items: [
                {
                  title: "Execution Details",
                  to: "/docs/hyperlight-execution-details",
                },
                {
                  title: "Metrics, Logs & Traces",
                  to: "/docs/hyperlight-metrics-logs-and-traces",
                },
                {
                  title: "Surrogate Development",
                  to: "/docs/hyperlight-surrogate-development-notes",
                },
                {
                  title: "Benchmarking",
                  to: "/docs/benchmarking-hyperlight",
                },
                {
                  title: "Debugging",
                  to: "/docs/debugging-hyperlight",
                },
              ],
            },
            {
              title: "How-To Guides",
              collapsible: true,
              items: [
                {
                  title: "Build a Guest Binary",
                  to: "/docs/how-to-build-a-hyperlight-guest-binary",
                },
                {
                  title: "Debug a Guest",
                  to: "/docs/how-to-debug-a-hyperlight-guest",
                },
                {
                  title: "Make Releases",
                  to: "/docs/how-to-make-releases",
                },
                {
                  title: "Use Flatbuffers",
                  to: "/docs/how-to-use-flatbuffers",
                },
              ],
            },
            {
              title: "Development Notes",
              collapsible: true,
              items: [
                {
                  title: "Paging",
                  to: "/docs/paging-development-notes",
                },
                {
                  title: "Signal Handlers",
                  to: "/docs/signal-handlers-development-notes",
                },
              ],
            },
            {
              title: "Security",
              collapsible: true,
              items: [
                {
                  title: "Security Guidelines",
                  to: "/docs/security",
                },
                {
                  title: "Developer Guidance",
                  to: "/docs/security-guidance-for-developers",
                },
              ],
            },
            {
              title: "Reference",
              collapsible: true,
              items: [
                {
                  title: "Glossary",
                  to: "/docs/glossary",
                },
                {
                  title: "Technical Requirements",
                  to: "/docs/technical-requirements-document",
                },
              ],
            },
            {
              title: "External Resources",
              collapsible: true,
              items: [
                {
                  title: "GitHub Repository",
                  to: "https://github.com/hyperlight-dev/hyperlight",
                },
              ],
            },
          ],
          '/blog': [
            {
              title: "Announcing Hyperlight 0.1.0",
              to: "/blog/announcing-hyperlight-0.1.0",
            },
            {
              title: "Hyperlight Development Update",
              to: "/blog/hyperlight-development-update",
            },
          ],
        },
        github: "https://github.com/hyperlight-dev/hyperlight",
        logo: "/hyperlight.svg",
        // highlighter: {
        //   twoslash: true,
        // },
      }),
      siteConfig: {
        title: "Hyperlight",
        description: "A VMM for executing untrusted code quickly and safely",
      },
      
      // remarkPlugins: [remarkRustFix],
    }),
  ],
});

export default config;
