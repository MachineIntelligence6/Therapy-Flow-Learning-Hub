import React from 'react';
import { ArrowUpRight, BookOpen, Clock } from 'lucide-react';
import type { Article } from '../types';
import './ArticleCard.css';

interface ArticleCardProps {
  article: Article;
  isFeatured?: boolean;
  onReadClick: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  isFeatured = false, 
  onReadClick 
}) => {
  
  // Custom gradient based on category to make cards look vibrant
  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'Getting Started':
        return 'linear-gradient(135deg, #E6F4FA 0%, #BFE3F3 100%)';
      case 'Customization':
        return 'linear-gradient(135deg, #FDF4E5 0%, #F9DEC9 100%)';
      case 'Communication':
        return 'linear-gradient(135deg, #EEF9F1 0%, #D4EEDC 100%)';
      case 'Security':
        return 'linear-gradient(135deg, #FAF0F0 0%, #F3D5D5 100%)';
      case 'Benefits':
        return 'linear-gradient(135deg, #F5F1FA 0%, #E2D5F3 100%)';
      default:
        return 'linear-gradient(135deg, #F0F2F5 0%, #D3D7DF 100%)';
    }
  };

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className={`article-card ${isFeatured ? 'featured-layout' : 'grid-layout'} hover-lift`}>
      {/* Thumbnail area with fallback styling */}
      <div 
        className="card-media-wrapper" 
        style={{ background: getCategoryGradient(article.category) }}
        onClick={() => onReadClick(article)}
      >
        {article.image ? (
          <img 
            src={article.image} 
            alt={article.title} 
            className="card-image"
          />
        ) : (
          <span className="fallback-category-icon">
            <BookOpen size={isFeatured ? 48 : 32} className="media-icon" />
          </span>
        )}
        <div className="card-badge">{article.category}</div>
      </div>

      {/* Details/Text Area */}
      <div className="card-content-area">
        <div className="card-meta">
          <span className="card-date">{formattedDate}</span>
          <span className="meta-separator">•</span>
          <span className="card-readtime">
            <Clock size={12} style={{ marginRight: 4 }} />
            {article.readTime}
          </span>
        </div>

        <h3 className="card-title" onClick={() => onReadClick(article)}>
          {article.title}
        </h3>

        <p className="card-description">
          {article.description}
        </p>

        <button 
          className={isFeatured ? "card-read-link" : "card-read-link-plain"} 
          onClick={() => onReadClick(article)}
        >
          Read article <ArrowUpRight size={16} className="arrow-icon" />
        </button>
      </div>
    </article>
  );
};
