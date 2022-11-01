<script setup lang="ts">
const {public:{base}} = useRuntimeConfig()
useHead({
  link: [
    {
      rel: "icon",
      href: `${base}favicon.ico`,
      type: "image/x-icon",
      id: "favicon"
    }
  ],
  htmlAttrs: {
      lang: 'en'
    },
  meta: [
    { name: 'description', content: 'Author: KK, Dithering algorithms and redstone lamp display emilator' }
  ],
});
</script>

<template>
    <div class="h-screen">
        <slot />
    </div>
</template>

<style>
body {
    margin: 0;
    background: #0D1117;
    background-image: url("/BG.png");
    background-size: 100% 100%;
    font-size: 14px;
    color: #F0F6FC;
}
</style>