<script setup lang="ts">
import type { BlogPost } from "@/types/blog";
import { seoData } from "~/data";
import "github-markdown-css/github-markdown-light.css"
const { path } = useRoute();

const { data: article, error } = await useAsyncData(`blog-post-${path}`, () =>
  queryContent().where({ _path: path }).findOne(),
);

if (error.value) navigateTo("/blogs/404");

const data = computed<BlogPost>(() => {
  return {
    title: article.value?.title || "no-title available",
    description: article.value?.description || "no-description available",
    image: article.value?.image || "/not-found.jpg",
    alt: article.value?.alt || "no alter data available",
    ogImage: article.value?.ogImage || "/not-found.jpg",
    date: article.value?.date || "not-date-available",
    tags: article.value?.tags || [],
    published: article.value?.published || false,
  };
});

useHead({
  title: data.value.title || "",
  meta: [
    { name: "description", content: data.value.description },
    {
      name: "description",
      content: data.value.description,
    },
    // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
    { property: "og:site_name", content: seoData.siteTitle },
    { hid: "og:type", property: "og:type", content: "website" },
    {
      property: "og:url",
      content: `${seoData.siteURL}/${path}`,
    },
    {
      property: "og:title",
      content: data.value.title,
    },
    {
      property: "og:description",
      content: data.value.description,
    },
    {
      property: "og:image",
      content: data.value.ogImage || data.value.image,
    },
    // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
    { name: "twitter:site", content: "@qdnvubp" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:url",
      content: `${seoData.siteURL}/${path}`,
    },
    {
      name: "twitter:title",
      content: data.value.title,
    },
    {
      name: "twitter:description",
      content: data.value.description,
    },
    {
      name: "twitter:image",
      content: data.value.ogImage || data.value.image,
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${seoData.siteURL}/${path}`,
    },
  ],
});

// Generate OG Image
defineOgImageComponent("Test", {
  headline: "Greetings 👋",
  title: data.value.title || "",
  description: data.value.description || "",
  link: data.value.ogImage,
});
</script>

<template>
  
  <div class="px-6 py-20 container max-w-5xl mx-auto sm:grid grid-cols-12 gap-x-12">
    <div class="col-span-12 lg:col-span-9">
      <div
        class="prose prose-pre:max-w-xs sm:prose-pre:max-w-full prose-sm sm:prose-base md:prose-lg prose-h1:no-underline max-w-5xl mx-auto prose-zinc dark:prose-invert prose-img:rounded-lg">
        <ContentRenderer v-if="article" :value="article" class="markdown-body">
          <template #empty>
            <p>No content found.</p>
          </template>
        </ContentRenderer>
      </div>
    </div>

    <div class="flex flex-row flex-wrap md:flex-nowrap mt-10 gap-2"></div>
  </div>
</template>


