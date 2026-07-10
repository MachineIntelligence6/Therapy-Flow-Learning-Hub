import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import './Hero.css';

interface HeroProps {
  onHomeClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onHomeClick }) => {
  return (
    <section className="hero-section">
      <div className="container hero-container animate-fade-in">
        <Breadcrumbs
          items={[
            { label: 'Home', onClick: onHomeClick },
            { label: 'Therapy Flow Learning Hub', current: true },
          ]}
        />

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
