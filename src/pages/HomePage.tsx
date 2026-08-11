import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { BookingModal } from '../components/BookingModal';
import { SiteFooter } from '../components/SiteFooter';
import { SeoHead } from '../components/seo/SeoHead';
import { CourseHome } from '../components/HubHomeThemes';
import { strapiService } from '../services/strapi';
import { resolveHubIndexSeo } from '../lib/seo/resolveSeo';
import type { GlobalSiteSettings } from '../lib/seo/types';
import type { Article } from '../types';
import { useHubUi } from '../lib/HubUiContext';
import { sortChapters } from '../lib/chapters';
import { articleMatchesBrowseFilters, buildHubBrowseUrl, type HubBrowseFilters } from '../utils/breadcrumbs';
import { ArticleCard } from '../components/ArticleCard';

function ArticlesGridSkeleton() {
  return (
    <div className="hub-home-skeleton" aria-hidden="true">
      <div className="hub-skel-panel" />
      <div className="hub-skel-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="article-card-skeleton" />
        ))}
      </div>
    </div>
  );
}

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { progress } = useHubUi();
  const [articles, setArticles] = useState<Article[]>([]);
  const [globalSettings, setGlobalSettings] = useState<GlobalSiteSettings | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
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
        const [loadedArticles, global] = await Promise.all([
          strapiService.getArticles(),
          strapiService.getGlobalSiteSettings(),
        ]);
        setArticles(loadedArticles);
        setGlobalSettings(global);
      } catch (err) {
        console.error('Error loading content', err);
        setFetchError('Could not retrieve resources.');
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

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
    navigate(categorySlug === 'all' ? '/' : buildHubBrowseUrl({ category: categorySlug }));
    document.getElementById('articles-main-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const clearBrowseFilters = () => {
    setActiveCategory('all');
    navigate('/');
    document.getElementById('articles-main-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const orderedChapters = useMemo(() => sortChapters(articles), [articles]);

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

  const showBrowseFiltered = hasBrowseFilters || activeCategory !== 'all';

  return (
    <>
      <SeoHead seo={resolvedSeo} />
      <Header
        onBookTrialClick={() => setIsBookingOpen(true)}
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
      />

      <main id="articles-main-section" className={`main-content flex-grow${isLoading ? ' main-content-loading' : ''}`}>
        <div className="container">
          {browseFilterLabelBanner(hasBrowseFilters, browseFilters, clearBrowseFilters)}

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
          ) : showBrowseFiltered ? (
            filteredArticles.length === 0 ? (
              <div className="empty-container">
                <h3>No Guides Found</h3>
                <p>We couldn&apos;t find any resources matching your selected tag.</p>
                <button onClick={clearBrowseFilters} className="clear-filters-btn">
                  View all guides
                </button>
              </div>
            ) : (
              <div className="articles-grid" style={{ padding: '32px 0 48px' }}>
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} onReadClick={handleReadArticle} />
                ))}
              </div>
            )
          ) : orderedChapters.length === 0 ? (
            <div className="empty-container">
              <h3>No Guides Found</h3>
              <p>Chapters will appear here once published in the CMS.</p>
            </div>
          ) : (
            <CourseHome articles={orderedChapters} progress={progress} onOpen={handleReadArticle} />
          )}
        </div>
      </main>

      <SiteFooter />

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};

function browseFilterLabelBanner(
  hasBrowseFilters: boolean,
  browseFilters: HubBrowseFilters,
  clearBrowseFilters: () => void,
) {
  if (!hasBrowseFilters) return null;
  const parts = [
    browseFilters.chapter,
    browseFilters.section,
    browseFilters.category && browseFilters.category !== 'all' ? browseFilters.category : null,
  ].filter(Boolean);
  const label = parts.join(' / ');
  return (
    <div className="browse-filter-banner">
      <p>
        Showing guides in <strong>{label}</strong>
      </p>
      <button type="button" onClick={clearBrowseFilters} className="clear-filters-btn">
        View all guides
      </button>
    </div>
  );
}
