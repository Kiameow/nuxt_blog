<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";
import { debouncedRef } from "@vueuse/core";
import type { PostCard } from "~/types";

const { data } = await useAsyncData("articles", () => {
  return queryContent("/blogs").only(getPostCardKeys()).find();
});
const articles = ref(data.value as PostCard[]);

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

const publishedArticles = computed(() => {
  return articles.value?.filter(v => v.published);
})

const filteredArticles = computed(() => {
  if (selectedCategory.value === "全部") {
    return publishedArticles.value?.filter(v => v.title?.toLowerCase().includes(debouncedSearch.value.toLowerCase()))
  } else {
    return publishedArticles.value?.filter(v => v.categories.includes(selectedCategory.value)).filter(v => v.title?.toLowerCase().includes(debouncedSearch.value.toLowerCase()))
  }
})

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
    <div class="grid grid-cols-2 gap-x-12 gap-y-16 my-10">
      <BlogPostCard v-for="article in filteredArticles" :article="article" />
      <div v-if="filteredArticles.length === 0">No Results</div>
    </div>
  </div>
</template>
