import type { CSSProperties, ReactNode } from 'react';
import './Breadcrumbs.css';

export type BreadcrumbItem = {
  label: string;
  href?: string;
  onClick?: () => void;
  current?: boolean;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  style?: CSSProperties;
};

export function Breadcrumbs({ items, className = '', style }: BreadcrumbsProps) {
  const nodes: ReactNode[] = [];

  items.forEach((item, index) => {
    if (index > 0) {
      nodes.push(
        <li key={`sep-${index}`} className="breadcrumb-item separator" aria-hidden="true">
          /
        </li>,
      );
    }

    const isInteractive = Boolean(item.href || item.onClick) && !item.current;

    nodes.push(
      <li
        key={`${item.label}-${index}`}
        className={`breadcrumb-item${item.current ? ' active' : ''}`}
        {...(item.current ? { 'aria-current': 'page' as const } : {})}
      >
        {isInteractive ? (
          item.href ? (
            <a href={item.href} className="breadcrumb-link" onClick={item.onClick}>
              {item.label}
            </a>
          ) : (
            <button type="button" onClick={item.onClick} className="breadcrumb-link">
              {item.label}
            </button>
          )
        ) : (
          item.label
        )}
      </li>,
    );
  });

  return (
    <nav className={`breadcrumbs ${className}`.trim()} aria-label="Breadcrumb" style={style}>
      <ol className="breadcrumb-list">{nodes}</ol>
    </nav>
  );
}
