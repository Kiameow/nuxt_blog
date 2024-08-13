<script setup>
import { aboutMeData } from "~/data";
import { contactData } from "~/data";
</script>

<template>
  <div class="flex flex-col items-center my-20 px-40 gap-10">
    <img
      class="rounded-full w-40 h-40 shadow-lg"
      :src="aboutMeData.avatar.src"
      :alt="aboutMeData.avatar.alt"
    />
    <div class="">
      {{ aboutMeData.description }}
    </div>
    <Contact :contacts="contactData.contacts" position="end" />
  </div>
</template>
