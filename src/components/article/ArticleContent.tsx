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

function renderText(children: StrapiTextNode[]) {
  return children.map((node, i) => {
    let el: ReactNode = node.text;

    if (node.bold) el = <strong key={i}>{el}</strong>;
    if (node.italic) el = <em key={i}>{el}</em>;
    if (node.underline) el = <u key={i}>{el}</u>;
    if (node.strikethrough) el = <del key={i}>{el}</del>;
    if (node.code) el = <code key={i}>{el}</code>;

    return <span key={i}>{el}</span>;
  });
}

export function ArticleContent({ blocks, articleTitle }: ArticleContentProps) {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  return (
    <article className="article-content-blocks">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading': {
            const Tag = `h${block.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
            return (
              <Tag key={index} id={slugify(getInlineText(block.children))} className="block-heading">
                {renderText(block.children)}
              </Tag>
            );
          }

          case 'paragraph': {
            const text = getInlineText(block.children);

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

export function getTableOfContents(blocks: StrapiBlock[]) {
  return blocks
    .filter((b): b is Extract<StrapiBlock, { type: 'heading' }> => b.type === 'heading')
    .map((block) => ({
      id: slugify(getInlineText(block.children)),
      label: getInlineText(block.children),
      level: block.level,
    }));
}
