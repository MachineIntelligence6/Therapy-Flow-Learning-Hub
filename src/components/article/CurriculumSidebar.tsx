import { useEffect, useMemo, useState } from 'react';
import type { Article, CurriculumChapter } from '../../types';
import './CurriculumSidebar.css';

type CurriculumSidebarProps = {
  curriculum: CurriculumChapter[];
  currentSlug?: string;
  onSelectArticle: (article: Article) => void;
  collapsedByDefault?: boolean;
};

export function CurriculumSidebar({
  curriculum,
  currentSlug,
  onSelectArticle,
  collapsedByDefault = true,
}: CurriculumSidebarProps) {
  const currentChapter = useMemo(() => {
    for (const chapter of curriculum) {
      for (const section of chapter.sections) {
        if (section.articles.some((a) => a.slug === currentSlug)) {
          return chapter.chapter;
        }
      }
    }
    return curriculum[0]?.chapter;
  }, [curriculum, currentSlug]);

  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const next: Record<string, boolean> = {};
    curriculum.forEach((ch, index) => {
      if (collapsedByDefault) {
        next[ch.chapter] = ch.chapter === currentChapter || (!currentSlug && index === 0);
      } else {
        next[ch.chapter] = true;
      }
    });
    setOpenChapters(next);
  }, [curriculum, currentChapter, currentSlug, collapsedByDefault]);

  const toggleChapter = (chapter: string) => {
    setOpenChapters((prev) => ({ ...prev, [chapter]: !prev[chapter] }));
  };

  if (!curriculum.length) return null;

  return (
    <nav className="curriculum-sidebar" aria-label="Curriculum">
      {curriculum.map((chapterItem, chapterIndex) => {
        const isOpen = openChapters[chapterItem.chapter];
        return (
          <div key={chapterItem.chapter} className="curriculum-chapter">
            <button
              type="button"
              className={`curriculum-chapter-toggle ${isOpen ? 'is-open' : ''}`}
              onClick={() => toggleChapter(chapterItem.chapter)}
              aria-expanded={isOpen}
            >
              <span className="curriculum-chapter-index">Chapter {chapterIndex + 1}</span>
              <span className="curriculum-chapter-name">{chapterItem.chapter}</span>
            </button>

            {isOpen && (
              <div className="curriculum-sections">
                {chapterItem.sections.map((sectionItem) => (
                  <div key={`${chapterItem.chapter}-${sectionItem.section}`} className="curriculum-section">
                    <p className="curriculum-section-label">{sectionItem.section}</p>
                    <ul className="curriculum-article-list">
                      {sectionItem.articles.map((article) => {
                        const isCurrent = article.slug === currentSlug;
                        return (
                          <li key={article.slug}>
                            <button
                              type="button"
                              className={`curriculum-article-btn ${isCurrent ? 'is-current' : ''}`}
                              onClick={() => onSelectArticle(article)}
                            >
                              <span className="curriculum-article-dot" aria-hidden />
                              {article.title}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
