export interface ArticleSection {
  id: number;
  tabLabel: string;
  title: string;
  description: any[]; // Strapi v5 Blocks structure (array of rich-text nodes)
  blogFileUrl?: string;
}

export type RelatedLinkType = 'product' | 'article' | 'external';

export interface RelatedLink {
  label: string;
  url: string;
  link_type: RelatedLinkType;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  category: string;
  readTime: string;
  image: string;
  breadcrumb?: string;
  sections?: ArticleSection[];
  isFeatured?: boolean;
  content?: any;
  chapter?: string;
  section?: string;
  order?: number;
  relatedLinks?: RelatedLink[];
  seo?: import('../lib/seo/types').StrapiSeoFields | null;
  updatedAt?: string;
}

export interface CurriculumSection {
  section: string;
  articles: Article[];
}

export interface CurriculumChapter {
  chapter: string;
  sections: CurriculumSection[];
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
