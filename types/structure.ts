import type { LinkItem } from "./basic";

export interface FooterSection {
    name: string;
    innerLink: boolean;
    list: LinkItem[];
}