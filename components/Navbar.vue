<script setup lang="ts">
import type { LinkItem } from '~/types';

const navItems: Ref<LinkItem[]> = ref([
  { text: "主页", link: "/" },
  { text: "博客", link: "/blog" },
  { text: "作品集", link: "/portfolio" },
  { text: "关于我", link: "/about" },
]);
</script>

<template>
  <div class="w-screen fixed flex bg-white py-2 px-2 border">
    <div class="w-12 flex justify-center">Logo</div>
    <div class="flex-1 flex justify-around">
      <NuxtLink v-for="item in navItems" :to="item.link">{{
        item.text
        }}</NuxtLink>
    </div>
  </div>
</template>
