import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  List,
  Loader2,
} from 'lucide-react';
import type { Article } from '../types';
import type { StrapiBlock } from '../types/strapi-blocks';
import { strapiService } from '../services/strapi';
import { ArticleContent, getTableOfContents } from './article/ArticleContent';
import { RelatedLinks } from './article/RelatedLinks';
import { useHubUi } from '../lib/HubUiContext';
import {
  chapterIndex,
  getNextChapter,
  getPrevChapter,
  sortChapters,
} from '../lib/chapters';
import {
  getOverallProgressPercent,
  isChapterComplete,
} from '../lib/progressStore';
import './article/article-content.css';
import './ArticleDetailView.css';
import './HubHomeThemes.css';

interface ArticleDetailViewProps {
  article: Article | null;
  chapters?: Article[];
  onClose: () => void;
  onSelectArticle?: (article: Article) => void;
}

type HeadingItem = { id: string; label: string; level: number; title?: string };

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article: initialArticle,
  chapters = [],
  onClose,
  onSelectArticle,
}) => {
  const [article, setArticle] = useState<Article | null>(initialArticle);
  const [isLoading, setIsLoading] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const curriculumRef = useRef<HTMLElement>(null);
  const { progress, markOpened, toggleComplete } = useHubUi();
  const scrollOffset = 156;

  const orderedChapters = useMemo(
    () => (chapters.length ? sortChapters(chapters) : []),
    [chapters],
  );
  const slugs = useMemo(() => orderedChapters.map((a) => a.slug), [orderedChapters]);

  useEffect(() => {
    if (!initialArticle) {
      setArticle(null);
      return;
    }

    setArticle(initialArticle);
    markOpened(initialArticle.slug);
    setMobileNavOpen(false);
    window.scrollTo(0, 0);

    const fetchFullDetails = async () => {
      setIsLoading(true);
      try {
        const fullArticle = await strapiService.getArticleBySlug(initialArticle.slug);
        if (fullArticle) setArticle(fullArticle);
      } catch (e) {
        console.error('Failed to load full article details:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFullDetails();
  }, [initialArticle, markOpened]);

  const headingsList = useMemo<HeadingItem[]>(() => {
    if (article?.content && Array.isArray(article.content)) {
      return getTableOfContents(article.content as StrapiBlock[], { nested: true }).map((item) => ({
        id: item.id,
        label: item.label,
        level: item.level,
        title: item.label,
      }));
    }
    if (article?.sections && article.sections.length > 0) {
      return article.sections.map((sec) => ({
        id: String(sec.id),
        label: sec.tabLabel || sec.title || 'Section',
        level: 2,
        title: sec.title,
      }));
    }
    return [];
  }, [article]);

  useEffect(() => {
    if (headingsList.length > 0) setActiveHeadingId(headingsList[0].id);
  }, [headingsList]);

  useEffect(() => {
    if (headingsList.length === 0) return;

    const handleScroll = () => {
      let current = headingsList[0].id;
      for (const item of headingsList) {
        const el =
          document.getElementById(item.id) || document.getElementById(`section-${item.id}`);
        if (!el) continue;
        if (el.getBoundingClientRect().top - scrollOffset <= 8) current = item.id;
      }
      setActiveHeadingId((prev) => {
        if (prev === current) return prev;
        // Keep active nested section visible in the curriculum rail
        requestAnimationFrame(() => {
          const rail = curriculumRef.current;
          const activeBtn = rail?.querySelector<HTMLElement>('.course-section-btn.is-active');
          activeBtn?.scrollIntoView({ block: 'nearest' });
        });
        return current;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headingsList, isLoading, scrollOffset]);

  const handleHeadingClick = (id: string) => {
    setActiveHeadingId(id);
    const element = document.getElementById(id) || document.getElementById(`section-${id}`);
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY - scrollOffset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  if (!initialArticle) return null;

  const displayArticle = article ?? initialArticle;
  const slug = displayArticle.slug;
  const done = isChapterComplete(slug, progress);
  const idx = chapterIndex(orderedChapters, slug);
  const next = getNextChapter(orderedChapters, slug);
  const prev = getPrevChapter(orderedChapters, slug);
  const overallPct = getOverallProgressPercent(slugs, progress);
  const chapterNum = idx >= 0 ? idx + 1 : 1;
  const totalChapters = orderedChapters.length || 1;

  const contentBlocks =
    article?.content && Array.isArray(article.content)
      ? (article.content as StrapiBlock[])
      : null;

  const handleRelatedArticle = async (targetSlug: string) => {
    if (!onSelectArticle) {
      window.location.href = `/${targetSlug}`;
      return;
    }
    try {
      const fetched = await strapiService.getArticleBySlug(targetSlug);
      if (fetched) onSelectArticle(fetched);
    } catch (e) {
      console.error('Failed to open related article', e);
    }
  };

  const openChapter = (ch: Article) => {
    if (onSelectArticle) onSelectArticle(ch);
  };

  const renderBody = () => {
    if (isLoading) {
      return (
        <div className="modal-inner-loader">
          <Loader2 className="spin-loading" size={32} />
          <p>Loading content…</p>
        </div>
      );
    }

    if (contentBlocks) {
      return (
        <div ref={contentRef} className="lesson-article-body">
          <ArticleContent blocks={contentBlocks} articleTitle={displayArticle.title} />
          <RelatedLinks links={displayArticle.relatedLinks} onArticleClick={handleRelatedArticle} />
        </div>
      );
    }

    if (article?.sections && article.sections.length > 0) {
      return (
        <div ref={contentRef} className="lesson-article-body">
          {article.sections.map((sec) => (
            <div key={sec.id} id={`section-${sec.id}`} className="section-content-wrapper">
              <h2 className="section-heading-title">{sec.title}</h2>
              <div className="section-body-blocks">
                {Array.isArray(sec.description) ? (
                  <ArticleContent
                    blocks={sec.description as StrapiBlock[]}
                    articleTitle={displayArticle.title}
                  />
                ) : null}
              </div>
              {sec.blogFileUrl ? (
                <div className="section-file-attachment">
                  <a
                    href={sec.blogFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="attachment-link-btn"
                  >
                    View attached file
                  </a>
                </div>
              ) : null}
            </div>
          ))}
          <RelatedLinks links={displayArticle.relatedLinks} onArticleClick={handleRelatedArticle} />
        </div>
      );
    }

    return (
      <div className="lesson-article-body">
        <p>{displayArticle.description}</p>
        <p className="no-sections-hint">No content is defined for this guide yet.</p>
      </div>
    );
  };

  const lessonActions = (
    <footer className="lesson-footer">
      <div className="lesson-footer-nav">
        {prev ? (
          <button type="button" className="lesson-nav-prev" onClick={() => openChapter(prev)}>
            <ChevronLeft size={18} aria-hidden />
            <span>
              <span className="lesson-nav-kicker">Previous</span>
              <span className="lesson-nav-title">{prev.title}</span>
            </span>
          </button>
        ) : (
          <button type="button" className="lesson-nav-prev is-muted" onClick={onClose}>
            <ChevronLeft size={18} aria-hidden />
            <span>
              <span className="lesson-nav-kicker">Back</span>
              <span className="lesson-nav-title">Handbook home</span>
            </span>
          </button>
        )}

        <button
          type="button"
          className={`lesson-complete-btn${done ? ' is-done' : ''}`}
          onClick={() => toggleComplete(slug)}
        >
          <CheckCircle2 size={18} aria-hidden />
          {done ? 'Completed' : 'Mark complete'}
        </button>

        {next ? (
          <button type="button" className="lesson-nav-next" onClick={() => openChapter(next)}>
            <span>
              <span className="lesson-nav-kicker">Next</span>
              <span className="lesson-nav-title">{next.title}</span>
            </span>
            <ChevronRight size={18} aria-hidden />
          </button>
        ) : (
          <button type="button" className="lesson-nav-next" onClick={onClose}>
            <span>
              <span className="lesson-nav-kicker">Finish</span>
              <span className="lesson-nav-title">Back to home</span>
            </span>
            <ChevronRight size={18} aria-hidden />
          </button>
        )}
      </div>
    </footer>
  );

  /* Course layout */
  return (
      <div className="lesson-page lesson-page-course animate-fade-in">
        <div className="course-progress-strip" aria-label="Path progress">
          <div className="course-progress-strip-inner">
            <button type="button" className="course-home-link" onClick={onClose}>
              SmartHub Handbook
            </button>
            <div className="course-progress-strip-bar-wrap">
              <div
                className="course-progress-bar"
                role="progressbar"
                aria-valuenow={overallPct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="course-progress-bar-fill" style={{ width: `${overallPct}%` }} />
              </div>
              <span className="course-progress-strip-pct">
                {overallPct}% · Chapter {chapterNum}/{totalChapters}
              </span>
            </div>
          </div>
        </div>

        <div className="course-player">
          <aside
            ref={curriculumRef}
            className={`course-curriculum${mobileNavOpen ? ' is-open' : ''}`}
            aria-label="Course curriculum"
          >
            <div className="course-curriculum-head">
              <BookOpen size={16} aria-hidden />
              <span>Curriculum</span>
              <button
                type="button"
                className="course-nav-close"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close curriculum"
              >
                ×
              </button>
            </div>
            <ol className="course-curriculum-list">
              {orderedChapters.map((ch, i) => {
                const isCurrent = ch.slug === slug;
                const isDone = isChapterComplete(ch.slug, progress);
                return (
                  <li key={ch.slug} className={isCurrent ? 'is-expanded-chapter' : undefined}>
                    <button
                      type="button"
                      className={`course-curriculum-item${isCurrent ? ' is-current' : ''}${isDone ? ' is-done' : ''}`}
                      onClick={() => {
                        openChapter(ch);
                        setMobileNavOpen(false);
                      }}
                    >
                      <span className="course-curriculum-icon" aria-hidden>
                        {isDone ? <CheckCircle2 size={16} /> : isCurrent ? <PlayDot /> : <Circle size={16} />}
                      </span>
                      <span className="course-curriculum-text">
                        <span className="course-curriculum-kicker">Chapter {i + 1}</span>
                        <span className="course-curriculum-name">{ch.title}</span>
                      </span>
                    </button>
                    {isCurrent && headingsList.length > 0 ? (
                      <ul className="course-section-list">
                        {headingsList.map((h) => (
                          <li key={h.id} className={`course-section-depth-${h.level}`}>
                            <button
                              type="button"
                              className={`course-section-btn level-${h.level}${activeHeadingId === h.id ? ' is-active' : ''}`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleHeadingClick(h.id);
                                setMobileNavOpen(false);
                              }}
                            >
                              {h.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </aside>

          {mobileNavOpen ? (
            <button
              type="button"
              className="course-nav-backdrop"
              aria-label="Close menu"
              onClick={() => setMobileNavOpen(false)}
            />
          ) : null}

          <div className="course-lesson-main">
            <div className="course-lesson-toolbar">
              <button
                type="button"
                className="course-mobile-nav-btn"
                onClick={() => setMobileNavOpen(true)}
              >
                <List size={18} aria-hidden />
                Curriculum
              </button>
              <span className={`course-status-chip${done ? ' is-done' : ''}`}>
                {done ? 'Complete' : 'In progress'}
              </span>
            </div>

            <header className="course-lesson-hero">
              <p className="course-lesson-kicker">
                Chapter {chapterNum} of {totalChapters}
              </p>
              <h1 className="course-lesson-title">{displayArticle.title}</h1>
              {displayArticle.description ? (
                <p className="course-lesson-lede">{displayArticle.description}</p>
              ) : null}
            </header>

            <div className="course-lesson-content">{renderBody()}</div>
            {lessonActions}
          </div>
        </div>
      </div>
  );
};

function PlayDot() {
  return (
    <span className="course-play-dot">
      <span />
    </span>
  );
}
