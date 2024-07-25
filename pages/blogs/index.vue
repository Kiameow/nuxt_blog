<script setup lang="ts">
const { data } = await useAsyncData('home', () => queryContent().findOne())
setTimeout(() => {console.log(data.value)}, 1000);
const articles = await queryContent().where({ title: 'Home' }).findOne()

setTimeout(() => {console.log(articles)}, 1000);
</script>

<template>
  <div class="min-h-screen py-20">
    <ContentRenderer :value="data" />
    <ContentRenderer :value="articles" />
  </div>
</template>
