export type HubBrowseFilters = {
  chapter?: string;
  section?: string;
  category?: string;
};

export function labelsMatch(a?: string | null, b?: string | null): boolean {
  if (!a || !b) return false;
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

export function buildHubBrowseUrl(filters: HubBrowseFilters = {}): string {
  const params = new URLSearchParams();

  if (filters.chapter?.trim()) params.set('chapter', filters.chapter.trim());
  if (filters.section?.trim()) params.set('section', filters.section.trim());
  if (filters.category?.trim() && filters.category !== 'all') {
    params.set('category', filters.category.trim());
  }

  const query = params.toString();
  return query ? `/?${query}` : '/';
}

export function articleMatchesBrowseFilters(
  article: { chapter?: string; section?: string; category: string },
  filters: HubBrowseFilters,
): boolean {
  if (filters.category && filters.category !== 'all') {
    const categorySlug = article.category.toLowerCase().replace(/\s+/g, '-');
    const filterSlug = filters.category.toLowerCase().replace(/\s+/g, '-');
    if (categorySlug !== filterSlug && !labelsMatch(article.category, filters.category)) {
      return false;
    }
  }

  if (filters.chapter) {
    const articleChapter = article.chapter?.trim() || article.category?.trim();
    if (!labelsMatch(articleChapter, filters.chapter)) return false;
  }

  if (filters.section && !labelsMatch(article.section, filters.section)) {
    return false;
  }

  return true;
}

export function getArticleChapterLabel(article: { chapter?: string; category: string }): string | undefined {
  return article.chapter?.trim() || article.category?.trim() || undefined;
}

export function getChapterBrowseFilters(article: {
  chapter?: string;
  category: string;
}): HubBrowseFilters {
  if (article.chapter?.trim()) {
    return { chapter: article.chapter.trim() };
  }
  return { category: article.category };
}

export function getSectionBrowseFilters(article: {
  chapter?: string;
  section?: string;
  category: string;
}): HubBrowseFilters | null {
  if (!article.section?.trim()) return null;

  const chapterLabel = getArticleChapterLabel(article);
  if (!chapterLabel) return null;

  if (article.chapter?.trim()) {
    return { chapter: article.chapter.trim(), section: article.section.trim() };
  }

  return { category: article.category, section: article.section.trim() };
}
