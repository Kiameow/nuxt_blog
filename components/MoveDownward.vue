<template>
    <!-- 圆形按钮 -->
    <button class="circle-button" @click="scrollDown">
      <!-- 向下箭头 -->
      <span class="arrow">↓</span>
    </button>
</template>

<script>
export default {
  name: 'ScrollDownButton',
  methods: {
    scrollDown() {
      // 滚动页面下去一个屏幕高度（100vh）
      window.scrollBy({
        top: window.innerHeight,  // 滚动的距离是一个屏幕的高度
        behavior: 'smooth'        // 使用平滑滚动效果
      });
    }
  }
};
</script>

<style scoped>

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

.moved {
  transform: translateY(100vh); /* 向下位移一个屏幕的高度 */
}
</style>
