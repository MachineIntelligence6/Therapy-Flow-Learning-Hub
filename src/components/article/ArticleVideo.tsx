import {
  extractVimeoId,
  extractYouTubeId,
  isDirectVideoUrl,
} from '../../utils/video-url';

type ArticleVideoProps = {
  url: string;
  title?: string;
};

export function ArticleVideo({ url, title = 'Article video' }: ArticleVideoProps) {
  const trimmed = url.trim();

  const youtubeId = extractYouTubeId(trimmed);
  if (youtubeId) {
    return (
      <div className="article-video">
        <div className="article-video-aspect">
          <iframe
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
      <div className="article-video">
        <div className="article-video-aspect">
          <iframe
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
      <div className="article-video">
        <video
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

  return (
    <p className="article-video-fallback">
      <a href={trimmed} target="_blank" rel="noopener noreferrer" className="inline-link">
        {trimmed}
      </a>
    </p>
  );
}
