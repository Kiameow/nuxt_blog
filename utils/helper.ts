import type { Image, PostCard, Project } from "~/types";

export function createDefaultImage(): Image {
  return {
    src: '/images/default.jpg',
    alt: 'default-alt',
  };
}

export function getPostCardKeys(): (keyof PostCard)[] {
  return ['_id', '_path', 'categories', 'date', 'description', 'published', 'title'];
}

export function getProjectCardKeys(): (keyof Project)[] {
  return ['_id', '_path', 'types', 'startTime', 'endTime', 'public', 'heading', 'intro', 'banner', 'contributors'];
}

export function createDefaultArticle(): PostCard {
  return {
    title: "default title",
    date: "1970-1-1",
    _id: "default",
    _path: "default",
    description: "default description",
    categories: [],
    published: true,
  }
}
