import type { RelatedLink } from '../../types';
import './RelatedLinks.css';

type RelatedLinksProps = {
  links?: RelatedLink[];
  onArticleClick?: (slug: string) => void;
};

function resolveHref(link: RelatedLink): string {
  if (link.link_type === 'article') {
    return `/learning-hub/${link.url.replace(/^\//, '')}`;
  }
  return link.url;
}

export function RelatedLinks({ links, onArticleClick }: RelatedLinksProps) {
  if (!links?.length) return null;

  // Hide product links (Open in TherapyFlow)
  const articleLinks = links.filter((l) => l.link_type === 'article');
  const externalLinks = links.filter((l) => l.link_type === 'external');

  if (articleLinks.length === 0 && externalLinks.length === 0) return null;

  const renderLink = (link: RelatedLink, key: string) => {
    const href = resolveHref(link);

    if (link.link_type === 'article' && onArticleClick) {
      return (
        <li key={key}>
          <button
            type="button"
            className="related-link-btn"
            onClick={() => onArticleClick(link.url.replace(/^\//, ''))}
          >
            {link.label}
          </button>
        </li>
      );
    }

    return (
      <li key={key}>
        <a
          href={href}
          className="related-link-anchor"
          target={link.link_type === 'external' ? '_blank' : undefined}
          rel={link.link_type === 'external' ? 'noopener noreferrer' : undefined}
        >
          {link.label}
        </a>
      </li>
    );
  };

  return (
    <aside className="related-links-panel">
      <h2 className="related-links-title">Related links</h2>

      {articleLinks.length > 0 && (
        <div className="related-links-group">
          <h3 className="related-links-group-label">Continue learning</h3>
          <ul className="related-links-list">
            {articleLinks.map((link, i) => renderLink(link, `article-${i}`))}
          </ul>
        </div>
      )}

      {externalLinks.length > 0 && (
        <div className="related-links-group">
          <h3 className="related-links-group-label">External</h3>
          <ul className="related-links-list">
            {externalLinks.map((link, i) => renderLink(link, `external-${i}`))}
          </ul>
        </div>
      )}
    </aside>
  );
}
