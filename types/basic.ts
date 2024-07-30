export interface LinkItem {
  text: string;
  link: string;
}

export interface ContactItem extends LinkItem {
  icon: string;
}

export interface Image {
  src: string;
  alt?: string;
  caption?: string; 
}

