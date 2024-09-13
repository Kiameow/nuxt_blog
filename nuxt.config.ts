import { seoData } from "./data";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  nitro: {
    static: true,
  },
  site: {
    url: seoData.siteURL,
    identity: {
      type: 'Person',
    },
    twitter: seoData.twitterHandle,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/icon",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/seo",
    "@nuxtjs/sitemap",
  ],
  app: {
    head: {
      link: [
        { rel: 'icon', href: '/images/kiameow-favicon.png' }
      ]
    }
  },
  image: {
    format: ['webp'],
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536
    }
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  content: {
    highlight: {
      theme: {
        default: 'dracula',
        dark: 'github-dark',
      },
      langs: [
        'shell', 'js', 'c', 'cpp', 'json', 'ts', 'html', 'css', 'vue', 'jsx', 'md', 'yaml', 'python'
      ]
    },
    experimental: {
      search: {
        indexed: true,
      }
    },
    markdown: {
      anchorLinks: false
    }
  }
});
