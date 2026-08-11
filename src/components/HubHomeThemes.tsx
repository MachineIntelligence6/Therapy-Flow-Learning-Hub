import { CheckCircle2, Circle, PlayCircle } from 'lucide-react';
import type { Article } from '../types';
import {
  getContinueSlug,
  getOverallProgressPercent,
  isChapterComplete,
  type HubProgress,
} from '../lib/progressStore';
import { chapterSlugs, sortChapters } from '../lib/chapters';
import './HubHomeThemes.css';

type Props = {
  articles: Article[];
  progress: HubProgress;
  onOpen: (article: Article) => void;
};

function ProgressRing({ percent, size = 88 }: { percent: number; size?: number }) {
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <svg width={size} height={size} className="hub-progress-ring" aria-hidden>
      <circle
        className="hub-progress-ring-track"
        cx={size / 2}
        cy={size / 2}
        r={r}
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        className="hub-progress-ring-value"
        cx={size / 2}
        cy={size / 2}
        r={r}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" className="hub-progress-ring-label">
        {percent}%
      </text>
    </svg>
  );
}

export function CourseHome({ articles, progress, onOpen }: Props) {
  const ordered = sortChapters(articles);
  const slugs = chapterSlugs(articles);
  const percent = getOverallProgressPercent(slugs, progress);
  const continueSlug = getContinueSlug(slugs, progress);
  const continueArticle = ordered.find((a) => a.slug === continueSlug) ?? ordered[0];
  const completedCount = slugs.filter((s) => isChapterComplete(s, progress)).length;

  return (
    <div className="hub-home hub-home-course">
      <section className="course-continue-panel" aria-labelledby="continue-heading">
        <div className="course-continue-main">
          <p className="hub-eyebrow">SmartHub Handbook</p>
          <h1 id="continue-heading" className="course-continue-title">
            Continue learning
          </h1>
          {continueArticle ? (
            <>
              <p className="course-continue-subtitle">{continueArticle.title}</p>
              <p className="course-continue-desc">
                {continueArticle.description || 'Pick up where you left off in the SmartHub handbook.'}
              </p>
              <button type="button" className="course-continue-cta" onClick={() => onOpen(continueArticle)}>
                <PlayCircle size={20} aria-hidden />
                {completedCount === 0 ? 'Start chapter' : 'Resume'}
              </button>
            </>
          ) : (
            <p className="course-continue-desc">No chapters available yet.</p>
          )}
        </div>
        <div className="course-continue-progress">
          <ProgressRing percent={percent} />
          <p className="course-progress-caption">
            {completedCount} of {slugs.length} chapters complete
          </p>
        </div>
      </section>

      <section className="course-modules" aria-labelledby="modules-heading">
        <div className="course-modules-header">
          <h2 id="modules-heading">Chapters</h2>
          <div className="course-progress-bar" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
            <div className="course-progress-bar-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
        <div className="course-module-grid">
          {ordered.map((article, index) => {
            const done = isChapterComplete(article.slug, progress);
            const isContinue = article.slug === continueArticle?.slug;
            return (
              <button
                key={article.slug}
                type="button"
                className={`course-module-card${done ? ' is-complete' : ''}${isContinue ? ' is-continue' : ''}`}
                onClick={() => onOpen(article)}
              >
                <span className="course-module-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="course-module-status" aria-hidden>
                  {done ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                </span>
                <span className="course-module-title">{article.title}</span>
                <span className="course-module-meta">
                  {article.readTime || 'Guide'}
                  {done ? ' · Complete' : isContinue ? ' · Continue' : ''}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
