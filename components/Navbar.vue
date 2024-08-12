<script setup lang="ts">
import { navbarData } from '~/data';
const navItems = navbarData.links;
</script>

<template>
  <div class="w-screen fixed flex py-2 px-2 z-50 backdrop-opacity-50 backdrop-blur-sm bg-white/100">
    <div class="w-12 flex justify-center">Logo</div>
    <div class="flex-1 flex justify-around">
      <NuxtLink v-for="item in navItems" :to="item.link">{{
        item.text
        }}</NuxtLink>
    </div>
  </div>
</template>
