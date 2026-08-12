import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Header } from '../components/Header';
import { BookingModal } from '../components/BookingModal';
import { SiteFooter } from '../components/SiteFooter';
import { SeoHead } from '../components/seo/SeoHead';
import { JsonLd } from '../components/seo/JsonLd';
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  resolveArticleSeo,
} from '../lib/seo/resolveSeo';
import type { GlobalSiteSettings } from '../lib/seo/types';
import { strapiService } from '../services/strapi';
import type { Article } from '../types';

const ArticleDetailView = lazy(() =>
  import('../components/ArticleDetailView').then((mod) => ({ default: mod.ArticleDetailView })),
);

export const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [chapters, setChapters] = useState<Article[]>([]);
  const [globalSettings, setGlobalSettings] = useState<GlobalSiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;

    let active = true;
    setIsLoading(true);
    setNotFound(false);

    Promise.all([
      strapiService.getArticleBySlug(slug),
      strapiService.getGlobalSiteSettings(),
      strapiService.getArticles(),
    ])
      .then(([loadedArticle, global, list]) => {
        if (!active) return;
        if (!loadedArticle) {
          setNotFound(true);
          setArticle(null);
        } else {
          setArticle(loadedArticle);
        }
        setGlobalSettings(global);
        setChapters(list);
      })
      .catch(() => {
        if (active) setNotFound(true);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  const config = strapiService.getConfig();
  const resolvedSeo = useMemo(() => {
    if (!article) return null;
    return resolveArticleSeo(article, globalSettings, config.apiUrl, article.seo);
  }, [article, globalSettings, config.apiUrl]);

  const jsonLd = useMemo(() => {
    if (!article) return null;
    return [buildArticleJsonLd(article, globalSettings, config.apiUrl), buildBreadcrumbJsonLd(article, globalSettings)];
  }, [article, globalSettings, config.apiUrl]);

  const pageContent = (() => {
    // During lesson navigation we keep rendering the previous ArticleDetailView
    // so the curriculum sidebar doesn't disappear while the new article loads.
    if (isLoading && !article) {
      return (
        <div className="loader-container" style={{ minHeight: '60vh' }}>
          <Loader2 className="spinner-icon" size={48} />
          <p>Loading article...</p>
        </div>
      );
    }

    if (notFound || !article || !resolvedSeo) {
      return (
        <main className="main-content flex-grow">
          <div className="container empty-container">
            <h1>Article not found</h1>
            <p>The guide you are looking for does not exist.</p>
            <button onClick={() => navigate('/')} className="clear-filters-btn">
              Back to Learning Hub
            </button>
          </div>
        </main>
      );
    }

    return (
      <Suspense
        fallback={
          <div className="loader-container" style={{ minHeight: '60vh' }}>
            <Loader2 className="spinner-icon" size={48} />
          </div>
        }
      >
        <ArticleDetailView
          article={article}
          chapters={chapters}
          onClose={() => navigate('/')}
          onSelectArticle={(next) => navigate(`/${next.slug}`)}
        />
      </Suspense>
    );
  })();

  return (
    <>
      {resolvedSeo ? <SeoHead seo={resolvedSeo} /> : null}
      {jsonLd ? <JsonLd data={jsonLd} /> : null}

      <Header
        onBookTrialClick={() => setIsBookingOpen(true)}
        activeCategory="all"
        onCategorySelect={() => navigate('/')}
      />

      {pageContent}

      <SiteFooter />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};
