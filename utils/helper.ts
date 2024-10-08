import type { Image, PostCard } from "~/types";

export function createDefaultImage(): Image {
  return {
    src: '/images/default.jpg',
    alt: 'default-alt',
  };
}

export function getPostCardKeys(): (keyof PostCard)[] {
  type templateOfPostCard = Record<(keyof PostCard) , undefined>;
  const templateObj : templateOfPostCard = {
    _id: undefined,
    _path: undefined,
    title: undefined,
    description: undefined,
    banner: undefined,
    categories: undefined,
    date: undefined,
    published: undefined,
  };
  const properties = Object.keys(templateObj) as (keyof PostCard)[];
  return properties;
}

export function createDefaultArticle(): PostCard {
  return {
    title: "default title",
    date: "1970-1-1",
    _id: "default",
    _path: "default",
    description: "default description",
    banner: createDefaultImage(),
    categories: [],
    published: true,
  }
}
