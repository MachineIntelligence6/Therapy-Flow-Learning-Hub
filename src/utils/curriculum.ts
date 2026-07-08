import type { Article, CurriculumChapter } from '../types';

/** Group articles into Chapter → Section → Article tree, sorted by Order. */
export function buildCurriculum(articles: Article[]): CurriculumChapter[] {
  const sorted = [...articles].sort(
    (a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)
  );

  const chapters = new Map<string, Map<string, Article[]>>();

  for (const article of sorted) {
    const chapterName = article.chapter?.trim() || 'General';
    const sectionName = article.section?.trim() || 'Articles';

    if (!chapters.has(chapterName)) {
      chapters.set(chapterName, new Map());
    }
    const sections = chapters.get(chapterName)!;
    if (!sections.has(sectionName)) {
      sections.set(sectionName, []);
    }
    sections.get(sectionName)!.push(article);
  }

  return [...chapters.entries()].map(([chapter, sections]) => ({
    chapter,
    sections: [...sections.entries()].map(([section, items]) => ({
      section,
      articles: items,
    })),
  }));
}

/** True when at least one article has Chapter metadata from Strapi. */
export function hasCurriculumStructure(articles: Article[]): boolean {
  return articles.some((a) => Boolean(a.chapter?.trim()));
}

export function getAudienceTags(articles: Article[]): string[] {
  const tags = new Set<string>();
  for (const article of articles) {
    if (article.category?.trim()) {
      tags.add(article.category.trim());
    }
  }
  return [...tags].sort((a, b) => a.localeCompare(b));
}
