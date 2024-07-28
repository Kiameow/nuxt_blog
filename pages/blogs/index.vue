<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";
import { debouncedRef } from "@vueuse/core";
import { Search } from "lucide-vue-next";
import Badge from "~/components/ui/badge/Badge.vue";
import { Input } from "~/components/ui/input";
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

const filteredArticles = computed(() => {
  if (selectedCategory.value === "全部") {
    return articles.value?.filter(v => v.title?.includes(debouncedSearch.value))
  } else {
    return articles.value?.filter(v => v.categories.includes(selectedCategory.value)).filter(v => v.title?.toLowerCase().includes(debouncedSearch.value))
  }
})

function changeCategory(e: MouseEvent) {
  const target = e.target as HTMLButtonElement;
  selectedCategory.value = target.value;
}

</script>

<template>
  <div class="min-h-screen py-20 px-10">
    <div id="blog-top-section" class="flex gap-10">
      <div
        id="blog-categories"
        class="grid w-7/12 grid-cols-9 gap-y-3 justify-items-center"
      >
        <Button
          :variant="category === selectedCategory ? 'default' : 'secondary'"
          class="rounded-full w-20 h-7 text-xs"
          :value="category"
          @click="changeCategory"
          v-for="[category, cnt] in allCategories"
        >
          {{ category }}
        </Button>
      </div>
      <div class="relative flex-grow items-center max-h-10">
        <Input
          id="search"
          type="text"
          placeholder="Search..."
          class="pl-10 rounded-full"
          v-model="searchTerm"
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        >
          <Search class="size-6 text-muted-foreground" />
        </span>
        <Icon
          class="absolute end-0 inset-y-0"
          name="material-symbols:close-small-outline-rounded"
          size="40px"
          style="color: gray"
        />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-x-12 gap-y-16 my-10">
      <NuxtLink
        class="flex gap-x-8 w-full"
        v-for="article in filteredArticles"
        :key="article._id"
        :to="article._path"
      >
        <img
          class="rounded-3xl w-5/12 aspect-video object-cover"
          src="/images/default.jpg"
          alt=""
        />
        <div class="flex-grow relative py-4">
          <p class="text-2xl font-bold">{{ article.title }}</p>
          <div class="absolute bottom-4 w-full pr-4 flex justify-between">
            <div class="flex justify-start gap-2">
              <Badge v-for="category in article.categories">{{
                category
              }}</Badge>
            </div>
            <div class="flex justify-end gap-4">
              <div class="flex justify-center gap-2 items-center">
                <Icon
                  name="mdi:clock-outline"
                  size="20px"
                  style="color: gray"
                />
                <span>{{ article.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
