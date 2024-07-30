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
    <h1 class="border text-8xl">{{ blogger }}</h1>
    <div>
      {{ introduction }}
    </div>
    <div class="absolute bottom-4 right-4 border flex justify-end gap-4">
      <a v-for="contact in contacts" class="flex items-center" :href="contact.link" target="_blank">
        <Icon :name="contact.icon" />
        <p>{{ contact.text }}</p>
      </a>
    </div>
  </div>
</template>