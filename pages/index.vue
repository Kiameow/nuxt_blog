<script setup lang="ts">
import type { LinkItem } from "~/types";
const blogger = "Kiameow";
const introduction: string = "web developer / frontend developer";

interface ContactItem extends LinkItem {
  icon: string;
}
const contacts: ContactItem[] = [
  {
    text: "Kiameow",
    link: "https://github.com/Kiameow",
    icon: "grommet-icons:github",
  },
  {
    text: "zhang_lumi@foxmail",
    link: "mailto:zhang_lumi@foxmail.com",
    icon: "grommet-icons:mail",
  },
];
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
    <div class="border row-span-2 col-span-5 rounded-lg">A</div>
    <div class="border row-span-1 col-span-7 rounded-lg">B</div>
    <div class="border row-span-1 col-span-5 rounded-lg">C</div>
    <div class="border row-span-1 col-span-2 rounded-lg">
      <Button class="w-full h-full">阅读更多</Button>
    </div>
  </div>
  <div id="Portfolio" class="py-20 flex justify-end relative">
    <div class="sticky top-12 left-2 w-1/3 flex flex-col h-20 items-start mt-20">
      <p class="px-3">Here is my Project</p>
      <Button class="rounded-full">Read more</Button>
    </div>
    <div class="h-screen w-2/3 grid grid-rows-12 grid-cols-2 gap-x-8 gap-y-8 mr-20">
      <div class="border row-start-1 row-end-6 col-start-1 col-end-2 rounded-lg"></div> 
      <div class="border row-start-6 row-end-11 col-start-1 col-end-2 rounded-lg"></div> 
      <div class="border row-start-11 row-end-13 col-start-1 col-end-2 rounded-lg"></div> 
      <div class="border row-start-1 row-end-3 col-start-2 col-end-3 rounded-lg"></div> 
      <div class="border row-start-3 row-end-8 col-start-2 col-end-3 rounded-lg"></div> 
      <div class="border row-start-8 row-end-13 col-start-2 col-end-3 rounded-lg"></div> 
    </div>
  </div>
  <div id="About" class="h-screen"></div>
</template>
