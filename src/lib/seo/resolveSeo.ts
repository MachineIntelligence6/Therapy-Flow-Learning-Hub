import type { Article } from '../../types';
import type { GlobalSiteSettings, ResolvedSeo, StrapiMedia, StrapiSeoFields } from './types';

const DEFAULT_HUB_DOMAIN = 'https://learninghub.therapyflow.pro';
const DEFAULT_HUB_TITLE = 'TherapyFlow Learning Hub — Guides & Resources';
const DEFAULT_HUB_DESCRIPTION =
  'Explore articles, guides, and resources to get the most out of TherapyFlow for your therapy practice.';

export function resolveMediaUrl(apiUrl: string, media?: StrapiMedia | null): string | undefined {
  if (!media) return undefined;
  const formatUrl =
    media.formats?.large?.url ||
    media.formats?.medium?.url ||
    media.formats?.small?.url ||
    media.url;
  if (!formatUrl) return undefined;
  if (/^https?:\/\//i.test(formatUrl)) return formatUrl;
  const origin = apiUrl.replace(/\/$/, '');
  return `${origin}${formatUrl.startsWith('/') ? '' : '/'}${formatUrl}`;
}

export function resolveHubIndexSeo(global?: GlobalSiteSettings | null, apiUrl?: string): ResolvedSeo {
  const seo = global?.LearningHub_SEO;
  const siteName = global?.Site_Name || 'TherapyFlow';
  const domain = (global?.LearningHub_Domain || DEFAULT_HUB_DOMAIN).replace(/\/$/, '');

  const title = seo?.Meta_Title || DEFAULT_HUB_TITLE;
  const description = seo?.Meta_Description || DEFAULT_HUB_DESCRIPTION;

  return {
    title,
    description,
    canonicalUrl: seo?.Canonical_URL || `${domain}/`,
    ogTitle: seo?.OG_Title || title,
    ogDescription: seo?.OG_Description || description,
    ogImage: resolveMediaUrl(apiUrl || '', seo?.OG_Image) || resolveMediaUrl(apiUrl || '', global?.Default_OG_Image),
    ogType: 'website',
    siteName,
    twitterCard: seo?.Twitter_Card || 'summary_large_image',
    robots: seo?.Robots || 'index, follow',
    twitterHandle: global?.Twitter_Handle || undefined,
    googleSiteVerification: global?.Google_Site_Verification || undefined,
  };
}

export function resolveArticleSeo(
  article: Article,
  global?: GlobalSiteSettings | null,
  apiUrl?: string,
  seo?: StrapiSeoFields | null,
): ResolvedSeo {
  const domain = (global?.LearningHub_Domain || DEFAULT_HUB_DOMAIN).replace(/\/$/, '');
  const siteName = global?.Site_Name || 'TherapyFlow';

  const title = seo?.Meta_Title || article.title;
  const description = seo?.Meta_Description || article.description;

  return {
    title,
    description,
    canonicalUrl: seo?.Canonical_URL || `${domain}/${article.slug}`,
    ogTitle: seo?.OG_Title || title,
    ogDescription: seo?.OG_Description || description,
    ogImage:
      resolveMediaUrl(apiUrl || '', seo?.OG_Image) ||
      (typeof article.image === 'string' ? article.image : undefined) ||
      resolveMediaUrl(apiUrl || '', global?.Default_OG_Image),
    ogType: 'article',
    siteName,
    twitterCard: seo?.Twitter_Card || 'summary_large_image',
    robots: seo?.Robots || 'index, follow',
    twitterHandle: global?.Twitter_Handle || undefined,
    googleSiteVerification: global?.Google_Site_Verification || undefined,
  };
}

export function buildArticleJsonLd(
  article: Article,
  global?: GlobalSiteSettings | null,
  apiUrl?: string,
) {
  const domain = (global?.LearningHub_Domain || DEFAULT_HUB_DOMAIN).replace(/\/$/, '/');
  const publisherName = global?.Organization_Name || global?.Site_Name || 'TherapyFlow';
  const publisherLogo = resolveMediaUrl(apiUrl || '', global?.Organization_Logo);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    image: typeof article.image === 'string' ? article.image : undefined,
    author: {
      '@type': 'Organization',
      name: publisherName,
    },
    publisher: {
      '@type': 'Organization',
      name: publisherName,
      ...(publisherLogo ? { logo: { '@type': 'ImageObject', url: publisherLogo } } : {}),
    },
    mainEntityOfPage: `${domain}${article.slug}`,
  };
}

export function buildBreadcrumbJsonLd(article: Article, global?: GlobalSiteSettings | null) {
  const domain = (global?.LearningHub_Domain || DEFAULT_HUB_DOMAIN).replace(/\/$/, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'TherapyFlow', item: global?.Landing_Domain || 'https://therapyflow.pro' },
      { '@type': 'ListItem', position: 2, name: 'Learning Hub', item: `${domain}/` },
      { '@type': 'ListItem', position: 3, name: article.title, item: `${domain}/${article.slug}` },
    ],
  };
}
