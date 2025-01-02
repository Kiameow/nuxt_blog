<template>
  <!-- render in markdown  -->

  <template>
    <div class="px-6 py-20 container max-w-5xl mx-auto">
      <!-- Project Header -->
      <div id="project-header" class="space-y-6 mb-12">
        <div class="space-y-4">
          <div class="flex items-center">
            <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
              {{ data.heading }}
            </h1>
            <div>
              <div v-for="contributor in data.contributors" class="aspect-square w-8">
                <img :src="contributor.avatar.src" :alt="contributor.name" class="w-full h-full rounded-[16px] object-cover">
              </div>
            </div>
          </div>

          <div class="flex space-x-4">
            <!-- Project Timeline -->
            <div class="flex items-center space-x-1 text-sm">
              <time class="text-gray-600 dark:text-gray-400">{{
                data.startTime
              }}</time>
              <span class="text-gray-400 dark:text-gray-400">--</span>
              <time class="text-gray-600 dark:text-gray-400">{{
                data.endTime || "Now"
              }}</time>
            </div>

            <!-- Project Types -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="type in data.types"
                :key="type"
                class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800"
              >
                {{ type }}
              </span>
            </div>
          </div>
        </div>

        <!-- Banner Image -->
        <div
          v-if="data.banner && data.banner.src"
          class="aspect-video overflow-hidden rounded-xl"
        >
          <img
            :src="data.banner?.src"
            :alt="data.banner?.alt"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Project Main Content -->
      <div id="project-main" class="grid md:grid-cols-3 gap-8">
        <!-- Left Column: Project Info -->
        <div class="md:col-span-2 space-y-8">
          <!-- Introduction -->
          <div class="prose prose-lg dark:prose-invert">
            {{ data.intro }}
          </div>

          <!-- Project Story / Content -->
          <div class="prose prose-lg dark:prose-invert">
            <ContentRenderer v-if="project" :value="project">
              <template #empty>
                <p>No content found.</p>
              </template>
            </ContentRenderer>
          </div>
        </div>

        <!-- Right Column: Project Details -->
        <div class="space-y-6">
          <!-- Project Link -->
          <div
            v-if="data.link"
            class="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50"
          >
            <h3 class="text-lg font-semibold mb-4">Project Link</h3>
            <a
              :href="data.link"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Visit Project →
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { Project } from "~/types";
const { path } = useRoute();
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const { data: project, error } = await useAsyncData(`project-${path}`, () =>
  queryContent().where({ _path: path }).findOne()
);

console.log(project);
if (error.value || project.value?.public === false) navigateTo("/404");

const data = computed<Project>(() => {
  return {
    _id: project.value?._id || "404-id",
    _path: project.value?._path || "/404",
    heading: project.value?.heading || "no heading available",
    intro: project.value?.intro || "no intro available",
    banner: project.value?.banner,
    types: project.value?.types || [],
    startTime: project.value?.startTime,
    endTime: project.value?.endTime,
    contributors: project.value?.contributors || [],
    link: project.value?.link,
    public: project.value?.public || false,
  };
});

onMounted(() => {
  // Header animation
  gsap.from("#project-header", {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power3.out",
  });

  // Content stagger animation
  gsap.from("#project-main > div", {
    opacity: 0,
    y: 20,
    stagger: 0.2,
    duration: 0.8,
    scrollTrigger: {
      trigger: "#project-main",
      start: "top center+=100",
      toggleActions: "play none none reverse",
    },
  });
});
</script>

<style scoped></style>
