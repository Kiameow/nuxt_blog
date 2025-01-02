import gsap from 'gsap'
import type { Directive } from 'vue';
import { ensureSpringFadeInEase } from '~/utils/helper'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('underline', vUnderline);
    nuxtApp.vueApp.directive('fast-up-fade-in', vFastUpFadeIn);
    nuxtApp.vueApp.directive('fan-fade-in', vFanFadeIn);
});

const vUnderline : Directive = {
  mounted: (el : HTMLElement) => {
    // Ensure link has required structure
    el.classList.add('relative', 'inline-block')
    
    // Create underline element if it doesn't exist
    if (!el.querySelector('.underline-indicator')) {
      const underline = document.createElement('span')
      underline.className = 'underline-indicator absolute left-0 bottom-0 h-[1px] w-0 bg-current opacity-50 pointer-events-none'
      el.appendChild(underline)
    }
    
    // Create GSAP animation
    ensureSpringFadeInEase();
    const underline = el.querySelector('.underline-indicator')
    const tl = gsap.timeline({ 
      paused: true,
      defaults: { duration: 0.3, ease: 'spring-fade-in' }
    })
    
    tl.to(underline, {
      width: '100%',
      duration: 0.3
    })
    
    // Add event listeners
    el.addEventListener('mouseenter', () => tl.play())
    el.addEventListener('mouseleave', () => tl.reverse())
  }
}

const vFastUpFadeIn: Directive = {
  mounted: (el: HTMLElement) => {
    gsap.from(el, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'spring-fade-in'
    })
  }
}


const vFanFadeIn: Directive = {
    mounted: (el: HTMLElement) => {
      gsap.set(el, {
        clipPath: 'polygon(50% 50%, 0 0, 100% 0)' // 初始扇形裁剪，从左上角到右上角（不可见）
      });
  
      gsap.to(el, {
        opacity: 1,  // 最终状态：完全可见
        clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%)',  // 扇形逐渐扩展到整个矩形
        duration: 1.5,  // 动画持续时间
        ease: 'spring-fade-in' // 缓动函数
      });
    }
  };
