<script setup lang="ts">
import { useTemplateRef } from "vue";
import {
  aboutMeData,
  contactData,
  introductionData,
  ownerData
} from "~/data";
import type { PostCard } from "~/types";
import { createDefaultArticle } from "~/utils/helper";
const blogger = ownerData.name;
const introduction = introductionData;
const aboutMe = aboutMeData.description;

const contacts = contactData.contacts;

const { data: articles } = await useAsyncData("latest-five-posts", () => {
  return queryContent<PostCard>("/blogs")
    .where({ published: true })
    .sort({ date: -1 })
    .limit(5)
    .only(getPostCardKeys())
    .find();
});

const { data: projects } = await useAsyncData("latest-five-posts", () => {
  return queryContent("/projects")
    .where({ public: true })
    .sort({ startTime: -1 })
    .limit(5)
    .only(getProjectCardKeys())
    .find();
});

const blogList = useTemplateRef('blog-list');
</script>

<template>
  <div id="Hero" class="relative h-screen">
    <HomeHero
      :blogger="blogger"
      :introduction="introduction"
      :contacts="contacts"
    />

    <MoveDownward class="absolute bottom-0 left-1/2" :element="blogList" :to="0" :invisible-when-leave-bottom="true"/>
  </div>
  
  <div ref="blog-list" class="relative w-full h-screen p-4 shadow-[inset_0_-4px_6px_rgba(0,0,0,0.2)]">
    <div id="up-round-fly-into" class="absolute bottom-0 max-w-xl px-4 pt-8 mt-auto mb-0 ml-48 text-white bg-black shadow-xl rounded-t-3xl h-4/5 lg:w-8/12">
      <div class="up-part flex items-center h-1/6">
        <h2 class="ml-4 text-3xl font-bold font-AlexBrush">Recent Posts</h2>
      </div>
      
      <div class="middle-part flex flex-col items-center justify-center mx-auto overflow-y-hidden h-4/6 relative">
        <div
          v-for="(article, index) in articles?.slice(0, 5)"
          :key="index"
          class="w-4/5 pl-2 mb-4 font-bold border-b relative hovering-effect"
        >
          <NuxtLink :to="article._path" class="">
            <div class="text-xl">{{ article.title }}</div>
            <div class="text-md">{{ article.date }}</div>
          </NuxtLink>
        </div>
        <div>...</div>
      </div>

      <div class="bottom-part h-1/6">
        <NuxtLink to="/blogs" class="font-bold text-[2rem] font-AlexBrush absolute bottom-4 right-8 underline-effect">
          Read more
        </NuxtLink>
      </div>
      
    </div>
  </div>
  
  <div id="projects">
    <div v-for="project in projects">
      <HomeProjectCard :project-meta="project"></HomeProjectCard>
    </div>
  </div>

  <div id="About" class="px-12 py-10">
    <HomeAbout :about-me="aboutMe" :contacts="contacts" />
  </div>
</template>

<style scoped>
.underline-effect {
  text-decoration: none; /* 去掉默认下划线 */
  transition: color 0.3s ease, transform 0.3s ease; /* 设置文字颜色和位置的过渡动画 */
}

.underline-effect::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px; /* 下划线的厚度 */
  background-color: white; /* 下划线的颜色 */
  transform: scaleX(0); /* 初始时，下划线的宽度为0 */
  transition: transform 0.3s ease; /* 设置下划线的动画 */
}

.underline-effect:hover {
  transform: translateY(-4px); /* 鼠标悬浮时文字轻微上移 */
  color: #0070f3; /* 鼠标悬浮时文字颜色变换 */
}

.underline-effect:hover::after {
  transform: scaleX(1); /* 鼠标悬浮时，下划线扩展 */
}

.hovering-effect {
  transform: translateY(0);
  transition: color 0.3s ease, transform 0.3s ease;
}

.hovering-effect:hover {
  transform: translateY(-4px);
  color: #0070f3;
}

</style>
