<script setup>
import { aboutMeData } from '~/data';

  const aboutMe = aboutMeData
</script>

<template>
  <div class="py-20 px-20">
    {{ aboutMeData.description }}
  </div>
</template>
