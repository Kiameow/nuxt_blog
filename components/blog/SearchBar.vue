<script setup lang='ts'>
import { Search } from 'lucide-vue-next';

const searchTerm = defineModel<string>()
</script>

<template>
  <Input id="search" type="text" placeholder="Search..." class="pl-10 rounded-full" v-model="searchTerm" />
  <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
    <Search class="size-6 text-muted-foreground" />
  </span>
  <Icon class="absolute end-0 inset-y-0" name="material-symbols:close-small-outline-rounded" size="40px"
    style="color: gray" />
</template>