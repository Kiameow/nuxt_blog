<script setup lang="ts">
// credit
// friendly link
// contact way
// copy right
// sitemap
// bei an hao
import type { LinkItem } from '~/types';

interface FooterSection {
  name: string;
  innerLink: boolean;
  list: LinkItem[]; 
} 

const footerContent : FooterSection[] = [
  {
    name: "致谢",
    innerLink: false,
    list: [
      { text: "Nuxt", link: "nuxt.com" },
      { text: "GSAP", link: "gsap.com" },
      { text: "sonar", link: "https://www.sonarmusic.com.au/" },
    ],
  },
  {
    name: "联系我",
    innerLink: false,
    list: [
      { text: "Github", link: "https://github.com/Kiameow" },
      { text: "Email", link: "mailto:zhang_lumi@foxmail.com" },
    ],
  },
  {
    name: "站点地图",
    innerLink: true,
    list: [
      { text: "主页", link: "/" },
      { text: "博客", link: "/blog" },
      { text: "作品集", link: "/portfolio" },
      { text: "关于我", link: "/about" },
    ],
  },
  {
    name: "友情链接",
    innerLink: false,
    list: [],
  },
];

const filteredFooterContent = footerContent.filter(section => section.list && section.list.length);

</script>

<template>
  <div class="flex justify-around">
    <div v-for="section in filteredFooterContent">
      <p>{{ section.name }}</p>
      <div v-for="item in section.list">
        <NuxtLink v-if="section.innerLink" :to="item.link">{{ item.text }}</NuxtLink>
        <a v-else :href="item.link" target="_blank">{{ item.text }}</a>
      </div>
    </div>
  </div>
</template>
