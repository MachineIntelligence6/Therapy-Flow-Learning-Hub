# Learning Hub — Frontend Video & Content Blocks Guide

This guide explains how to render **Learning Hub article `Content`** from Strapi, including **optional embedded videos** (YouTube, Vimeo, or direct files hosted on Cloudflare R2).

---

## 1. Overview

| Item | Detail |
|------|--------|
| **CMS** | Strapi 5 — `learning-hub` collection |
| **Content field** | `Content` (type: `blocks`) |
| **Video storage** | Optional URL inside a `paragraph` block — **not** a separate API field |
| **Video sources** | YouTube, Vimeo, direct file URL (`.mp4` on R2, etc.) |
| **Frontend job** | Detect video URLs in paragraphs and render the correct player |

**No Strapi schema changes are required.** The frontend only needs to update its blocks renderer.

---

## 2. API Endpoints

### List articles

```
GET /api/learning-hubs
```

Returns fields including `Content`, `title`, `slug`, `Category_Tag`, `Card_Image`, etc.

### Article detail by slug (recommended)

```
GET /api/learning-hubs/slug/:slug
```

Example:

```
GET https://strapi-admin.therapyflow.pro/api/learning-hubs/slug/measurement-based-care-human-touch
```

### Example response shape

```json
{
  "data": {
    "id": 19,
    "title": "Using Measurement-Based Care Without Losing the Human Touch",
    "slug": "measurement-based-care-human-touch",
    "Description": "Discover how brief outcome measures...",
    "Category_Tag": "Outcomes",
    "Reading_Time": 7,
    "Publish_Date": "2026-06-10",
    "Is_Featured": true,
    "Content": [
      {
        "type": "heading",
        "level": 2,
        "children": [{ "type": "text", "text": "What measurement-based care really is" }]
      },
      {
        "type": "paragraph",
        "children": [{ "type": "text", "text": "Measurement-based care (MBC) means..." }]
      },
      {
        "type": "heading",
        "level": 2,
        "children": [{ "type": "text", "text": "Watch: Making measures feel collaborative" }]
      },
      {
        "type": "paragraph",
        "children": [{ "type": "text", "text": "The video below shows how to introduce..." }]
      },
      {
        "type": "paragraph",
        "children": [{ "type": "text", "text": "https://www.youtube.com/watch?v=0QxqL5mHk6A" }]
      }
    ],
    "Card_Image": {
      "url": "https://pub-xxx.r2.dev/image.jpg",
      "alternativeText": "..."
    }
  }
}
```

> **Note:** Video URLs appear as plain text inside `paragraph` blocks. That is intentional.

---

## 3. Content block types to support

| Block `type` | Render as |
|--------------|-----------|
| `heading` | `<h1>`–`<h6>` using `level` |
| `paragraph` | `<p>` **or** video player if URL-only paragraph |
| `list` | `<ul>` or `<ol>` using `format` |
| `list-item` | `<li>` |
| `quote` | `<blockquote>` |
| `code` | `<pre><code>` (if present) |
| `image` | `<img>` (if present in future content) |

---

## 4. Video rendering rules

When a **`paragraph`** block contains **only a URL** (optional whitespace), detect the type and render accordingly:

| URL pattern | Player | Use iframe? |
|-------------|--------|-------------|
| `youtube.com/watch?v=`, `youtu.be/`, `youtube.com/embed/` | YouTube embed | **Yes** |
| `vimeo.com/123456` | Vimeo embed | **Yes** |
| `.mp4`, `.webm`, `.ogg`, `.mov` (e.g. R2 public URL) | HTML5 `<video>` | **No** |
| Anything else | Plain `<p>` or `<a href>` | No |

### Decision flow

```
paragraph text
    │
    ├─ YouTube URL?     → <iframe src="youtube.com/embed/ID" />
    ├─ Vimeo URL?       → <iframe src="player.vimeo.com/video/ID" />
    ├─ Direct video URL?→ <video controls><source src="URL" /></video>
    └─ Normal text      → <p>{text}</p>
```

---

## 5. Implementation (React / TypeScript)

### 5.1 Types

```ts
// types/strapi-blocks.ts

export type StrapiTextNode = {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

export type StrapiBlock =
  | {
      type: 'paragraph';
      children: StrapiTextNode[];
    }
  | {
      type: 'heading';
      level: 1 | 2 | 3 | 4 | 5 | 6;
      children: StrapiTextNode[];
    }
  | {
      type: 'list';
      format: 'ordered' | 'unordered';
      children: Array<{ type: 'list-item'; children: StrapiTextNode[] }>;
    }
  | {
      type: 'quote';
      children: StrapiTextNode[];
    };

export type LearningHubArticle = {
  id: number;
  title: string;
  slug: string;
  Description: string;
  Category_Tag: string;
  Reading_Time: number;
  Publish_Date: string;
  Is_Featured: boolean;
  Content: StrapiBlock[];
  Card_Image?: {
    url: string;
    alternativeText?: string;
  } | null;
};
```

### 5.2 URL helpers

```ts
// utils/video-url.ts

const YOUTUBE_REGEX =
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;

const VIMEO_REGEX = /vimeo\.com\/(?:video\/)?(\d+)/;

const DIRECT_VIDEO_REGEX = /\.(mp4|webm|ogg|mov)(\?.*)?$/i;

export function extractYouTubeId(url: string): string | null {
  const match = url.trim().match(YOUTUBE_REGEX);
  return match?.[1] ?? null;
}

export function extractVimeoId(url: string): string | null {
  const match = url.trim().match(VIMEO_REGEX);
  return match?.[1] ?? null;
}

export function isDirectVideoUrl(url: string): boolean {
  return DIRECT_VIDEO_REGEX.test(url.trim());
}

/** True when paragraph is only a URL (video embed candidate). */
export function isUrlOnlyParagraph(text: string): boolean {
  const trimmed = text.trim();
  return /^https?:\/\/\S+$/i.test(trimmed);
}

export function getInlineText(children: StrapiTextNode[]): string {
  return children.map((child) => child.text).join('');
}
```

### 5.3 Video component

```tsx
// components/article/ArticleVideo.tsx

type ArticleVideoProps = {
  url: string;
  title?: string;
};

export function ArticleVideo({ url, title = 'Article video' }: ArticleVideoProps) {
  const trimmed = url.trim();

  const youtubeId = extractYouTubeId(trimmed);
  if (youtubeId) {
    return (
      <div className="my-8 w-full overflow-hidden rounded-xl">
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  const vimeoId = extractVimeoId(trimmed);
  if (vimeoId) {
    return (
      <div className="my-8 w-full overflow-hidden rounded-xl">
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://player.vimeo.com/video/${vimeoId}`}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  if (isDirectVideoUrl(trimmed)) {
    return (
      <div className="my-8 w-full overflow-hidden rounded-xl">
        <video
          className="w-full rounded-xl"
          controls
          playsInline
          preload="metadata"
          aria-label={title}
        >
          <source src={trimmed} />
          Your browser does not support embedded video.
        </video>
      </div>
    );
  }

  // Fallback: show as link
  return (
    <p className="my-4">
      <a href={trimmed} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
        {trimmed}
      </a>
    </p>
  );
}
```

### 5.4 Blocks renderer

```tsx
// components/article/ArticleContent.tsx

import { ArticleVideo } from './ArticleVideo';

type ArticleContentProps = {
  blocks: StrapiBlock[];
  articleTitle?: string;
};

function renderText(children: StrapiTextNode[]) {
  return children.map((node, i) => {
    let el: React.ReactNode = node.text;

    if (node.bold) el = <strong key={i}>{el}</strong>;
    if (node.italic) el = <em key={i}>{el}</em>;
    if (node.underline) el = <u key={i}>{el}</u>;
    if (node.code) el = <code key={i}>{el}</code>;

    return <span key={i}>{el}</span>;
  });
}

export function ArticleContent({ blocks, articleTitle }: ArticleContentProps) {
  return (
    <article className="prose prose-lg max-w-none">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading': {
            const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
            return (
              <Tag key={index} id={slugify(getInlineText(block.children))}>
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
              const isVideo =
                youtubeId || vimeoId || isDirectVideoUrl(text);

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
              <ListTag key={index}>
                {block.children.map((item, i) => (
                  <li key={i}>{renderText(item.children)}</li>
                ))}
              </ListTag>
            );
          }

          case 'quote':
            return (
              <blockquote key={index}>{renderText(block.children)}</blockquote>
            );

          default:
            return null;
        }
      })}
    </article>
  );
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}
```

### 5.5 Page usage

```tsx
// pages/LearningHubArticle.tsx (example)

export default function LearningHubArticlePage({ article }: { article: LearningHubArticle }) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
      {/* Sidebar TOC — build from heading blocks */}
      <ArticleTableOfContents blocks={article.Content} />

      {/* Main content */}
      <ArticleContent blocks={article.Content} articleTitle={article.title} />
    </div>
  );
}
```

---

## 6. Table of contents (sidebar)

Build the left sidebar from `heading` blocks in `Content`:

```ts
function getTableOfContents(blocks: StrapiBlock[]) {
  return blocks
    .filter((b): b is Extract<StrapiBlock, { type: 'heading' }> => b.type === 'heading')
    .map((block) => ({
      id: slugify(getInlineText(block.children)),
      label: getInlineText(block.children),
      level: block.level,
    }));
}
```

Scroll-spy / active section highlighting can use these `id` anchors on headings.

---

## 7. R2-hosted videos (direct `.mp4`)

### How editors add R2 video

1. Upload video to **Strapi Media Library** (stored on R2), **or** upload directly to the R2 bucket.
2. Copy the **public URL**, e.g.:
   ```
   https://pub-75e278c633fe4bd8932c1d71392a9601.r2.dev/videos/session-intro.mp4
   ```
3. In Strapi Admin → Learning Hub → **Content**, add a paragraph with only that URL.
4. Publish.

### R2 CORS (required for `<video>` playback)

In Cloudflare R2 bucket → **Settings → CORS**, allow your frontend origin:

```json
[
  {
    "AllowedOrigins": [
      "https://learninghub.therapyflow.pro",
      "http://localhost:5173"
    ],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

### Recommended video format

| Setting | Value |
|---------|-------|
| Format | `.mp4` (H.264 + AAC) |
| Max size | Keep reasonable for web (e.g. under 100MB) |
| Player | HTML5 `<video controls>` — no iframe |

---

## 8. YouTube videos (current seeded content)

All 4 seeded articles include YouTube URLs in `Content`:

| Slug | Video URL |
|------|-----------|
| `building-trust-first-therapy-session` | `https://www.youtube.com/watch?v=4BqLmRVX0fs` |
| `measurement-based-care-human-touch` | `https://www.youtube.com/watch?v=0QxqL5mHk6A` |
| `trauma-informed-telehealth-safety` | `https://www.youtube.com/watch?v=CT9Xh2k7Cw8` |
| `engaging-families-adolescent-care` | `https://www.youtube.com/watch?v=Qfh5W7XmB5k` |

After implementing `ArticleVideo`, these should render as embedded players instead of raw URL text.

---

## 9. Styling notes

Match existing Learning Hub layout:

```css
/* Suggested spacing */
.article-video {
  margin: 2rem 0;
  border-radius: 0.75rem;
  overflow: hidden;
}

.article-video iframe,
.article-video video {
  width: 100%;
  display: block;
}

.article-video .aspect-wrapper {
  position: relative;
  aspect-ratio: 16 / 9;
}
```

Use `aspect-video` (Tailwind) or `aspect-ratio: 16/9` for YouTube/Vimeo iframes.

---

## 10. Testing checklist

- [ ] Normal paragraph text still renders as `<p>`
- [ ] Heading blocks render correct `h2` / `h3` and appear in sidebar TOC
- [ ] YouTube URL-only paragraph renders iframe embed (not raw text)
- [ ] Vimeo URL renders Vimeo iframe
- [ ] R2 `.mp4` URL renders `<video controls>`
- [ ] Article without video URL still works (video is optional)
- [ ] Mobile: video is responsive, full width
- [ ] `GET /api/learning-hubs/slug/:slug` returns full `Content` array

### Quick manual test

1. Open: `https://learninghub.therapyflow.pro/learning-hub/measurement-based-care-human-touch`
2. Scroll to **"Watch: Making measures feel collaborative"**
3. Expected: embedded YouTube player
4. Current (before fix): raw URL string `https://www.youtube.com/watch?v=...`

---

## 11. What NOT to change

| Do not | Reason |
|--------|--------|
| Add `Video` / `Video_URL` fields on Strapi | Video is intentionally inside `Content` |
| Expect Strapi to return embed HTML | Strapi only returns block JSON |
| Use iframe for R2 `.mp4` files | Use `<video>` for direct files |
| Break existing text paragraphs | Only URL-only paragraphs become players |

---

## 12. Optional enhancements (later)

- **Lazy load** iframes (`loading="lazy"`)
- **Thumbnail + play button** for R2 videos before loading full file
- **Mixed paragraph** support: text + link inline (only URL-only paragraphs auto-embed for now)
- **Strapi Blocks React** package: `@strapi/blocks-react-renderer` — extend with custom `paragraph` modifier for video URLs

---

## 13. Summary

```
Strapi Content paragraph (URL only)
        ↓
Frontend blocks renderer
        ↓
   ┌────┴────┐
YouTube/Vimeo → iframe embed
R2 .mp4 URL   → <video> player
Normal text   → <p>
```

**One file to create:** `ArticleContent.tsx` (blocks renderer)  
**One file to create:** `ArticleVideo.tsx` (player logic)  
**One file to create:** `video-url.ts` (URL detection helpers)

No backend changes required.
