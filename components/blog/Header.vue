<script setup lang="ts">
import type { Image } from '~/types';

interface Props {
  title: string
  banner: Image
  description: string
  date: string
  categories: Array<string>
}

withDefaults(defineProps<Props>(), {
  title: 'no-title',
  banner: () => ({src: '/images/default.jpg', alt: 'no-img'}),
  description: 'no description',
  date: 'no-date',
  categories: () => ([]),
})
</script>

<template>
  <header>
    <h1 class="text-xl dark:text-zinc-300 md:text-3xl lg:text-4xl m-7 font-bold text-center">
      {{ title || '' }}
    </h1>
    <FadeInImg
      :src="banner.src || ''"
      :alt="banner.alt || ''"
      :placeholder="[50, 25, 75, 5]"
      width="600"
      class="m-auto rounded-2xl shadow-lg h-32 md:h-72 w-4/6 md:w-4/5 content-center object-cover"
    />
    <p class="text-xs sm:text-sm my-3 max-w-xl mx-auto text-center text-zinc-600 dark:text-zinc-400">
      {{ description }}
    </p>
    <div class="flex w-full justify-center text-xs md:text-base my-8">
      <div class="md:flex text-black dark:text-zinc-300 content-center gap-8 text-xs sm:text-sm">
        <div class="flex items-center font-semibold">
          <p>{{ date || '' }}</p>
        </div>
        <div class="flex items-center gap-2 flex-wrap my-5">
          <template v-for="c in categories" :key="c">
            <span class="bg-gray-200 dark:bg-slate-900 rounded-md px-2 py-1 font-semibold">{{ c }}</span>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>