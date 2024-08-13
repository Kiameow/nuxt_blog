<script setup lang="ts">
import type { BlogPost } from "@/types/blog";
import { seoData } from "~/data";
const { path } = useRoute();

const { data: article, error } = await useAsyncData(`blog-post-${path}`, () =>
  queryContent().where({ _path: path }).findOne()
);

if (error.value) navigateTo("/404");

const data = computed<BlogPost>(() => {
  return {
    title: article.value?.title || "no title available",
    description: article.value?.description || "no description available",
    banner: article.value?.banner || {src: "/images/default.jpg", alt: "no banner available"},
    ogImage: article.value?.banner?.src || "/images/default.jpg",
    date: article.value?.date || "no date available",
    categories: article.value?.categories || [],
    published: article.value?.published || false,
    tocLinks: article.value?.body?.toc?.links || [],
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
      content: data.value.ogImage || data.value.banner.src,
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
      content: data.value.ogImage || data.value.banner.src,
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
// defineOgImageComponent("Test", {
//   headline: "Greetings 👋",
//   title: data.value.title || "",
//   description: data.value.description || "",
//   link: data.value.ogImage,
// });
</script>

<template>
  <div
    class="px-6 py-20 container max-w-5xl mx-auto sm:grid grid-cols-12 gap-x-12"
  >
    <div class="col-span-12 lg:col-span-9">
      <BlogHeader
        :title="data.title"
        :banner="data.banner"
        :date="data.date"
        :description="data.description"
        :categories="data.categories"
      />
      <div
        class="prose prose-pre:max-w-xs sm:prose-pre:max-w-full prose-sm sm:prose-base md:prose-lg prose-headings:no-underline max-w-5xl mx-auto prose-neutral dark:prose-invert prose-img:rounded-lg"
      >
        <ContentRenderer v-if="article" :value="article" class="markdown-body">
          <template #empty>
            <p>No content found.</p>
          </template>
        </ContentRenderer>
      </div>
    </div>

    <BlogToc :links="data.tocLinks" />

    <div class="flex flex-row flex-wrap md:flex-nowrap mt-10 gap-2"></div>
  </div>
</template>
