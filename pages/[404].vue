<script setup lang="ts">
useHead({
  title: '404',
  meta: [
    {
      name: 'description',
      content: 'Page not found',
    },
  ],
})

defineOgImageComponent('About', {
  headline: 'Wrong Path',
  title: '404',
  description: 'Page Not Found',
})
</script>

<template>
  <div class="h-screen flex justify-center items-center py-20">
    <h1 class="text-5xl font-bold text-gray-800">404 Page Not Found</h1>
  </div>
</template>