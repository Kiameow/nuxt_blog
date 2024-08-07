import type { ContactItem, LinkItem, Project } from "~/types";

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

export const introductionData = "web developer / frontend developer";

export const aboutMeData: { description: string } = {
  description:
    "我是[你的名字]，一名充满激情的探索者和记录者，热衷于分享生活中的点滴发现和深刻思考。在这个博客上，我希望能与你一起探索生活的无限可能，无论是科技的前沿、艺术的魅力、旅行的奇遇还是心灵的触动。",
};

export const projectData: Project[] = [
  {
    name: "Project1",
    description: "Description1",
    link: "/",
    banner: createDefaultImage(),
  },
  {
    name: "Project2",
    description: "Description2",
    link: "/",
    banner: createDefaultImage(),
  },
  {
    name: "Project2",
    description: "Description2",
    link: "/",
    banner: createDefaultImage(),
  },
  {
    name: "Project2",
    description: "Description2",
    link: "/",
    banner: createDefaultImage(),
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
