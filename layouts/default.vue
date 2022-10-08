<script setup lang="ts">
const {public:{base}} = useRuntimeConfig()
useHead({
  link:[{
    rel:"icon",
    href:`${base}favicon.ico`,
    type:"image/x-icon"
  }]
})
</script>

<template>
    <div class="h-screen">
        <slot />
    </div>
</template>

<style>
body {
    background: #0D1117;
    background-image: url("/BG.png");
    background-size: 100% 100%;
    font-size: 14px;
    color: #F0F6FC;
}
</style>