# Learning Hub — Chapters, Sections & Related Links (Frontend Guide)

How to consume the guidance curriculum from Strapi after playlist seeding.

---

## 1. Data model (unchanged routes)

Same endpoints as before:

| Endpoint | Use |
|----------|-----|
| `GET /api/learning-hubs` | List (sorted by `Order` ascending) |
| `GET /api/learning-hubs/slug/:slug` | Single article detail |

Each article is still one `learning-hub` entry. Chapters and sections are **fields**, not separate content types.

---

## 2. New / important fields

| Field | Type | Purpose |
|-------|------|---------|
| `Chapter` | string | e.g. `"Getting Started"`, `"Clinic Setup (Admin)"` |
| `Section` | string | e.g. `"Sign in"`, `"Practice foundations"` |
| `Order` | integer | Global sort: `chapter*1000 + section*100 + article` |
| `Related_Links` | component[] | Product paths + prev/next articles |
| `Category_Tag` | string | Audience: `Admin`, `Therapist`, `Client`, `Staff`, `All Roles` |
| `Content` | blocks | Step-by-step body (same blocks renderer as before) |
| `breadcrumb` | string | Usually same as `slug` |

### `Related_Links` item

```ts
type RelatedLink = {
  label: string;
  url: string;           // app path (/admin/settings) OR article slug
  link_type: 'product' | 'article' | 'external';
};
```

| `link_type` | `url` meaning | Frontend action |
|-------------|---------------|-----------------|
| `product` | TherapyFlow app path (`/admin/settings`) | Link/open the product app |
| `article` | Learning Hub `slug` | Navigate to `/learning-hub/{slug}` |
| `external` | Absolute `https://...` | Open in new tab |

---

## 3. Example API payload (list item)

```json
{
  "title": "Who signs in where",
  "slug": "who-signs-in-where",
  "Description": "…",
  "Chapter": "Getting Started",
  "Section": "Sign in",
  "Order": 1101,
  "Category_Tag": "All Roles",
  "Content": [ /* blocks */ ],
  "Related_Links": [
    { "label": "auth / staff / login", "url": "/auth/staff/login", "link_type": "product" },
    { "label": "Next: First login — set your password", "url": "first-login-set-your-password", "link_type": "article" }
  ]
}
```

---

## 4. Build Chapter → Section → Article navigation

```ts
type Article = {
  title: string;
  slug: string;
  Chapter: string;
  Section: string;
  Order: number;
  Category_Tag?: string;
  Description?: string;
  Related_Links?: RelatedLink[];
  Content?: unknown[];
};

function buildCurriculum(articles: Article[]) {
  const sorted = [...articles].sort((a, b) => a.Order - b.Order);

  const chapters = new Map<string, Map<string, Article[]>>();

  for (const article of sorted) {
    if (!chapters.has(article.Chapter)) {
      chapters.set(article.Chapter, new Map());
    }
    const sections = chapters.get(article.Chapter)!;
    if (!sections.has(article.Section)) {
      sections.set(article.Section, []);
    }
    sections.get(article.Section)!.push(article);
  }

  return [...chapters.entries()].map(([chapter, sections]) => ({
    chapter,
    sections: [...sections.entries()].map(([section, items]) => ({
      section,
      articles: items,
    })),
  }));
}
```

Suggested UI:

```
Sidebar
  Chapter 1 — Getting Started
    Section — Sign in
      ○ Who signs in where          ← current
      ○ First login — set password
      …
  Chapter 2 — Clinic Setup (Admin)
    …
```

List page: group by `Chapter`, then `Section`, sort by `Order`.  
Detail page: same sidebar + article `Content` + **Related links** panel.

---

## 5. Render Related Links

```tsx
function RelatedLinks({ links }: { links: RelatedLink[] }) {
  if (!links?.length) return null;

  return (
    <aside>
      <h2>Related links</h2>
      <ul>
        {links.map((link, i) => {
          if (link.link_type === 'article') {
            return (
              <li key={i}>
                <a href={`/learning-hub/${link.url}`}>{link.label}</a>
              </li>
            );
          }
          if (link.link_type === 'product') {
            // Point at your TherapyFlow web app origin
            return (
              <li key={i}>
                <a href={`${PRODUCT_APP_ORIGIN}${link.url}`}>{link.label}</a>
              </li>
            );
          }
          return (
            <li key={i}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
```

Split by type if useful:

```ts
const productLinks = links.filter((l) => l.link_type === 'product');
const articleLinks = links.filter((l) => l.link_type === 'article');
```

---

## 6. Curriculum outline (seeded)

10 chapters from `docs/user-flow-playlists.md`:

1. Getting Started  
2. Clinic Setup (Admin)  
3. People & Access (Admin)  
4. Clients & Portal Access  
5. Scheduling & Sessions  
6. Billing & Payments  
7. Tasks, Content & Compliance  
8. Therapist Workspace  
9. Client Portal  
10. Staff (Custom Roles)

~50 how-to articles with steps, summaries (tables → lists), and Related_Links.

---

## 7. Fetch examples

```ts
// List (already sorted by Order from API)
const res = await fetch(`${STRAPI_URL}/api/learning-hubs`);
const { data } = await res.json();
const curriculum = buildCurriculum(data);

// Detail
const detail = await fetch(`${STRAPI_URL}/api/learning-hubs/slug/${slug}`);
const { data: article } = await detail.json();
```

Optional client-side filters:

```ts
data.filter((a) => a.Category_Tag === 'Admin')
data.filter((a) => a.Chapter === 'Getting Started')
```

---

## 8. Content blocks (unchanged)

`Content` is still Strapi blocks. Reuse your existing renderer (headings, paragraphs, lists, quotes).

Optional YouTube / R2 video URLs as **URL-only paragraphs** — see [FRONTEND_VIDEO_CONTENT_GUIDE.md](./FRONTEND_VIDEO_CONTENT_GUIDE.md).

---

## 9. What not to do

| Avoid | Why |
|-------|-----|
| Expect separate Chapter/Section APIs | Everything is flat `learning-hub` |
| Treat `Related_Links.url` the same for all types | `article` = slug; `product` = app path |
| Ignore `Order` | Sidebar/list order will look wrong |
| Parse chapter from title alone | Use `Chapter` / `Section` fields |

---

## 10. Checklist

- [ ] List groups by `Chapter` → `Section` → sort by `Order`
- [ ] Detail shows `Content` via existing blocks renderer
- [ ] Related panel: `article` → Learning Hub route; `product` → app origin + path
- [ ] Audience filter via `Category_Tag` (optional)
- [ ] Empty `Related_Links` still renders article fine
