<template>
    <!-- 圆形按钮 -->
    <div ref="button" class="down-button" :style="{ opacity: insideRange ? 1 : 0 }">
      <button 
        class="circle-button" 
        @click="scrollDown(element, to)"
        :disabled="!insideRange"
      >
        <!-- 向下箭头 -->
        <span class="arrow">↓</span>
      </button>
    </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';

const props = defineProps<{
  element: Element | null
  to: number
  invisibleWhenLeaveBottom: Boolean
}>()

const button = useTemplateRef('button');
const insideRange = ref(true);

onMounted(() => {
  window.addEventListener('scroll', () => {
    if (button != null && props.invisibleWhenLeaveBottom) {
      const dist2windowBottom = window.innerHeight - (button.value as HTMLElement).getBoundingClientRect().bottom;
      const minRange = 0;
      const maxRange = 10;
      if (dist2windowBottom <= maxRange && dist2windowBottom >= minRange) {
        console.log(111)
        insideRange.value = true;
      } else {
        insideRange.value = false;
      }
      
    }
  })
})


function scrollDown(element: Element | null, to: number) {
  const height = window.scrollY + to + 
    (
      element ? 
      element.getBoundingClientRect().top : 
      0 
    );
  window.scroll({
    top: height,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.down-button {
  transition: opacity 0.5s ease-in-out;
}

.circle-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #0070f3;
  color: white;
  font-size: 30px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease, background-color 0.3s ease;
}

.circle-button:disabled {
  cursor: auto;
}

.arrow {
  display: inline-block;
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}

.circle-button:hover {
  background-color: #005bb5;
}

.circle-button:focus {
  outline: none;
}

</style>
