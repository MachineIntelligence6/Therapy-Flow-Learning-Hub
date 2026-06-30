export interface ArticleSection {
  id: number;
  tabLabel: string;
  title: string;
  description: any[]; // Strapi v5 Blocks structure (array of rich-text nodes)
  blogFileUrl?: string;
}

export interface Article {
  id: number;
  title: string;
  description: string; // Maps from Strapi's 'intro'
  slug: string;
  publishedAt: string;
  category: string; // Mapped dynamically
  readTime: string;
  image: string; // Maps from Strapi's 'thumbnail'
  breadcrumb?: string;
  sections?: ArticleSection[]; // Maps from Strapi's dynamic zone 'Sections'
  isFeatured?: boolean;
  content?: any; // Rich text / Blocks content
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface StrapiConfig {
  apiUrl: string;
  isEnabled: boolean;
}
