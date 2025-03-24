<script lang="ts">
  let { children } = $props();
</script>

<svelte:head>
  <style>
    .sidebar-group .link-wrapper a {
      white-space: normal !important;
      line-height: 1.4;
    }
  </style>
</svelte:head>

{@render children()}
