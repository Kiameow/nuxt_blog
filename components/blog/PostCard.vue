<script setup lang='ts'>
import type { PostCard } from '~/types';
import Badge from '../ui/badge/Badge.vue';

defineProps<{
  article: PostCard
}>()

</script>
<template>
<!-- Floating Description -->
<!-- Time-Title-Badge -->
<div>
  <NuxtLink class="flex gap-x-8 w-full" :to="article._path">
    <div class="flex-grow relative py-4">
      <p class="text-2xl font-bold mb-10">{{ article.title }}</p>
      <div class="absolute bottom-4 w-full pr-4 flex justify-between">
        <div class="flex justify-start gap-2">
          <Badge v-for="category in article.categories">{{
            category
          }}</Badge>
        </div>
        <div class="flex justify-end gap-4">
          <div class="flex justify-center gap-2 items-center">
            <Icon name="mdi:clock-outline" size="20px" style="color: gray" />
            <span>{{ article.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</div>
</template>