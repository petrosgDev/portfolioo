import React from 'react';

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="section-header">
        <h2>
          ABOUT ME
          <svg
            className="header-icon"
            width="48"
            height="36"
            viewBox="0 0 24 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="1.5" y="1.5" width="21" height="15" rx="2" fill="white" stroke="black" />
            <circle cx="8" cy="7.5" r="2.5" fill="white" stroke="black" />
            <path d="M4 14C4.5 11.5 6 10.5 8 10.5C10 10.5 11.5 11.5 12 14" stroke="black" />
            <line x1="14.5" y1="6" x2="19.5" y2="6" stroke="black" />
            <line x1="14.5" y1="9.5" x2="19.5" y2="9.5" stroke="black" />
            <line x1="14.5" y1="13" x2="17.5" y2="13" stroke="black" />
          </svg>
        </h2>
      </div>
      <div className="about-container">
        <p className="about-statement">
          I&apos;m <span className="about-c-orange">Petros Geto</span>, a software engineer building full-stack
          applications and <span className="about-c-purple">AI-powered solutions</span>. I turn ideas into
          functional, scalable digital products through clean code, thoughtful design, and{' '}
          <span className="about-c-orange">engineering-driven problem solving</span>.
        </p>
        <div className="about-actions">
          <a href="#contact" className="about-btn">
            Get in touch ↗
          </a>
        </div>
      </div>
    </section>
  );
}

