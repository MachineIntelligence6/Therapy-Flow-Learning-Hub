export type TwitterCardType = 'summary' | 'summary_large_image';

export type StrapiSeoFields = {
  Meta_Title?: string | null;
  Meta_Description?: string | null;
  Canonical_URL?: string | null;
  OG_Title?: string | null;
  OG_Description?: string | null;
  OG_Image?: StrapiMedia | null;
  Twitter_Card?: TwitterCardType | null;
  Robots?: string | null;
  Structured_Data?: Record<string, unknown> | null;
};

export type StrapiMedia = {
  url?: string | null;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
  formats?: Record<string, { url?: string | null; width?: number | null }>;
};

export type GlobalSiteSettings = {
  Site_Name?: string | null;
  Landing_Domain?: string | null;
  LearningHub_Domain?: string | null;
  Default_OG_Image?: StrapiMedia | null;
  Twitter_Handle?: string | null;
  Organization_Name?: string | null;
  Organization_Logo?: StrapiMedia | null;
  Organization_URL?: string | null;
  Google_Site_Verification?: string | null;
  Landing_SEO?: StrapiSeoFields | null;
  LearningHub_SEO?: StrapiSeoFields | null;
};

export type ResolvedSeo = {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  ogType: string;
  siteName: string;
  twitterCard: TwitterCardType;
  robots: string;
  twitterHandle?: string;
  googleSiteVerification?: string;
};
