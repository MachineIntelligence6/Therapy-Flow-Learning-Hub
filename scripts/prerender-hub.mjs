import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');
const domain = 'https://learninghub.therapyflow.pro';

const STRAPI_URL = process.env.VITE_STRAPI_API_URL || 'https://strapi-admin.therapyflow.pro';
const STRAPI_TOKEN = process.env.VITE_STRAPI_API_TOKEN;

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll('"', '&quot;');
}

function resolveMediaUrl(media) {
  if (!media) return undefined;
  const formatUrl =
    media.formats?.large?.url ||
    media.formats?.medium?.url ||
    media.formats?.small?.url ||
    media.url;
  if (!formatUrl) return undefined;
  if (/^https?:\/\//i.test(formatUrl)) return formatUrl;
  const origin = STRAPI_URL.replace(/\/$/, '');
  return `${origin}${formatUrl.startsWith('/') ? '' : '/'}${formatUrl}`;
}

async function strapiFetch(endpoint) {
  const url = `${STRAPI_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  const headers = { Accept: 'application/json' };
  if (STRAPI_TOKEN) headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Strapi request failed: ${res.status} ${endpoint}`);
  return res.json();
}

function buildHeadTags(seo, jsonLdItems = []) {
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeAttr(seo.description)}" />`,
    `<meta name="robots" content="${escapeAttr(seo.robots)}" />`,
    `<link rel="canonical" href="${escapeAttr(seo.canonicalUrl)}" />`,
    `<meta property="og:title" content="${escapeAttr(seo.ogTitle)}" />`,
    `<meta property="og:description" content="${escapeAttr(seo.ogDescription)}" />`,
    `<meta property="og:url" content="${escapeAttr(seo.canonicalUrl)}" />`,
    `<meta property="og:type" content="${seo.ogType}" />`,
    `<meta property="og:site_name" content="${escapeAttr(seo.siteName)}" />`,
    `<meta name="twitter:card" content="${escapeAttr(seo.twitterCard)}" />`,
    `<meta name="twitter:title" content="${escapeAttr(seo.ogTitle)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(seo.ogDescription)}" />`,
  ];

  if (seo.ogImage) {
    tags.push(`<meta property="og:image" content="${escapeAttr(seo.ogImage)}" />`);
    tags.push(`<meta name="twitter:image" content="${escapeAttr(seo.ogImage)}" />`);
  }
  if (seo.twitterHandle) tags.push(`<meta name="twitter:site" content="${escapeAttr(seo.twitterHandle)}" />`);
  if (seo.googleSiteVerification) {
    tags.push(`<meta name="google-site-verification" content="${escapeAttr(seo.googleSiteVerification)}" />`);
  }

  for (const item of jsonLdItems) {
    if (item) tags.push(`<script type="application/ld+json">${JSON.stringify(item)}</script>`);
  }

  return tags.join('\n    ');
}

function injectHead(html, headTags) {
  return html.replace(/<head>/i, `<head>\n    ${headTags}`);
}

function resolveHubIndexSeo(global) {
  const seo = global?.LearningHub_SEO;
  const title = seo?.Meta_Title || 'TherapyFlow Learning Hub — Guides & Resources';
  const description =
    seo?.Meta_Description ||
    'Explore articles, guides, and resources to get the most out of TherapyFlow for your therapy practice.';

  return {
    title,
    description,
    canonicalUrl: seo?.Canonical_URL || `${domain}/`,
    ogTitle: seo?.OG_Title || title,
    ogDescription: seo?.OG_Description || description,
    ogImage: resolveMediaUrl(seo?.OG_Image) || resolveMediaUrl(global?.Default_OG_Image),
    ogType: 'website',
    siteName: global?.Site_Name || 'TherapyFlow',
    twitterCard: seo?.Twitter_Card || 'summary_large_image',
    robots: seo?.Robots || 'index, follow',
    twitterHandle: global?.Twitter_Handle,
    googleSiteVerification: global?.Google_Site_Verification,
  };
}

function resolveArticleSeo(article, global) {
  const seo = article.SEO;
  const title = seo?.Meta_Title || article.title;
  const description = seo?.Meta_Description || article.Description || '';

  return {
    title,
    description,
    canonicalUrl: seo?.Canonical_URL || `${domain}/${article.slug}`,
    ogTitle: seo?.OG_Title || title,
    ogDescription: seo?.OG_Description || description,
    ogImage:
      resolveMediaUrl(seo?.OG_Image) ||
      resolveMediaUrl(article.Card_Image) ||
      resolveMediaUrl(global?.Default_OG_Image),
    ogType: 'article',
    siteName: global?.Site_Name || 'TherapyFlow',
    twitterCard: seo?.Twitter_Card || 'summary_large_image',
    robots: seo?.Robots || 'index, follow',
    twitterHandle: global?.Twitter_Handle,
    googleSiteVerification: global?.Google_Site_Verification,
  };
}

function writePrerenderedHtml(baseHtml, outPath, headTags) {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, injectHead(baseHtml, headTags));
}

async function main() {
  const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf8');
  const globalPopulate =
    'populate[LearningHub_SEO][populate]=OG_Image&populate=Default_OG_Image&populate=Organization_Logo';
  const articlePopulate =
    'fields[0]=slug&fields[1]=title&fields[2]=Description&fields[3]=updatedAt&fields[4]=Publish_Date&populate[SEO][populate]=OG_Image&populate=Card_Image&pagination[pageSize]=100';

  let global = null;
  let articles = [];

  try {
    const [globalRes, articlesRes] = await Promise.all([
      strapiFetch(`/api/global-site-settings?${globalPopulate}`),
      strapiFetch(`/api/learning-hubs?${articlePopulate}`),
    ]);
    global = globalRes?.data || null;
    articles = Array.isArray(articlesRes?.data) ? articlesRes.data : [];
  } catch (error) {
    console.warn('Hub prerender: Strapi unavailable, using fallback SEO only.', error.message);
  }

  const indexSeo = resolveHubIndexSeo(global);
  writePrerenderedHtml(baseHtml, join(distDir, 'index.html'), buildHeadTags(indexSeo));

  const sitemapEntries = [
    `<url><loc>${domain}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`,
  ];

  for (const article of articles) {
    if (!article.slug) continue;
    const seo = resolveArticleSeo(article, global);
    const slugDir = join(distDir, article.slug);
    writePrerenderedHtml(baseHtml, join(slugDir, 'index.html'), buildHeadTags(seo));

    const lastmod = (article.updatedAt || article.Publish_Date || new Date().toISOString()).slice(0, 10);
    sitemapEntries.push(
      `<url><loc>${domain}/${article.slug}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    );
  }

  writeFileSync(
    join(distDir, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${domain}/sitemap.xml\n`,
  );

  writeFileSync(
    join(distDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${sitemapEntries.join('\n  ')}\n</urlset>\n`,
  );

  console.log(`Learning hub prerender complete: / + ${articles.length} article(s)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
