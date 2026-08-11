import type { Article } from '../types';

/** SmartHub Handbook path: chapters ordered by CMS Order, then title. */
export function sortChapters(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => {
    const orderA = typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
    const orderB = typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return (a.title || '').localeCompare(b.title || '');
  });
}

export function chapterSlugs(articles: Article[]): string[] {
  return sortChapters(articles).map((a) => a.slug);
}

export function getNextChapter(
  articles: Article[],
  currentSlug: string,
): Article | undefined {
  const ordered = sortChapters(articles);
  const idx = ordered.findIndex((a) => a.slug === currentSlug);
  if (idx < 0 || idx >= ordered.length - 1) return undefined;
  return ordered[idx + 1];
}

export function getPrevChapter(
  articles: Article[],
  currentSlug: string,
): Article | undefined {
  const ordered = sortChapters(articles);
  const idx = ordered.findIndex((a) => a.slug === currentSlug);
  if (idx <= 0) return undefined;
  return ordered[idx - 1];
}

export function chapterIndex(articles: Article[], slug: string): number {
  return sortChapters(articles).findIndex((a) => a.slug === slug);
}
