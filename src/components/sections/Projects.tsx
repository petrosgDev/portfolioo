'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Projects() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
        <h2>
          <span className="projects-slash" aria-hidden="true">/</span>
          <span className="projects-title-text">SELECTED WORKS</span>
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
            <path
              d="M1.5 4.5C1.5 3.4 2.4 2.5 3.5 2.5H8L10 5H20.5C21.6 5 22.5 5.9 22.5 7V14.5C22.5 15.6 21.6 16.5 20.5 16.5H3.5C2.4 16.5 1.5 15.6 1.5 14.5V4.5Z"
              fill="white"
              stroke="black"
            />
            <line x1="1.5" y1="7.5" x2="22.5" y2="7.5" stroke="black" />
          </svg>
        </h2>
      </div>

      <div className={`projects-grid ${isExpanded ? 'is-expanded' : ''}`}>
        {/* Project 1: Aman Pay */}
        <article className="project-card card--retro-os is-visible">
          <div className="card-header-bar">
            <div className="os-window-dots" aria-hidden="true">
              <span className="os-dot dot-red"></span>
              <span className="os-dot dot-yellow"></span>
              <span className="os-dot dot-green"></span>
            </div>
            <span className="card-pill-tag tag-blue">FINTECH &amp; ESCROW</span>
          </div>
          <Link
            href="/project-detail/?id=aman-pay"
            className="project-img-frame"
            aria-label="Aman Pay Engineering Details"
          >
            <img
              src="https://i.postimg.cc/BnDrqNMf/Screenshot-From-2026-11-05-21-45-07.png"
              alt="Aman Pay Preview"
              className="project-img"
            />
          </Link>
          <div className="project-card-info">
            <h3 className="project-title">
              <Link href="/project-detail/?id=aman-pay">Aman Pay</Link>
            </h3>
            <div className="project-tags-row">
              <span className="tech-pill pill-white">Next.js</span>
              <span className="tech-pill pill-cyan">React</span>
              <span className="tech-pill pill-white">Node.js</span>
              <span className="tech-pill pill-yellow">Escrow</span>
            </div>
            <div className="project-actions-row">
              <Link href="/project-detail/?id=aman-pay" className="card-btn btn-spec">
                Detail ↗
              </Link>
              <a
                href="https://aman-pay-lake.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="card-btn btn-live"
              >
                Live ↗
              </a>
              <a
                href="https://github.com/petrosgDev"
                target="_blank"
                rel="noopener noreferrer"
                className="card-btn btn-github"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </article>

        {/* Project 2: Event Hub */}
        <article className="project-card card--lime is-visible">
          <div className="card-header-bar justify-end">
            <span className="card-pill-tag tag-yellow">WEB APPLICATION</span>
          </div>
          <Link
            href="/project-detail/?id=event-hub"
            className="project-img-frame"
            aria-label="Event Hub Engineering Details"
          >
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
              alt="Event Hub Preview"
              className="project-img"
            />
          </Link>
          <div className="project-card-info">
            <h3 className="project-title">
              <Link href="/project-detail/?id=event-hub">Event Hub</Link>
            </h3>
            <div className="project-tags-row">
              <span className="tech-pill pill-orange">Next.js</span>
              <span className="tech-pill pill-yellow">Node.js</span>
              <span className="tech-pill pill-white">PostgreSQL</span>
            </div>
            <div className="project-actions-row">
              <Link href="/project-detail/?id=event-hub" className="card-btn btn-spec">
                Detail ↗
              </Link>
              <a
                href="https://github.com/petrosgDev/event-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="card-btn btn-dark"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </article>

        {/* Project 3: Ethio Massage */}
        <article className="project-card card--white is-visible">
          <div className="card-header-bar">
            <span className="card-pill-tag tag-white">WELLNESS PLATFORM</span>
          </div>
          <Link
            href="/project-detail/?id=ethio-massage"
            className="project-img-frame"
            aria-label="Ethio Massage Engineering Details"
          >
            <img
              src="https://i.postimg.cc/HxJQdCxL/Screenshot-From-2026-11-05-17-58-09.png"
              alt="Ethio Massage Preview"
              className="project-img"
            />
          </Link>
          <div className="project-card-info">
            <h3 className="project-title">
              <Link href="/project-detail/?id=ethio-massage">Ethio Massage</Link>
            </h3>
            <div className="project-tags-row">
              <span className="tech-pill pill-pink">Next.js</span>
              <span className="tech-pill pill-cyan">React</span>
              <span className="tech-pill pill-white">WhatsApp API</span>
              <span className="tech-pill pill-white">Tailwind</span>
            </div>
            <div className="project-actions-row">
              <Link href="/project-detail/?id=ethio-massage" className="card-btn btn-spec">
                Detail ↗
              </Link>
              <a
                href="https://ethio-massage.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="card-btn btn-live"
              >
                Live ↗
              </a>
              <a
                href="https://github.com/petrosgDev/ethio-massage"
                target="_blank"
                rel="noopener noreferrer"
                className="card-btn btn-github"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </article>

        {/* Project 4: Wende Dubai */}
        <article className="project-card card--orange is-visible">
          <div className="card-header-bar justify-end">
            <span className="card-pill-tag tag-live">LIVE PREVIEW</span>
          </div>
          <Link
            href="/project-detail/?id=wende-dubai"
            className="project-img-frame"
            aria-label="Wende Dubai Interior Design Engineering Details"
          >
            <img
              src="https://i.postimg.cc/YqCSTzyb/Screenshot-From-2026-11-05-19-06-18.png"
              alt="Wende Dubai Interior Design Preview"
              className="project-img"
            />
          </Link>
          <div className="project-card-info">
            <h3 className="project-title">
              <Link href="/project-detail/?id=wende-dubai">Wende Dubai Interior Design</Link>
            </h3>
            <div className="project-tags-row">
              <span className="tech-pill pill-lime">HTML5/CSS3</span>
              <span className="tech-pill pill-peach">JavaScript</span>
              <span className="tech-pill pill-white">Swiper.js</span>
            </div>
            <div className="project-actions-row">
              <Link href="/project-detail/?id=wende-dubai" className="card-btn btn-spec">
                Detail ↗
              </Link>
              <a
                href="https://wende-dubai-interiordesign.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="card-btn btn-github"
              >
                Live Demo ↗
              </a>
            </div>
          </div>
        </article>

        {/* Project 5: Raman Caffe */}
        <article className="project-card card--retro-os is-visible">
          <div className="card-header-bar">
            <div className="os-window-dots" aria-hidden="true">
              <span className="os-dot dot-red"></span>
              <span className="os-dot dot-yellow"></span>
              <span className="os-dot dot-green"></span>
            </div>
            <span className="card-pill-tag tag-cyan">CAFÉ &amp; DINING</span>
          </div>
          <Link
            href="/project-detail/?id=raman-caffe"
            className="project-img-frame"
            aria-label="Raman Caffe Engineering Details"
          >
            <img
              src="https://i.postimg.cc/bvbhMmcH/Screenshot-From-2026-11-05-20-10-44.png"
              alt="Raman Caffe Preview"
              className="project-img"
            />
          </Link>
          <div className="project-card-info">
            <h3 className="project-title">
              <Link href="/project-detail/?id=raman-caffe">Raman Caffe</Link>
            </h3>
            <div className="project-tags-row">
              <span className="tech-pill pill-white">HTML5/CSS3</span>
              <span className="tech-pill pill-peach">JavaScript</span>
              <span className="tech-pill pill-yellow">UI/UX</span>
            </div>
            <div className="project-actions-row">
              <Link href="/project-detail/?id=raman-caffe" className="card-btn btn-spec">
                Detail ↗
              </Link>
              <a
                href="https://github.com/petrosgDev"
                target="_blank"
                rel="noopener noreferrer"
                className="card-btn btn-dark"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </article>

        {/* Project 6: Nexus Campus Services */}
        <article className="project-card card--lime is-visible">
          <div className="card-header-bar justify-end">
            <span className="card-pill-tag tag-orange">CAMPUS MANAGEMENT</span>
          </div>
          <Link
            href="/project-detail/?id=nexus-campus"
            className="project-img-frame"
            aria-label="Nexus Campus Services Engineering Details"
          >
            <img
              src="https://i.postimg.cc/TwR490R3/photo-2026-06-30-17-07-10.jpg"
              alt="Nexus Campus Services Preview"
              className="project-img"
            />
          </Link>
          <div className="project-card-info">
            <h3 className="project-title">
              <Link href="/project-detail/?id=nexus-campus">Nexus Campus Services (NCS)</Link>
            </h3>
            <div className="project-tags-row">
              <span className="tech-pill pill-orange">Java</span>
              <span className="tech-pill pill-peach">JavaFX</span>
              <span className="tech-pill pill-white">MySQL</span>
            </div>
            <div className="project-actions-row">
              <Link href="/project-detail/?id=nexus-campus" className="card-btn btn-spec">
                Detail ↗
              </Link>
              <a
                href="https://github.com/petrosgDev"
                target="_blank"
                rel="noopener noreferrer"
                className="card-btn btn-dark"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </article>

        {/* Project 7: MyApp */}
        <article className="project-card card--white is-visible">
          <div className="card-header-bar">
            <span className="card-pill-tag tag-white">MOBILE APP</span>
          </div>
          <Link
            href="/project-detail/?id=my-app"
            className="project-img-frame"
            aria-label="MyApp Mobile Engineering Details"
          >
            <img
              src="https://i.postimg.cc/GhjMzNMW/Screenshot-From-2026-11-05-21-51-29.png"
              alt="MyApp Preview"
              className="project-img"
            />
          </Link>
          <div className="project-card-info">
            <h3 className="project-title">
              <Link href="/project-detail/?id=my-app">MyApp</Link>
            </h3>
            <div className="project-tags-row">
              <span className="tech-pill pill-cyan">React Native</span>
              <span className="tech-pill pill-white">Expo</span>
              <span className="tech-pill pill-lime">Offline-First</span>
            </div>
            <div className="project-actions-row">
              <Link href="/project-detail/?id=my-app" className="card-btn btn-spec">
                Detail ↗
              </Link>
              <a
                href="https://github.com/petrosgDev"
                target="_blank"
                rel="noopener noreferrer"
                className="card-btn btn-dark"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </article>

        {/* Project 8: Banking System */}
        <article className="project-card card--orange is-visible">
          <div className="card-header-bar justify-end">
            <span className="card-pill-tag tag-live">DESKTOP SYSTEM</span>
          </div>
          <Link
            href="/project-detail/?id=banking-system"
            className="project-img-frame"
            aria-label="Banking System Engineering Details"
          >
            <img
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80"
              alt="Banking System Preview"
              className="project-img"
            />
          </Link>
          <div className="project-card-info">
            <h3 className="project-title">
              <Link href="/project-detail/?id=banking-system">Banking System</Link>
            </h3>
            <div className="project-tags-row">
              <span className="tech-pill pill-peach">C++</span>
              <span className="tech-pill pill-white">MySQL</span>
              <span className="tech-pill pill-lime">Qt</span>
            </div>
            <div className="project-actions-row">
              <Link href="/project-detail/?id=banking-system" className="card-btn btn-spec">
                Detail ↗
              </Link>
              <a
                href="https://github.com/petrosgDev/banking_system"
                target="_blank"
                rel="noopener noreferrer"
                className="card-btn btn-github"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </article>
      </div>

      <div className="projects-more-wrapper">
        <a
          href={isExpanded ? 'https://github.com/petrosgDev?tab=repositories' : '#projects'}
          target={isExpanded ? '_blank' : undefined}
          rel={isExpanded ? 'noopener noreferrer' : undefined}
          className={`projects-more-btn ${isExpanded ? 'is-github-mode' : ''}`}
          id="projects-more-btn"
          role={isExpanded ? undefined : 'button'}
          aria-expanded={isExpanded}
          onClick={(e) => {
            if (!isExpanded) {
              e.preventDefault();
              setIsExpanded(true);
            }
          }}
        >
          <svg
            className="more-chevron-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          <svg
            className="more-github-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          <span className="projects-more-btn-text">
            {isExpanded ? 'SEE MORE PROJECTS ON GITHUB ↗' : 'SEE MORE'}
          </span>
        </a>
      </div>
    </section>
  );
}

