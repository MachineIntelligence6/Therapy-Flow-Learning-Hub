import type { StrapiTextNode } from '../types/strapi-blocks';

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

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}
