import type { ContactItem, FooterSection, Image, LinkItem, Project } from "~/types";

export const navbarData: { links: LinkItem[] } = {
  links: [
    { text: "主页", link: "/" },
    { text: "博客", link: "/blogs" },
    { text: "作品集", link: "/portfolio" },
    { text: "关于我", link: "/about" },
  ],
};

export const ownerData: { name: string } = {
  name: "Kiameow",
};

export const introductionData = "web developer / ameture designer";

export const aboutMeData: { description: string; avatar: Image } = {
  description:
    "你好哇, 我是Kiameow，一名热爱编程的前端工程师，一名充满激情的探索者和记录者，热衷于分享生活中的点滴发现和深刻思考。在这个博客上，我希望能与你一起探索生活的无限可能，无论是科技的前沿、艺术的魅力、旅行的奇遇还是心灵的触动。",
  avatar: {
    src: "/images/avatar.png",
    alt: "Kiameow's avatar",
  },
};

export const projectData: Project[] = [
  {
    name: "Project1",
    description: "Description1",
    link: "/",
    banner: {
      src: "/images/project1.png",
      alt: "Project1",
    },
  },
  {
    name: "Project2",
    description: "Description2",
    link: "/",
    banner: {
      src: "/images/project1.png",
      alt: "Project1",
    },
  },
  {
    name: "Project2",
    description: "Description2",
    link: "/",
    banner: {
      src: "/images/project1.png",
      alt: "Project1",
    },
  },
  {
    name: "Project2",
    description: "Description2",
    link: "/",
    banner: {
      src: "/images/project1.png",
      alt: "Project1",
    },
  },
]

export const contactData: { contacts: ContactItem[] } = {
  contacts: [
    {
      text: "Kiameow",
      link: "https://github.com/Kiameow",
      icon: "grommet-icons:github",
    },
    {
      text: "zhang_lumi@foxmail",
      link: "mailto:zhang_lumi@foxmail.com",
      icon: "grommet-icons:mail",
    },
  ],
};

export const seoData = {
  siteTitle: "Kiameow's blog",
  description: "Kiameow",
  ogTitle: "Kiameow",
  twitterDescription: "Kiameow",
  image: "",
  siteURL: "https://kiameow.top",
  twitterHandle: "Badger_xxx",
  mailAddress: "zhang_lumi@foxmail.com",
};

export const footerContent: FooterSection[] = [
  {
    name: "致谢",
    innerLink: false,
    list: [
      { text: "Nuxt", link: "nuxt.com" },
      { text: "GSAP", link: "gsap.com" },
      { text: "sonar", link: "https://www.sonarmusic.com.au/" },
    ],
  },
  {
    name: "联系我",
    innerLink: false,
    list: [
      { text: "Github", link: "https://github.com/Kiameow" },
      { text: "Email", link: "mailto:zhang_lumi@foxmail.com" },
    ],
  },
  {
    name: "站点地图",
    innerLink: true,
    list: [
      { text: "主页", link: "/" },
      { text: "博客", link: "/blogs" },
      { text: "作品集", link: "/portfolio" },
      { text: "关于我", link: "/about" },
    ],
  },
  {
    name: "友情链接",
    innerLink: false,
    list: [],
  },
];

export const ICPFiling : LinkItem = {
  text: "浙ICP备2023046775号-1",
  link: "https://beian.miit.gov.cn/",
  newWindow: true,
}