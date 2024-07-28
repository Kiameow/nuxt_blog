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
  <div class="py-20 px-20 w-full h-screen">
    <Carousel class="relative w-full">
      <CarouselContent id="carousel" class="w-full">
        <CarouselItem  
          class="md:basis-1/2 lg:basis-1/3 h-screen"
          v-for="project in projects" :key="project.name">
          <div class="w-full h-full flex justify-center items-center border">
            {{ project.name }}
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
</template>
