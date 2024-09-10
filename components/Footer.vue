<script setup lang="ts">
// credit
// friendly link
// contact way
// copy right
// sitemap
// bei an hao
import type { LinkItem } from "~/types";
import { footerContent, ICPFiling } from "~/data";

const filteredFooterContent = footerContent.filter(
  (section) => section.list && section.list.length
);
</script>

<template>
  <hr class="my-8 w-11/12 mx-auto" />
  <div class="mb-10">
    <div class="flex justify-around mb-10">
      <div v-for="section in filteredFooterContent">
        <p class="font-bold text-lg">{{ section.name }}</p>
        <div v-for="item in section.list">
          <NuxtLink v-if="section.innerLink" :to="item.link">{{
            item.text
          }}</NuxtLink>
          <a v-else :href="item.link" target="_blank">{{ item.text }}</a>
        </div>
      </div>
    </div>
    <div class="flex justify-center" v-if="ICPFiling.text.length > 0">
      <a :href="ICPFiling.link" target="_blank">{{ ICPFiling.text }}</a>
    </div>
  </div>
</template>
