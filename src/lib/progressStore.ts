const PROGRESS_KEY = 'learninghub_progress_v1';

export type HubProgress = {
  version: 1;
  completedChapterSlugs: string[];
  lastOpenedSlug?: string;
  updatedAt: string;
};

function emptyProgress(): HubProgress {
  return {
    version: 1,
    completedChapterSlugs: [],
    updatedAt: new Date().toISOString(),
  };
}

export function getHubProgress(): HubProgress {
  if (typeof window === 'undefined') return emptyProgress();
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as HubProgress;
    if (parsed?.version !== 1 || !Array.isArray(parsed.completedChapterSlugs)) {
      return emptyProgress();
    }
    return {
      version: 1,
      completedChapterSlugs: [...new Set(parsed.completedChapterSlugs.filter(Boolean))],
      lastOpenedSlug: parsed.lastOpenedSlug,
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    };
  } catch {
    return emptyProgress();
  }
}

function saveProgress(next: HubProgress): void {
  const payload: HubProgress = {
    ...next,
    completedChapterSlugs: [...new Set(next.completedChapterSlugs)],
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent('hub-progress-change', { detail: payload }));
}

export function markChapterOpened(slug: string): void {
  const current = getHubProgress();
  saveProgress({ ...current, lastOpenedSlug: slug });
}

export function markChapterComplete(slug: string): void {
  const current = getHubProgress();
  if (current.completedChapterSlugs.includes(slug)) {
    saveProgress({ ...current, lastOpenedSlug: slug });
    return;
  }
  saveProgress({
    ...current,
    lastOpenedSlug: slug,
    completedChapterSlugs: [...current.completedChapterSlugs, slug],
  });
}

export function markChapterIncomplete(slug: string): void {
  const current = getHubProgress();
  saveProgress({
    ...current,
    completedChapterSlugs: current.completedChapterSlugs.filter((s) => s !== slug),
  });
}

export function toggleChapterComplete(slug: string): boolean {
  const current = getHubProgress();
  const done = current.completedChapterSlugs.includes(slug);
  if (done) {
    markChapterIncomplete(slug);
    return false;
  }
  markChapterComplete(slug);
  return true;
}

export function isChapterComplete(slug: string, progress?: HubProgress): boolean {
  const p = progress ?? getHubProgress();
  return p.completedChapterSlugs.includes(slug);
}

export function getOverallProgressPercent(
  chapterSlugs: string[],
  progress?: HubProgress,
): number {
  if (!chapterSlugs.length) return 0;
  const p = progress ?? getHubProgress();
  const completed = chapterSlugs.filter((s) => p.completedChapterSlugs.includes(s)).length;
  return Math.round((completed / chapterSlugs.length) * 100);
}

export function getContinueSlug(
  orderedSlugs: string[],
  progress?: HubProgress,
): string | undefined {
  const p = progress ?? getHubProgress();
  if (p.lastOpenedSlug && orderedSlugs.includes(p.lastOpenedSlug)) {
    const lastDone = p.completedChapterSlugs.includes(p.lastOpenedSlug);
    if (!lastDone) return p.lastOpenedSlug;
    const idx = orderedSlugs.indexOf(p.lastOpenedSlug);
    if (idx >= 0 && idx < orderedSlugs.length - 1) return orderedSlugs[idx + 1];
  }
  return orderedSlugs.find((s) => !p.completedChapterSlugs.includes(s)) ?? orderedSlugs[0];
}

export const HUB_PROGRESS_EVENT = 'hub-progress-change';
