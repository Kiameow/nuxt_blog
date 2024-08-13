<script setup lang="ts">
import type { ContactItem } from '~/types';

const props = withDefaults(defineProps<{
    contacts: ContactItem[];
    position?: 'center' | 'end' | 'start';
}>(), {
    position: 'center'
});

console.log(props.position)
</script>

<template>
    <div :class="`flex items-center gap-x-4 justify-${position}`">
        <!-- TODO: make a contact form link -->
        <Button>Contact me</Button>
        <a v-for="contact in contacts" class="flex items-center w-12 aspect-square rounded-full" :href="contact.link"
        target="_blank">
        <Button class="w-full h-full rounded-full">
            <Icon :name="contact.icon" />
        </Button>
    </a>
  </div>
</template>