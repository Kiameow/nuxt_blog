<script setup lang='ts'>
import type { ContactItem } from '~/types';

defineProps<{
  blogger: string;
  introduction: string;
  contacts: ContactItem[];
}>()
</script>
<template>
  <div class="h-full flex flex-col justify-center items-center relative">
    <h1 class="text-[10rem] font-AlexBrush">{{ blogger }}</h1>
    <div class="text-[1.4rem]">
      {{ introduction }}
    </div>
    <div class="absolute bottom-4 right-4 flex justify-end gap-4">
      <a v-for="contact in contacts" class="flex items-center gap-1" :href="contact.link" target="_blank">
        <Icon :name="contact.icon" />
        <p class="italic">{{ contact.text }}</p>
      </a>
    </div>
  </div>
</template>