<script setup lang="ts">
import { navbarData } from '~/data';
const navItems = navbarData.links;
</script>

<template>
  <div class="w-screen fixed top-0 left-0 flex py-2 px-2 z-50 bg-white/100">
    <div class="w-16 flex justify-center items-center">
      <img class="w-8 object-contain" src="/images/kiameow-favicon-black.png" alt="" srcset="">
    </div>
    <div class="flex-1 flex justify-around items-center">
      <NuxtLink v-for="item in navItems" :to="item.link">{{
        item.text
        }}</NuxtLink>
    </div>
  </div>
</template>
