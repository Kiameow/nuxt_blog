<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";
import { debouncedRef } from "@vueuse/core";
import type { PostCard } from "~/types";
import { gsap } from 'gsap';

const { data: articles } = await useAsyncData<PostCard[]>('articles', () => {
  return queryContent('/blogs')
    .where({ published: true })
    .only(getPostCardKeys())
    .sort({ date: -1 })
    .find() as Promise<PostCard[]>;
});

const allCategories = new Map();
allCategories.set("全部", articles.value?.length);
articles.value?.forEach((article) => {
  const categories: Array<string> = article.categories || [];
  categories.forEach((c) => {
    if (allCategories.has(c)) {
      const cnt = allCategories.get(c);
      allCategories.set(c, cnt + 1);
    } else {
      allCategories.set(c, 1);
    }
  });
});

const selectedCategory = ref("全部");
const searchTerm = ref('');
const debouncedSearch = debouncedRef(searchTerm, 100);

const filteredArticles = computed(() => {
  if (selectedCategory.value === "全部") {
    return articles.value?.filter(v => v.title?.toLowerCase().includes(debouncedSearch.value.toLowerCase())) ?? [];
  } else {
    return articles.value
      ?.filter(v => v.categories.includes(selectedCategory.value))
      .filter(v => v.title?.toLowerCase().includes(debouncedSearch.value.toLowerCase()))
      ?? [];
  }
});

const articlesByYear = computed(() => {
  const grouped = filteredArticles.value?.reduce((acc, article) => {
    const year = article.date.split('-')[0];
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(article);
    return acc;
  }, {} as Record<string, PostCard[]>);
  return Object.entries(grouped)
  .sort((a, b) => Number(b[0]) - Number(a[0]));
});

function changeCategory(e: MouseEvent) {
  const target = e.target as HTMLButtonElement;
  selectedCategory.value = target.value;
}

function clearSearchTerm() {
  searchTerm.value = '';
}

</script>

<template>
  <div class="min-h-screen py-20 px-10">
    <div id="blog-top-section" class="flex gap-10">
      <div id="blog-categories" class="grid w-7/12 grid-cols-9 gap-y-3 justify-items-center">
        <Button :variant="category === selectedCategory ? 'default' : 'secondary'" class="rounded-full w-20 h-7 text-xs"
          :value="category" @click="changeCategory" v-for="[category, cnt] in allCategories">
          {{ category }}
        </Button>
      </div>
      <div class="relative flex-grow items-center max-h-10">
        <BlogSearchBar v-model="searchTerm" @clear-search="clearSearchTerm" />
      </div>
    </div>
    <div class="flex flex-col gap-y-8 my-10 w-[800px] mx-auto">
      <!-- <BlogPostCard v-for="article in filteredArticles" :article="article" class="min-h-[160px]" /> -->
      <div v-for="([year, articlesPerYear], index) in articlesByYear" :key="index" >
        <span class="font-sans text-[8rem] hollow-text">{{ year }}</span>
        <dir v-for="article in articlesPerYear" class="flex items-center gap-x-4">
          <span class="w-2 aspect-square rounded-full inline-block bg-black"></span>
          <BlogPostLine :article="article" class="flex-grow"/>
        </dir>
      </div>
      <div v-if="filteredArticles.length === 0">No Results</div>
    </div>
  </div>
</template>

<style scoped>
.hollow-text {
  -webkit-text-stroke: 1px rgb(204, 204, 204);
  color: transparent;
}

.hollow-text-dark {

}
</style>
