import type { StrapiMedia } from './seo/types';

type CardVariant = 'featured' | 'grid';

function pickFormatUrl(media: StrapiMedia, variant: CardVariant): string | undefined {
  const formats = media.formats;
  const original = media.url || undefined;
  if (!formats) return original;

  if (variant === 'featured') {
    return formats.medium?.url || formats.small?.url || formats.large?.url || original;
  }

  return formats.small?.url || formats.medium?.url || original;
}

export function resolveAbsoluteMediaUrl(apiUrl: string, path?: string | null): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  const origin = apiUrl.replace(/\/$/, '');
  return `${origin}${path.startsWith('/') ? '' : '/'}${path}`;
}

export function resolveCardImage(
  apiUrl: string,
  media?: StrapiMedia | null,
  variant: CardVariant = 'grid',
): { src?: string; srcSet?: string; sizes?: string } {
  if (!media) return {};

  const src = resolveAbsoluteMediaUrl(apiUrl, pickFormatUrl(media, variant));
  if (!src) return {};

  const formats = media.formats;
  if (!formats) {
    return {
      src,
      sizes: variant === 'featured' ? '(max-width: 768px) 100vw, 640px' : '(max-width: 768px) 50vw, 320px',
    };
  }

  const srcSetParts: string[] = [];
  const add = (url: string | null | undefined, width: number) => {
    const absolute = resolveAbsoluteMediaUrl(apiUrl, url || undefined);
    if (absolute) srcSetParts.push(`${absolute} ${width}w`);
  };

  add(formats.thumbnail?.url, formats.thumbnail?.width || 156);
  add(formats.small?.url, formats.small?.width || 500);
  add(formats.medium?.url, formats.medium?.width || 750);
  if (variant === 'featured') {
    add(formats.large?.url, formats.large?.width || 1000);
  }

  return {
    src,
    srcSet: srcSetParts.length > 1 ? srcSetParts.join(', ') : undefined,
    sizes: variant === 'featured' ? '(max-width: 768px) 100vw, 640px' : '(max-width: 768px) 50vw, 320px',
  };
}
