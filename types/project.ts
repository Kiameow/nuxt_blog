import type { Image } from "./basic";

export interface People{
  avatar: Image;
  name: string;
  link: string;
}

export interface Project{
  _id?: string | undefined
  _path?: string | undefined
  heading: string
  intro: string | null;
  link: string | null;
  banner: Image | null;
  types: string[];
  startTime: string | null;
  endTime: string | null;
  contributors: People[]; 
  public: Boolean;
}
