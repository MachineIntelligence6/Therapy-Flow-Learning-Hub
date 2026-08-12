import type { StrapiBlock, StrapiTextNode } from '../../types/strapi-blocks';
import {
  extractVimeoId,
  extractYouTubeId,
  getInlineText,
  isDirectVideoUrl,
  isUrlOnlyParagraph,
  slugify,
} from '../../utils/video-url';
import { ArticleVideo } from './ArticleVideo';
import type { ReactNode } from 'react';

type ArticleContentProps = {
  blocks: StrapiBlock[];
  articleTitle?: string;
};

/** Match http(s) URLs in plain CMS text so they render as clickable links. */
const URL_IN_TEXT_RE = /https?:\/\/[^\s<>"'`)\]]+/g;

function trimTrailingPunctuation(url: string): { href: string; trailing: string } {
  const cleaned = url.replace(/[.,;:!?]+$/g, '');
  return { href: cleaned, trailing: url.slice(cleaned.length) };
}

function linkifyPlainText(text: string, keyPrefix: string | number): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(URL_IN_TEXT_RE.source, 'g');
  let n = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const { href, trailing } = trimTrailingPunctuation(match[0]);
    nodes.push(
      <a
        key={`${keyPrefix}-link-${n++}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-link"
      >
        {href}
      </a>,
    );
    if (trailing) nodes.push(trailing);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes.length > 0 ? nodes : [text];
}

type InlineChild =
  | StrapiTextNode
  | {
      type: 'link';
      url?: string;
      children?: StrapiTextNode[];
    };

function renderText(children: InlineChild[] | StrapiTextNode[] | undefined) {
  if (!children?.length) return null;

  return children.map((node, i) => {
    // Strapi/CMS link nodes
    if ((node as { type?: string }).type === 'link') {
      const link = node as { type: 'link'; url?: string; children?: StrapiTextNode[] };
      const href = link.url || getInlineText(link.children || []);
      if (!href) return null;
      const label = link.children?.length ? renderText(link.children) : href;
      const isExternal = /^https?:\/\//i.test(href);
      return (
        <a
          key={i}
          href={href}
          className="inline-link"
          {...(isExternal
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {label}
        </a>
      );
    }

    const textNode = node as StrapiTextNode;
    let el: ReactNode = linkifyPlainText(textNode.text || '', i);

    if (textNode.bold) el = <strong key={`b-${i}`}>{el}</strong>;
    if (textNode.italic) el = <em key={`i-${i}`}>{el}</em>;
    if (textNode.underline) el = <u key={`u-${i}`}>{el}</u>;
    if (textNode.strikethrough) el = <del key={`d-${i}`}>{el}</del>;
    if (textNode.code) el = <code key={`c-${i}`}>{el}</code>;

    return <span key={i}>{el}</span>;
  });
}

/** Drop Content "Related links" sections — shown via Related_Links panel instead. */
function stripEmbeddedRelatedLinks(blocks: StrapiBlock[]): StrapiBlock[] {
  const relatedHeadingIndex = blocks.findIndex((block) => {
    if (block.type !== 'heading') return false;
    const text = getInlineText(block.children).trim().toLowerCase();
    return text === 'related links' || text === 'related link' || text === 'related';
  });

  let sliced =
    relatedHeadingIndex === -1 ? blocks : blocks.slice(0, relatedHeadingIndex);

  // Also drop leftover raw "Related: ..." paragraphs from content.
  sliced = sliced.filter((block) => {
    if (block.type !== 'paragraph') return true;
    const text = getInlineText(block.children).trim().toLowerCase();
    if (text.startsWith('related:')) return false;
    if (text.startsWith('related paths')) return false;
    if (text.startsWith('next:')) return false;
    if (text.startsWith('product:')) return false;
    return true;
  });

  return sliced;
}

export function ArticleContent({ blocks, articleTitle }: ArticleContentProps) {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  const contentBlocks = stripEmbeddedRelatedLinks(blocks);
  const idCounts = new Map<string, number>();

  const headingId = (label: string) => {
    const base = slugify(label);
    const count = idCounts.get(base) ?? 0;
    idCounts.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };

  return (
    <article className="article-content-blocks">
      {contentBlocks.map((block, index) => {
        switch (block.type) {
          case 'heading': {
            const Tag = `h${block.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
            const label = getInlineText(block.children);
            return (
              <Tag
                key={index}
                id={headingId(label)}
                className="block-heading"
                data-heading-level={block.level}
              >
                {renderText(block.children)}
              </Tag>
            );
          }

          case 'paragraph': {
            const text = getInlineText(block.children);

            // Recover mis-seeded markdown headings still stored as paragraphs
            const mdHeading = text.trim().match(/^(#{1,6})\s+(.+)$/);
            if (mdHeading) {
              const level = Math.min(6, mdHeading[1].length) as 1 | 2 | 3 | 4 | 5 | 6;
              const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
              const label = mdHeading[2].trim();
              return (
                <Tag
                  key={index}
                  id={headingId(label)}
                  className="block-heading"
                  data-heading-level={level}
                >
                  {label}
                </Tag>
              );
            }

            // Video embed: paragraph contains only a URL
            if (isUrlOnlyParagraph(text)) {
              const youtubeId = extractYouTubeId(text);
              const vimeoId = extractVimeoId(text);
              const isVideo = !!(youtubeId || vimeoId || isDirectVideoUrl(text));

              if (isVideo) {
                return (
                  <ArticleVideo
                    key={index}
                    url={text}
                    title={articleTitle}
                  />
                );
              }
            }

            return <p key={index}>{renderText(block.children)}</p>;
          }

          case 'list': {
            const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
            return (
              <ListTag key={index} className={block.format === 'ordered' ? 'block-ol' : 'block-ul'}>
                {block.children.map((item, i) => (
                  <li key={i} className="block-li">
                    {renderText(item.children)}
                  </li>
                ))}
              </ListTag>
            );
          }

          case 'quote':
            return (
              <blockquote key={index} className="block-quote">
                {renderText(block.children)}
              </blockquote>
            );

          case 'code':
            return (
              <pre key={index} className="block-code">
                <code>{getInlineText(block.children)}</code>
              </pre>
            );

          case 'image': {
            const url = block.image?.url;
            if (!url) return null;
            return (
              <img
                key={index}
                src={url}
                alt={block.image?.alternativeText || articleTitle || ''}
                className="block-image"
              />
            );
          }

          case 'list-item':
            return (
              <li key={index} className="block-li">
                {renderText(block.children)}
              </li>
            );

          default:
            return null;
        }
      })}
    </article>
  );
}

export type TocItem = {
  id: string;
  label: string;
  level: number;
};

/**
 * Build outline from CMS content.
 * - nested: include h2–h5 (and markdown headings in paragraphs) for curriculum drill-down
 * - flat major: prefer ## only (legacy side tabs / compact rails)
 */
export function getTableOfContents(
  blocks: StrapiBlock[],
  options: { nested?: boolean } = {},
): TocItem[] {
  const contentBlocks = stripEmbeddedRelatedLinks(blocks);
  const items: TocItem[] = [];
  const seen = new Map<string, number>();

  const push = (rawLabel: string, level: number) => {
    const label = rawLabel.trim();
    if (!label) return;
    // Skip top-level H1 (chapter title often repeated in body)
    if (level < 2 || level > 5) return;
    let id = slugify(label);
    const count = seen.get(id) ?? 0;
    if (count > 0) id = `${id}-${count + 1}`;
    seen.set(slugify(label), count + 1);
    items.push({ id, label, level });
  };

  for (const block of contentBlocks) {
    if (block.type === 'heading') {
      push(getInlineText(block.children), block.level);
      continue;
    }
    if (block.type === 'paragraph') {
      const text = getInlineText(block.children);
      const mdHeading = text.trim().match(/^(#{1,6})\s+(.+)$/);
      if (mdHeading) {
        push(mdHeading[2], Math.min(6, mdHeading[1].length));
      }
    }
  }

  if (options.nested) {
    return items;
  }

  const major = items.filter((b) => b.level === 2);
  return major.length > 0 ? major : items;
}
