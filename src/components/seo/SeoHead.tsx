import { useEffect } from 'react';
import type { ResolvedSeo } from '../../lib/seo/types';

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!element) {
    const tagName = selector.includes('link') ? 'link' : 'meta';
    element = document.createElement(tagName) as HTMLMetaElement | HTMLLinkElement;
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    element!.setAttribute(key, value);
  });
}

type SeoHeadProps = {
  seo: ResolvedSeo;
};

export const SeoHead = ({ seo }: SeoHeadProps) => {
  useEffect(() => {
    document.title = seo.title;

    upsertMeta('meta[name="description"]', { name: 'description', content: seo.description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: seo.robots });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: seo.canonicalUrl });

    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: seo.ogTitle });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: seo.ogDescription });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: seo.canonicalUrl });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: seo.ogType });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: seo.siteName });

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: seo.twitterCard });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.ogTitle });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.ogDescription });

    if (seo.ogImage) {
      upsertMeta('meta[property="og:image"]', { property: 'og:image', content: seo.ogImage });
      upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: seo.ogImage });
    }

    if (seo.twitterHandle) {
      upsertMeta('meta[name="twitter:site"]', { name: 'twitter:site', content: seo.twitterHandle });
    }

    if (seo.googleSiteVerification) {
      upsertMeta('meta[name="google-site-verification"]', {
        name: 'google-site-verification',
        content: seo.googleSiteVerification,
      });
    }
  }, [seo]);

  return null;
};
