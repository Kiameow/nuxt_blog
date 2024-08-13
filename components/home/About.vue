<script setup lang="ts">
import type { ContactItem } from '~/types';

defineProps<{
  aboutMe: string;
  contacts: ContactItem[];
}>()
</script>


<template>
  <div class="ml-40 w-1/2">
    <p class="mb-8">{{ aboutMe }}</p>
    <Contact :contacts="contacts" position="end" />
  </div>
</template>