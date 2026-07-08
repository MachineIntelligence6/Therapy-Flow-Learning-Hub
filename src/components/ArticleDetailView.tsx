import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import type { Article } from '../types';
import type { StrapiBlock } from '../types/strapi-blocks';
import { strapiService } from '../services/strapi';
import { ArticleContent, getTableOfContents } from './article/ArticleContent';
import './article/article-content.css';
import './ArticleDetailView.css';

interface ArticleDetailViewProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article: initialArticle,
  onClose
}) => {
  const [article, setArticle] = useState<Article | null>(initialArticle);
  const [isLoading, setIsLoading] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const contentPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!initialArticle) {
      setArticle(null);
      return;
    }

    setArticle(initialArticle);

    const fetchFullDetails = async () => {
      setIsLoading(true);
      try {
        const fullArticle = await strapiService.getArticleBySlug(initialArticle.slug);
        if (fullArticle) {
          setArticle(fullArticle);
        }
      } catch (e) {
        console.error('Failed to load full article details:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFullDetails();
  }, [initialArticle]);

  // Sidebar TOC from Content heading blocks (or legacy sections)
  const headingsList = React.useMemo(() => {
    if (article?.content && Array.isArray(article.content)) {
      return getTableOfContents(article.content as StrapiBlock[]).map((item) => ({
        id: item.id,
        label: item.label,
        title: item.label,
      }));
    }
    if (article?.sections && article.sections.length > 0) {
      return article.sections.map((sec) => ({
        id: String(sec.id),
        label: sec.tabLabel || sec.title || 'Section',
        title: sec.title,
      }));
    }
    return [];
  }, [article]);

  useEffect(() => {
    if (headingsList.length > 0) {
      setActiveHeadingId(headingsList[0].id);
    }
  }, [headingsList]);

  useEffect(() => {
    const panel = contentPanelRef.current;
    if (!panel || headingsList.length === 0) return;

    const handleScroll = () => {
      const panelRect = panel.getBoundingClientRect();
      const nearBottom =
        panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 24;

      // At the end of the article, always highlight the last section
      if (nearBottom) {
        setActiveHeadingId(headingsList[headingsList.length - 1].id);
        return;
      }

      let currentActiveId = headingsList[0].id;
      for (const item of headingsList) {
        const element =
          document.getElementById(item.id) ||
          document.getElementById(`section-${item.id}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Activate once the heading sits near the top of the content panel
          if (rect.top - panelRect.top <= 80) {
            currentActiveId = item.id;
          }
        }
      }
      setActiveHeadingId(currentActiveId);
    };

    panel.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 100);

    return () => {
      panel.removeEventListener('scroll', handleScroll);
    };
  }, [headingsList]);

  const handleHeadingClick = (id: string) => {
    setActiveHeadingId(id);
    const element =
      document.getElementById(id) || document.getElementById(`section-${id}`);
    const panel = contentPanelRef.current;
    if (element && panel) {
      const elementRect = element.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const relativeTop = elementRect.top - panelRect.top + panel.scrollTop;

      // Scroll so the full heading sits clearly at the top of the panel
      panel.scrollTo({
        top: Math.max(0, relativeTop - 24),
        behavior: 'smooth',
      });
    }
  };

  if (!initialArticle) return null;

  const contentBlocks =
    article?.content && Array.isArray(article.content)
      ? (article.content as StrapiBlock[])
      : null;

  return (
    <div className="container article-detail-container animate-fade-in">
      <nav className="breadcrumbs" aria-label="Breadcrumb" style={{ marginBottom: '24px', marginTop: '32px' }}>
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <button onClick={onClose} className="breadcrumb-link">Home</button>
          </li>
          <li className="breadcrumb-item separator">/</li>
          <li className="breadcrumb-item">
            {initialArticle.category}
          </li>
          <li className="breadcrumb-item separator">/</li>
          <li className="breadcrumb-item active" aria-current="page">
            {initialArticle.title}
          </li>
        </ol>
      </nav>

      {isLoading ? (
        <div className="modal-inner-loader">
          <Loader2 className="spin-loading" size={32} />
          <p>Loading content from Strapi...</p>
        </div>
      ) : (contentBlocks || (article?.sections && article.sections.length > 0)) ? (
        <div className="detail-tabs-layout">
          {headingsList.length > 0 && (
            <aside className="tabs-sidebar">
              {headingsList.map((item) => {
                const isActive = item.id === activeHeadingId;
                return (
                  <button
                    key={item.id}
                    className={`sidebar-tab-btn ${isActive ? 'tab-btn-active' : ''}`}
                    onClick={() => handleHeadingClick(item.id)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </aside>
          )}

          <div
            ref={contentPanelRef}
            className="tabs-content-panel"
            style={{ width: headingsList.length > 0 ? '72%' : '100%' }}
          >
            {contentBlocks ? (
              <div className="detail-body rich-content-body" style={{ padding: 0 }}>
                <div className="section-body-blocks">
                  <ArticleContent
                    blocks={contentBlocks}
                    articleTitle={article?.title || initialArticle.title}
                  />
                </div>
              </div>
            ) : article?.sections && article.sections.length > 0 ? (
              <div className="sections-vertical-list">
                {article.sections.map((sec) => (
                  <div
                    key={sec.id}
                    id={`section-${sec.id}`}
                    className="section-content-wrapper"
                    style={{ marginBottom: '48px' }}
                  >
                    <h2 className="section-heading-title">{sec.title}</h2>
                    <div className="section-body-blocks">
                      {Array.isArray(sec.description) ? (
                        <ArticleContent
                          blocks={sec.description as StrapiBlock[]}
                          articleTitle={article?.title || initialArticle.title}
                        />
                      ) : null}
                    </div>
                    {sec.blogFileUrl && (
                      <div className="section-file-attachment" style={{ marginTop: '16px' }}>
                        <a
                          href={sec.blogFileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="attachment-link-btn"
                        >
                          View Attached File Resources
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="detail-body">
          <p>{initialArticle.description}</p>
          <p className="no-sections-hint">
            No article content is currently defined for this guide in Strapi CMS.
          </p>
        </div>
      )}
    </div>
  );
};
