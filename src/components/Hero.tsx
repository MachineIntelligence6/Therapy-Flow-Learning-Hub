import React from 'react';
import './Hero.css';

interface HeroProps {
  onHomeClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onHomeClick }) => {
  return (
    <section className="hero-section">
      <div className="container hero-container animate-fade-in">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <button onClick={onHomeClick} className="breadcrumb-link">
                Home
              </button>
            </li>
            <li className="breadcrumb-item separator">/</li>
            <li className="breadcrumb-item active" aria-current="page">
              Therapy Flow Learning Hub
            </li>
          </ol>
        </nav>

        {/* Title & Description */}
        <div className="hero-content">
          <h1 className="hero-title">Therapy Flow Learning Hub</h1>
          <p className="hero-subtitle">
            Step-by-step guides to help you manage appointments, clients, and your therapy journey.
          </p>
        </div>
      </div>
    </section>
  );
};
