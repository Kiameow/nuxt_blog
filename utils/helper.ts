import type { Image, PostCard } from "~/types";

export function createImage(): Image {
  return {
    src: 'default-src',
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
  };
  const properties = Object.keys(templateObj) as (keyof PostCard)[];
  return properties;
}

export function createDefaultArticle(): {title: string, date: string} {
  return {
    title: "default title",
    date: "1970-1-1",
  }
}
