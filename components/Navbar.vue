<script setup lang="ts">
import { navbarData } from '~/data';
const navItems = navbarData.links;
</script>

<template>
  <div class="w-screen fixed flex py-2 px-2 z-50 backdrop-opacity-50 backdrop-blur-sm bg-white/100">
    <div class="w-16 flex justify-center items-center">
      <img class="w-8" src="/images/kiameow-favicon-black.png" alt="" srcset="">
    </div>
    <div class="flex-1 flex justify-around items-center">
      <NuxtLink v-for="item in navItems" :to="item.link">{{
        item.text
        }}</NuxtLink>
    </div>
  </div>
</template>
