import type { TocLink } from "@nuxt/content";
import type { Image } from "./basic"

export interface BlogPost {
  title: string;
  date: string;
  description: string;
  banner: Image;
  ogImage: string;
  categories: string[];
  published: boolean;
  tocLinks: TocLink[];
}

export interface PostCard {
  _id: string;
  _path: string;
  title: string;
  description: string;
  date: string;
  banner: Image;
  categories: string[];
  published: boolean;
}
