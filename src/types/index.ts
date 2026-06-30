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
