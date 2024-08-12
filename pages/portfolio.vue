<script setup lang="ts">
import Carousel from "~/components/ui/carousel/Carousel.vue";
import CarouselContent from "~/components/ui/carousel/CarouselContent.vue";
import CarouselItem from "~/components/ui/carousel/CarouselItem.vue";
import CarouselNext from "~/components/ui/carousel/CarouselNext.vue";
import CarouselPrevious from "~/components/ui/carousel/CarouselPrevious.vue";
import { projectData } from "~/data";

const projects = projectData;
</script>

<template>
  <div class="pt-20 pb-10 px-20 w-full">
    <Carousel class="relative w-full"> 
      <CarouselContent>
        <CarouselItem  
          class="md:basis-1/1 lg:basis-7/12 h-[30rem]"
          v-for="project in projects" :key="project.name">
          <div class="w-full h-full flex justify-center items-center bg-neutral-900 text-white rounded-xl text-3xl">
            {{ project.name }}
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
</template>
