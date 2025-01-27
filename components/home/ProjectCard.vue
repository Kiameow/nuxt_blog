<template>
  <NuxtLink v-if="projectMeta.public" :to="projectMeta._path">
    <article v-if="projectMeta.public" class="p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <header>
        <h3 class="text-xl font-medium text-gray-900">{{ projectMeta.heading }}</h3>
        <div class="flex gap-4 mt-2 text-sm text-gray-500">
          <span v-if="projectMeta.startTime">
            {{ projectMeta.startTime }} - {{ projectMeta.endTime || 'Present' }}
          </span>
          <div class="flex gap-2">
            <span v-for="type in projectMeta.types" :key="type" 
                  class="px-3 py-1 bg-gray-50 rounded-full text-gray-600 text-xs">
              {{ type }}
            </span>
          </div>
        </div>
      </header>
  
      <img v-if="projectMeta.banner" 
           :src="projectMeta.banner.src" 
           :alt="projectMeta.banner.alt" 
           class="w-full h-auto rounded-md my-4 object-cover"/>
  
      <p v-if="projectMeta.intro" class="text-gray-600 mt-3">{{ projectMeta.intro }}</p>
  
      <footer class="flex justify-between items-center mt-6">
        <a v-if="projectMeta.link" 
           :href="projectMeta.link" 
           target="_blank"
           rel="noopener"
           class="text-gray-900 hover:text-gray-600 transition-colors">
          View Project →
        </a>
        
        <div v-if="projectMeta.contributors.length" class="flex items-center gap-2">
          <span class="text-sm text-gray-500">Contributors:</span>
          <div class="flex -space-x-2">
            <a v-for="person in projectMeta.contributors" 
               :key="person.name"
               :href="person.link"
               target="_blank"
               rel="noopener"
               class="relative group">
              <img :src="person.avatar.src" 
                   :alt="person.name"
                   class="w-8 h-8 rounded-full border-2 border-white hover:-translate-y-1 transition-transform"/>
              <span class="invisible group-hover:visible absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                {{ person.name }}
              </span>
            </a>
          </div>
        </div>
      </footer>
    </article>
  </NuxtLink>
  </template>
  
  <script setup lang="ts">
  import type { Project } from '~/types';
  
  defineProps<{
    projectMeta: Project
  }>();
  </script>
