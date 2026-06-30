import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import type { Article } from '../types';
import { strapiService } from '../services/strapi';
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

  // Sync state and fetch full article details if sections are missing
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

  // Compute headings list dynamically from content headings
  const headingsList = React.useMemo(() => {
    if (article?.content && Array.isArray(article.content)) {
      const list: { id: string; label: string; title: string }[] = [];
      article.content.forEach((block, idx) => {
        if (block.type === 'heading') {
          const text = block.children?.map((c: any) => c.text || '').join('') || '';
          if (text.trim()) {
            list.push({
              id: `heading-${idx}`,
              label: text,
              title: text
            });
          }
        }
      });
      return list;
    }
    return [];
  }, [article]);

  useEffect(() => {
    if (headingsList.length > 0) {
      setActiveHeadingId(headingsList[0].id);
    }
  }, [headingsList]);

  // Scroll Spy logic to highlight active heading on scroll
  useEffect(() => {
    if (headingsList.length === 0) return;

    const handleScroll = () => {
      let currentActiveId = headingsList[0].id;
      
      for (const item of headingsList) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentActiveId = item.id;
          }
        }
      }
      setActiveHeadingId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load to highlight initial state
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headingsList]);

  const handleHeadingClick = (id: string) => {
    setActiveHeadingId(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (!initialArticle) return null;

  // Strapi Rich Text Blocks Renderer
  const renderBlockNode = (node: any, index: number): React.ReactNode => {
    if (node.type === 'text') {
      let content: React.ReactNode = node.text || '';
      if (node.bold) content = <strong key={index}>{content}</strong>;
      if (node.italic) content = <em key={index}>{content}</em>;
      if (node.underline) content = <u key={index}>{content}</u>;
      if (node.strikethrough) content = <del key={index}>{content}</del>;
      return content;
    }
    
    const children = node.children ? node.children.map((child: any, i: number) => renderBlockNode(child, i)) : null;
    
    if (node.type === 'link') {
      return (
        <a key={index} href={node.url} target="_blank" rel="noopener noreferrer" className="inline-link">
          {children}
        </a>
      );
    }
    return <span key={index}>{children}</span>;
  };

  const renderStrapiBlocks = (blocks: any[] | any): React.ReactNode => {
    if (!blocks || !Array.isArray(blocks)) {
      if (typeof blocks === 'string') {
        return <p>{blocks}</p>;
      }
      return null;
    }

    return blocks.map((block, idx) => {
      const children = block.children ? block.children.map((child: any, i: number) => renderBlockNode(child, i)) : null;
      
      switch (block.type) {
        case 'paragraph':
          return <p key={idx}>{children}</p>;
        case 'heading':
          const HeadingTag = block.level ? `h${block.level}` : 'h3';
          const headingId = `heading-${idx}`;
          // @ts-ignore
          return <HeadingTag key={idx} id={headingId} className="block-heading">{children}</HeadingTag>;
        case 'list':
          if (block.format === 'ordered') {
            return <ol key={idx} className="block-ol">{children}</ol>;
          }
          return <ul key={idx} className="block-ul">{children}</ul>;
        case 'list-item':
          return <li key={idx} className="block-li">{children}</li>;
        case 'quote':
          return <blockquote key={idx} className="block-quote">{children}</blockquote>;
        default:
          return <div key={idx} className="block-default">{children}</div>;
      }
    });
  };

  return (
    <div className="container article-detail-container animate-fade-in">
      {/* Breadcrumbs matching design exactly */}
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

      {/* Loading details state */}
      {isLoading ? (
        <div className="modal-inner-loader">
          <Loader2 className="spin-loading" size={32} />
          <p>Loading content from Strapi...</p>
        </div>
      ) : headingsList.length > 0 ? (
        /* Two column layout: Sidebar headings index + Content vertical feed */
        <div className="detail-tabs-layout">
          {/* Sidebar navigation */}
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

          {/* Display content panel */}
          <div className="tabs-content-panel">
            <div className="detail-body rich-content-body">
              <div className="section-body-blocks">
                {renderStrapiBlocks(article?.content)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="detail-body rich-content-body">
          <p className="article-intro-fallback">{initialArticle.description}</p>
          <div className="section-body-blocks">
            {renderStrapiBlocks(article?.content)}
          </div>
        </div>
      )}
    </div>
  );
};
