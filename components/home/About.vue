<script setup lang="ts">
import type { ContactItem } from '~/types';

defineProps<{
  aboutMe: string;
  contacts: ContactItem[];
}>()
</script>


<template>
  <p class="w-1/2 mb-8">{{ aboutMe }}</p>
  <div class="flex items-center gap-x-4">
    <Button>Contact me</Button>
    <a v-for="contact in contacts" class="flex items-center w-12 aspect-square rounded-full" :href="contact.link"
      target="_blank">
      <Button class="w-full h-full rounded-full">
        <Icon :name="contact.icon" />
      </Button>
    </a>
  </div>
</template>