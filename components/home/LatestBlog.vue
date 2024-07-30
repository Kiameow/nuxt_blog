<script setup lang='ts'>
import type { PostCard } from '~/types';

defineProps<{
  articles: PostCard[]
}>()
</script>

<template>
  <div class="h-full grid grid-cols-12 gap-8">
    <NuxtLink :to="articles[0]._path"
      class="row-span-2 col-span-5 rounded-3xl bg-neutral-800 text-white font-bold text-4xl relative">
      <div class="absolute bottom-8 left-8">{{ articles[0].title }}</div>
    </NuxtLink>
    <NuxtLink :to="articles[1]._path"
      class="row-span-1 col-span-7 rounded-3xl bg-neutral-800 text-white font-bold text-4xl relative">
      <div class="absolute top-8 right-8">{{ articles[1].title }}</div>
    </NuxtLink>
    <NuxtLink :to="articles[2]._path"
      class="row-span-1 col-span-5 rounded-3xl bg-neutral-800 text-white font-bold text-4xl relative">
      <div class="absolute top-8 left-8">{{ articles[2].title }}</div>
    </NuxtLink>
    <NuxtLink to="/blogs" class="row-span-1 col-span-2 rounded-3xl bg-neutral-800 text-white font-bold text-4xl">
      <Button class="w-full h-full rounded-3xl font-bold italic text-3xl">阅读更多</Button>
    </NuxtLink>
  </div>
</template>