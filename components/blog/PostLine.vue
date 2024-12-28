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
<div class="rounded-md flex items-center">
    <span class="w-2/12 flex-none">{{ article.date.split('-').slice(1).join('-') }}</span>
    <NuxtLink class="flex-auto font-bold" :to="article._path">{{ article.title }}</NuxtLink>
    <span class="flex-none flex justify-end gap-x-1">
        <Badge v-for="category in article.categories" variant="outline" class="max-h-5 whitespace-nowrap">
            {{ category }}
        </Badge>
    </span>
</div>
</template>
