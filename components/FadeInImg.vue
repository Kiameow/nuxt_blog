<script setup lang="ts">
defineProps<{
    src: string
    alt?: string
    width?: string
    height?: string
    placeholder?: string | number | boolean | unknown[]
}>()

const isLoading = ref(true)

const onLoad = () => {
    isLoading.value = false
}
</script>

<template>
    <NuxtImg :src="src" :alt="alt" :width="width" :height="height" :placeholder="placeholder" :class="`${isLoading? 'opacity-50 animate-pulse' : 'opacity-100'} transition-opacity`" @load="onLoad" />
</template>


