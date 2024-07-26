import type { Image } from "./utils"

export interface BlogPost {
  title: string
  date: string
  description: string
  image: string
  alt: string
  ogImage: string
  tags: string[]
  published: boolean
}

export interface PostCard {
  _id: string;
  _path: string;
  title: string;
  description?: string;
  date: string;
  banner: Image;
  categories: string[];
}
