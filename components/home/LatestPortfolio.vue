<script setup lang='ts'>
import type { Project } from '~/types';

defineProps<{
  projects: Project[];
}>()
</script>
<template>
  <div class="flex justify-end relative">
    <div class="sticky top-12 w-1/3 flex flex-col h-20 items-center mt-20">
      <p class="font-AlexBrush text-[4rem]">My project</p>
      <Button class="rounded-full w-5/12">Read more</Button>
    </div>
    <div class="h-screen w-2/3 grid grid-rows-12 grid-cols-2 gap-x-8 gap-y-8 mr-20 text-white font-bold text-3xl">
      <NuxtLink :to="projects[0].link"
        class="border row-start-1 row-end-6 col-start-1 col-end-2 rounded-3xl bg-neutral-800 relative">
        <div class="absolute bottom-4 left-4">
          <p>{{ projects[0].name }}</p>
          <p class="text-[1rem] font-normal">{{ projects[0].description }}</p>
        </div>
      </NuxtLink>
      <NuxtLink :to="projects[1].link"
        class="border row-start-6 row-end-11 col-start-1 col-end-2 rounded-3xl bg-neutral-800 relative">
        <div class="absolute bottom-4 left-4">
          <p>{{ projects[1].name }}</p>
          <p class="text-[1rem] font-normal">{{ projects[1].description }}</p>
        </div>
      </NuxtLink>
      <NuxtLink :to="projects[2].link"
        class="border row-start-3 row-end-8 col-start-2 col-end-3 rounded-3xl bg-neutral-800 relative">
        <div class="absolute bottom-4 left-4">
          <p>{{ projects[2].name }}</p>
          <p class="text-[1rem] font-normal">{{ projects[2].description }}</p>
        </div>
      </NuxtLink>
      <NuxtLink :to="projects[3].link"
        class="border row-start-8 row-end-13 col-start-2 col-end-3 rounded-3xl bg-neutral-800 relative">
        <div class="absolute bottom-4 left-4">
          <p>{{ projects[3].name }}</p>
          <p class="text-[1rem] font-normal">{{ projects[3].description }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
