export default {
  "/docs": [
    // {
    //   title: "Getting Started",
    //   collapsible: true,
    //   items: [
    //     {
    //       title: "Introduction",
    //       to: "/readme",
    //     },
    //     {
    //       title: "Quick Start",
    //       to: "/+page",
    //     },
    //   ],
    // },
    {
      title: "Hyperlight",
      collapsible: true,
      items: [
        {
          title: "Introduction",
          to: "/docs/introduction/",
        },
        {
          title: "Execution Details",
          to: "/docs/hyperlight-execution-details/",
        },
        {
          title: "Metrics, Logs & Traces",
          to: "/docs/hyperlight-metrics-logs-and-traces/",
        },
        {
          title: "Surrogate Development",
          to: "/docs/hyperlight-surrogate-development-notes/",
        },
        {
          title: "Benchmarking",
          to: "/docs/benchmarking-hyperlight/",
        },
        {
          title: "Debugging",
          to: "/docs/debugging-hyperlight/",
        },
      ],
    },
    {
      title: "How-To Guides",
      collapsible: true,
      items: [
        {
          title: "Build a Guest Binary",
          to: "/docs/how-to-build-a-hyperlight-guest-binary/",
        },
        {
          title: "Debug a Guest",
          to: "/docs/how-to-debug-a-hyperlight-guest/",
        },
        {
          title: "Make Releases",
          to: "/docs/how-to-make-releases/",
        },
        {
          title: "Use Flatbuffers",
          to: "/docs/how-to-use-flatbuffers/",
        },
      ],
    },
    {
      title: "Development Notes",
      collapsible: true,
      items: [
        {
          title: "Paging",
          to: "/docs/paging-development-notes/",
        },
        {
          title: "Signal Handlers",
          to: "/docs/signal-handlers-development-notes/",
        },
      ],
    },
    {
      title: "Security",
      collapsible: true,
      items: [
        {
          title: "Security Guidelines",
          to: "/docs/security/",
        },
        {
          title: "Developer Guidance",
          to: "/docs/security-guidance-for-developers/",
        },
      ],
    },
    {
      title: "Reference",
      collapsible: true,
      items: [
        {
          title: "Glossary",
          to: "/docs/glossary/",
        },
        {
          title: "Technical Requirements",
          to: "/docs/technical-requirements-document/",
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
  "/blog": [
    {
      title: "Build a Hyperlight C guest to securely execute JavaScript",
      to: "/blog/runJS/",
    },
    {
      title: "Achieving 0.0009-second micro-VM execution time",
      to: "/blog/kubecon2024/",
    },
    {
      title:
        "Introducing Hyperlight: Virtual machine-based security for functions at scale",
      to: "/blog/",
    },
  ],
};
