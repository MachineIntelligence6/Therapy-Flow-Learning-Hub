import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ArticleCard } from '../components/ArticleCard';
import { BookingModal } from '../components/BookingModal';
import { SiteFooter } from '../components/SiteFooter';
import { SeoHead } from '../components/seo/SeoHead';
import { strapiService } from '../services/strapi';
import { resolveHubIndexSeo } from '../lib/seo/resolveSeo';
import type { GlobalSiteSettings } from '../lib/seo/types';
import type { Article } from '../types';
import { articleMatchesBrowseFilters, buildHubBrowseUrl, type HubBrowseFilters } from '../utils/breadcrumbs';

const CARDS_PER_PAGE = 8;

function ArticlesGridSkeleton() {
  return (
    <div className="articles-grid articles-grid-skeleton" aria-hidden="true">
      {Array.from({ length: CARDS_PER_PAGE }).map((_, index) => (
        <div key={index} className="article-card-skeleton" />
      ))}
    </div>
  );
}

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [globalSettings, setGlobalSettings] = useState<GlobalSiteSettings | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const browseFilters = useMemo<HubBrowseFilters>(() => {
    const chapter = searchParams.get('chapter') || undefined;
    const section = searchParams.get('section') || undefined;
    const category = searchParams.get('category') || undefined;
    return { chapter, section, category };
  }, [searchParams]);

  const hasBrowseFilters = Boolean(
    browseFilters.chapter || browseFilters.section || (browseFilters.category && browseFilters.category !== 'all'),
  );

  useEffect(() => {
    if (browseFilters.category) {
      setActiveCategory(browseFilters.category);
      return;
    }

    if (hasBrowseFilters) {
      setActiveCategory('all');
    }
  }, [browseFilters.category, hasBrowseFilters]);

  useEffect(() => {
    if (!hasBrowseFilters) return;

    const timer = window.setTimeout(() => {
      document.getElementById('articles-main-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);

    return () => window.clearTimeout(timer);
  }, [hasBrowseFilters, browseFilters.chapter, browseFilters.section, browseFilters.category]);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const [loadedArticles, loadedFeatured, global] = await Promise.all([
          strapiService.getArticles(),
          strapiService.getFeaturedArticle(),
          strapiService.getGlobalSiteSettings(),
        ]);
        setArticles(loadedArticles);
        setGlobalSettings(global);
        setFeaturedArticle(loadedFeatured || (loadedArticles.length > 0 ? loadedArticles[0] : null));
      } catch (err) {
        console.error('Error loading content', err);
        setFetchError('Could not retrieve resources.');
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  useEffect(() => {
    if (!featuredArticle?.image) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = featuredArticle.image;
    if (featuredArticle.imageSrcSet) {
      link.setAttribute('imagesrcset', featuredArticle.imageSrcSet);
    }
    if (featuredArticle.imageSizes) {
      link.setAttribute('imagesizes', featuredArticle.imageSizes);
    }
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [featuredArticle]);

  const config = strapiService.getConfig();
  const resolvedSeo = useMemo(
    () => resolveHubIndexSeo(globalSettings, config.apiUrl),
    [globalSettings, config.apiUrl],
  );

  const handleReadArticle = (article: Article) => {
    navigate(`/${article.slug}`);
  };

  const handleCategorySelect = (categorySlug: string) => {
    setActiveCategory(categorySlug);
    setCurrentPage(1);
    navigate(categorySlug === 'all' ? '/' : buildHubBrowseUrl({ category: categorySlug }));
    document.getElementById('articles-main-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const clearBrowseFilters = () => {
    setActiveCategory('all');
    setCurrentPage(1);
    navigate('/');
    document.getElementById('articles-main-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredArticles = articles.filter((article) => {
    if (hasBrowseFilters) {
      return articleMatchesBrowseFilters(article, browseFilters);
    }

    if (activeCategory === 'all') return true;
    return (
      article.category.toLowerCase().replace(/\s+/g, '-') === activeCategory.toLowerCase() ||
      article.slug === activeCategory.toLowerCase()
    );
  });

  const gridArticles =
    activeCategory === 'all' && !hasBrowseFilters
      ? featuredArticle
        ? articles.filter((a) => a.id !== featuredArticle.id && a.slug !== featuredArticle.slug)
        : articles
      : filteredArticles;

  const browseFilterLabel = useMemo(() => {
    if (!hasBrowseFilters) return null;
    const parts = [
      browseFilters.chapter,
      browseFilters.section,
      browseFilters.category && browseFilters.category !== 'all' ? browseFilters.category : null,
    ].filter(Boolean);
    return parts.join(' / ');
  }, [browseFilters, hasBrowseFilters]);

  const totalPages = Math.ceil(gridArticles.length / CARDS_PER_PAGE);
  const paginatedGridArticles = gridArticles.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE,
  );

  const renderPageButtons = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

    if (totalPages <= 5) {
      return pageNumbers.map((page) => (
        <button
          key={page}
          className={`pagination-number-btn ${currentPage === page ? 'active' : ''}`}
          onClick={() => {
            setCurrentPage(page);
            document.getElementById('articles-main-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {page}
        </button>
      ));
    }

    const items = [];
    items.push(
      <button
        key={1}
        className={`pagination-number-btn ${currentPage === 1 ? 'active' : ''}`}
        onClick={() => {
          setCurrentPage(1);
          document.getElementById('articles-main-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        1
      </button>,
    );

    if (currentPage > 3) items.push(<span key="dots-start" className="pagination-dots-span">...</span>);

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        items.push(
          <button
            key={i}
            className={`pagination-number-btn ${currentPage === i ? 'active' : ''}`}
            onClick={() => {
              setCurrentPage(i);
              document.getElementById('articles-main-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {i}
          </button>,
        );
      }
    }

    if (currentPage < totalPages - 2) items.push(<span key="dots-end" className="pagination-dots-span">...</span>);

    items.push(
      <button
        key={totalPages}
        className={`pagination-number-btn ${currentPage === totalPages ? 'active' : ''}`}
        onClick={() => {
          setCurrentPage(totalPages);
          document.getElementById('articles-main-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        {totalPages}
      </button>,
    );

    return items;
  };

  return (
    <>
      <SeoHead seo={resolvedSeo} />
      <Header
        onBookTrialClick={() => setIsBookingOpen(true)}
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
      />

      <div className="hero-featured-gradient-wrapper">
        <Hero onHomeClick={() => handleCategorySelect('all')} />

        {featuredArticle && activeCategory === 'all' && !hasBrowseFilters && (
          <div className="container featured-section-wrapper animate-fade-in">
            <ArticleCard article={featuredArticle} isFeatured onReadClick={handleReadArticle} />
          </div>
        )}
      </div>

      <main id="articles-main-section" className={`main-content flex-grow${isLoading ? ' main-content-loading' : ''}`}>
        <div className="container">
          {browseFilterLabel ? (
            <div className="browse-filter-banner">
              <p>
                Showing guides in <strong>{browseFilterLabel}</strong>
              </p>
              <button type="button" onClick={clearBrowseFilters} className="clear-filters-btn">
                View all guides
              </button>
            </div>
          ) : null}

          {isLoading ? (
            <ArticlesGridSkeleton />
          ) : fetchError ? (
            <div className="error-container">
              <AlertCircle size={48} className="error-icon" />
              <h3>Failed to Load Resources</h3>
              <p>{fetchError}</p>
              <button onClick={() => window.location.reload()} className="retry-btn">
                Retry Fetching
              </button>
            </div>
          ) : gridArticles.length === 0 ? (
            <div className="empty-container">
              <h3>No Guides Found</h3>
              <p>We couldn't find any resources matching your selected tag.</p>
              <button onClick={clearBrowseFilters} className="clear-filters-btn">
                View all guides
              </button>
            </div>
          ) : (
            <div className="articles-layout">
              <div className="grid-section-wrapper">
                <div className="articles-grid">
                  {paginatedGridArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} onReadClick={handleReadArticle} />
                  ))}
                </div>

                {activeCategory === 'all' && !hasBrowseFilters && totalPages > 1 && (
                  <div className="pagination-container-box">
                    <div className="pagination-wrapper">
                      <button
                        className="pagination-arrow"
                        disabled={currentPage === 1}
                        onClick={() => {
                          setCurrentPage((prev) => Math.max(1, prev - 1));
                          document.getElementById('articles-main-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        aria-label="Previous page"
                      >
                        <svg width="6" height="12" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.5 0.5L0.5 6.5L6.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <div className="pagination-numbers">{renderPageButtons()}</div>
                      <button
                        className="pagination-arrow"
                        disabled={currentPage === totalPages}
                        onClick={() => {
                          setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                          document.getElementById('articles-main-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        aria-label="Next page"
                      >
                        <svg width="6" height="12" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.5 0.5L6.5 6.5L0.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};
