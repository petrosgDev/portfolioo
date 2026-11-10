import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1 className="hero-headline">
          <span className="hero-line hero-line-1">PETROS</span>
          <span className="hero-line hero-line-2">GETO</span>
          <span className="hero-line hero-line-3">SOFTWARE</span>
          <span className="hero-line hero-line-4">ENGINEER</span>
          <span className="hero-line hero-line-5">&amp; AI</span>
          <span className="hero-line hero-line-6">DEVELOPER</span>
        </h1>

        <div className="hero-buttons">
          <a href="#projects" className="hero-btn btn-primary">
            VIEW PROJECTS
          </a>
          <a href="#contact" className="hero-btn btn-secondary">
            GET IN TOUCH ↗
          </a>
        </div>
      </div>
      <div className="hero-image">
        <img
          src="/assets/images/portrait-transparent.png"
          alt="Portrait of Petros Geto"
          width="450"
          height="450"
        />
      </div>
    </section>
  );
}

