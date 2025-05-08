export interface ServiceItem {
  id: number;
  title: string;
  icon: string;
  description: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
}

export interface NavItem {
  name: string;
  path: string;
}

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}