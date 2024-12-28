<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";
import { debouncedRef } from "@vueuse/core";
import type { PostCard } from "~/types";
import { gsap } from 'gsap';
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger,CustomEase);

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

CustomEase.create("spring-fade-in", ".5, 0, 0, 1");

const triggered = ref(false);

const initAnimation = () => {
  const articlesToTrigger: gsap.DOMTarget[] = gsap.utils.toArray('.articles-per-year');

  articlesToTrigger.forEach((article, index) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: article,
        start: "top 80%",
        toggleActions: "play none none none",
        once: true,
        markers: false
      }
    });

    tl.fromTo(article, 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: index == 0 ? 0 : 0.8,
        ease: "spring-fade-in",
      }
    ).add(() => {
      // Add class after the animation completes
      (article as Element).classList.add('triggered');
    }, "<+=0.1"); // The "+=0" means it will execute right after the animation finishes
  })
}

onMounted(() => {
  initAnimation();  
})

watch(filteredArticles, () => {
  triggered.value = true;
})

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
    <div class="flex flex-col gap-y-8 my-10 w-[800px] mx-auto" id="articles">
      <!-- <BlogPostCard v-for="article in filteredArticles" :article="article" class="min-h-[160px]" /> -->
      <div v-for="([year, articlesPerYear], index) in articlesByYear" :key="index" class="articles-per-year relative" :class="{ 'triggered': triggered }">
        <span class="font-sans text-[8rem] hollow-text -ml-8 py-2 block">{{ year }}</span>
        <div v-for="article in articlesPerYear" class="flex items-center gap-x-4 h-10">
          <span class="w-2 aspect-square rounded-full inline-block bg-black"></span>
          <BlogPostLine :article="article" class="flex-grow"/>
        </div>
      </div>
      <div v-if="filteredArticles.length === 0">No Results</div>
    </div>
  </div>
</template>

<style scoped>
.hollow-text {
  -webkit-text-stroke: 1px rgb(204, 204, 204);
  color: transparent;
  background-color: white;
}

.articles-per-year::before {
  content: '';
  position: absolute;
  width: 2px;
  height: 0;
  background: black;
  top: 0;
  left: 3px;
  z-index: -1;
  transition: height 2s cubic-bezier(0.5, 0, 0, 1);
}

.articles-per-year.triggered::before {
  height: 100%;
}


</style>
