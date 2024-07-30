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

const { data }: any = await useAsyncData("latest-three-posts", () => {
  return queryContent("/blogs")
    .sort({ date: -1 })
    .limit(3)
    .only(getPostCardKeys())
    .find();
});

const articles = computed(() => {
  const temp: PostCard[] = data.value ?? [];
  while (temp.length < 3) {
    temp.push(createDefaultArticle());
  }
  return temp;
})


</script>

<template>
  <div id="Hero" class="h-screen">
    <HomeHero :blogger="blogger" :introduction="introduction" :contacts="contacts" />
  </div>

  <div id="Blog" class="h-screen px-20 py-20">
    <HomeLatestBlog :articles="articles" />
  </div>

  <div id="Portfolio" class="py-20">
    <HomeLatestPortfolio :projects="projects" />
  </div>
  <div id="About" class="px-12 py-20">
    <HomeAbout :about-me="aboutMe" :contacts="contacts" />
  </div>
</template>
