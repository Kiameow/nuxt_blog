<script setup lang="ts">
import {
  aboutMeData,
  contactData,
  introductionData,
  ownerData,
  projectData,
} from "~/data";
import type { PostCard } from "~/types";
import { createDefaultArticle } from "~/utils/helper";
const blogger = ownerData.name;
const introduction = introductionData;
const aboutMe = aboutMeData.description;
const projects = projectData;

const contacts = contactData.contacts;

const { data } = await useAsyncData("latest-three-posts", () => {
  return queryContent("/blogs")
    .sort({ date: -1 })
    .limit(3)
    .only(getPostCardKeys())
    .find();
});

const articles = ref(data.value as PostCard[]);

const articleA =
  articles.value[0]
    ? articles.value[0]
    : createDefaultArticle();
const articleB =
  articles.value[1]
    ? articles.value[1]
    : createDefaultArticle();
const articleC =
  articles.value[2]
    ? articles.value[2]
    : createDefaultArticle();
</script>

<template>
  <div id="Hero" class="h-screen flex flex-col justify-center items-center relative">
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
  <div id="Blog" class="h-screen grid grid-cols-12 gap-8 px-20 py-20">
    <NuxtLink :to="articleA._path"
      class="row-span-2 col-span-5 rounded-3xl bg-neutral-800 text-white font-bold text-4xl relative">
      <div class="absolute bottom-8 left-8">{{ articleA.title }}</div>
    </NuxtLink>
    <NuxtLink :to="articleB._path"
      class="row-span-1 col-span-7 rounded-3xl bg-neutral-800 text-white font-bold text-4xl relative">
      <div class="absolute top-8 right-8">{{ articleB.title }}</div>
    </NuxtLink>
    <NuxtLink :to="articleC._path"
      class="row-span-1 col-span-5 rounded-3xl bg-neutral-800 text-white font-bold text-4xl relative">
      <div class="absolute top-8 left-8">{{ articleC.title }}</div>
    </NuxtLink>
    <NuxtLink to="/blogs" class="row-span-1 col-span-2 rounded-3xl bg-neutral-800 text-white font-bold text-4xl">
      <Button class="w-full h-full rounded-3xl font-bold italic text-3xl">阅读更多</Button>
    </NuxtLink>
  </div>
  <div id="Portfolio" class="py-20 flex justify-end relative">
    <div class="sticky top-12 left-2 w-1/3 flex flex-col h-20 items-start mt-20">
      <p class="px-3">Here is my Project</p>
      <Button class="rounded-full">Read more</Button>
    </div>
    <div class="h-screen w-2/3 grid grid-rows-12 grid-cols-2 gap-x-8 gap-y-8 mr-20 text-white font-bold text-3xl">
      <div class="border row-start-1 row-end-6 col-start-1 col-end-2 rounded-3xl bg-neutral-800 relative">
        <div class="absolute bottom-2 left-2">
          <p>{{ projects[0].name }}</p>
          <p>{{ projects[0].description }}</p>
        </div>
      </div>
      <div class="border row-start-6 row-end-11 col-start-1 col-end-2 rounded-3xl bg-neutral-800 relative">
        <div class="absolute bottom-2 left-2">
          <p>{{ projects[1].name }}</p>
          <p>{{ projects[1].description }}</p>
        </div>
      </div>
      <div class="border row-start-3 row-end-8 col-start-2 col-end-3 rounded-3xl bg-neutral-800 relative">
        <div class="absolute bottom-2 left-2">
          <p>{{ projects[1].name }}</p>
          <p>{{ projects[1].description }}</p>
        </div>
      </div>
      <div class="border row-start-8 row-end-13 col-start-2 col-end-3 rounded-3xl bg-neutral-800 relative">
        <div class="absolute bottom-2 left-2">
          <p>{{ projects[1].name }}</p>
          <p>{{ projects[1].description }}</p>
        </div>
      </div>
    </div>
  </div>
  <div id="About" class="px-12 py-20">
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
  </div>
</template>
