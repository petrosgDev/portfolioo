'use client';

import React from 'react';
import { Project } from '../../types/project';

interface ProjectDetailCaseStudyProps {
  project: Project;
}

export default function ProjectDetailCaseStudy({ project }: ProjectDetailCaseStudyProps) {
  return (
    <article className="detail-case-study-card" id="projectCaseStudy">
      {/* ================================================================= */}
      {/* 1. HERO / PROJECT INTRODUCTION                                    */}
      {/* ================================================================= */}
      <section className="detail-hero-section" id="hero-intro">
        <div className="detail-hero-top-badges">
          <span
            className="detail-category-pill"
            style={{ backgroundColor: project.categoryBadgeBg }}
          >
            {project.categoryBadge}
          </span>
          <span className="detail-version-tag">{project.version}</span>
          <span className="detail-status-tag">
            <span className="status-live-dot"></span>
            {project.status}
          </span>
        </div>

        <h1 className="detail-hero-title font-display">{project.name}</h1>
        <p className="detail-hero-subtitle">{project.subtitle}</p>

        <div className="detail-hero-meta-row">
          <div className="meta-item">
            <span className="meta-label">ROLE & TIMELINE:</span>
            <span className="meta-value">{project.roleTimeline}</span>
          </div>
        </div>

        <div className="detail-hero-actions">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-btn detail-btn-yellow"
            >
              <span>⚡ Open Live Demo</span>
              <span className="btn-arrow">↗</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-btn detail-btn-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span>View GitHub</span>
              <span className="btn-arrow">↗</span>
            </a>
          )}
        </div>
      </section>

      <hr className="detail-section-divider" />

      {/* ================================================================= */}
      {/* 2. PROJECT OVERVIEW                                               */}
      {/* ================================================================= */}
      <section className="detail-section" id="overview">
        <span className="detail-section-tag">01 // PROJECT OVERVIEW</span>
        <h2 className="detail-section-heading">Overview & Strategic Objective</h2>
        <p className="detail-section-text">{project.overview}</p>
        <div className="overview-summary-callout">
          <span className="callout-icon">💡</span>
          <p className="callout-text">{project.overviewSummary}</p>
        </div>
      </section>

      <hr className="detail-section-divider" />

      {/* ================================================================= */}
      {/* 3. PROBLEM STATEMENT                                              */}
      {/* ================================================================= */}
      <section className="detail-section" id="problem">
        <span className="detail-section-tag">02 // PROBLEM STATEMENT</span>
        <h2 className="detail-section-heading">{project.problemTitle}</h2>
        <p className="detail-section-text">{project.problemBody}</p>

        <ul className="clean-points-list">
          {project.problemPoints.map((point, idx) => (
            <li key={idx} className="clean-point-item problem-point">
              <span className="point-icon problem-icon">✕</span>
              <span className="point-text">{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <hr className="detail-section-divider" />

      {/* ================================================================= */}
      {/* 4. SOLUTION                                                       */}
      {/* ================================================================= */}
      <section className="detail-section" id="solution">
        <span className="detail-section-tag">03 // SOLUTION</span>
        <h2 className="detail-section-heading">{project.solutionTitle}</h2>
        <p className="detail-section-text">{project.solutionBody}</p>

        <ul className="clean-points-list">
          {project.solutionPoints.map((point, idx) => (
            <li key={idx} className="clean-point-item solution-point">
              <span className="point-icon solution-icon">✓</span>
              <span className="point-text">{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <hr className="detail-section-divider" />

      {/* ================================================================= */}
      {/* 5. KEY FEATURES                                                   */}
      {/* ================================================================= */}
      <section className="detail-section" id="features">
        <span className="detail-section-tag">04 // KEY FEATURES</span>
        <h2 className="detail-section-heading">Core Engineering Capabilities</h2>

        <div className="features-clean-list">
          {project.keyFeatures.map((feat, idx) => (
            <div key={idx} className="feature-clean-item">
              {feat.tag && <span className="feature-tag-badge">{feat.tag}</span>}
              <div className="feature-item-content">
                <h3 className="feature-item-title">{feat.title}</h3>
                <p className="feature-item-desc">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="detail-section-divider" />

      {/* ================================================================= */}
      {/* 6. SCREENSHOTS AND GALLERY                                        */}
      {/* ================================================================= */}
      <section className="detail-section" id="gallery">
        <span className="detail-section-tag">05 // SCREENSHOTS & GALLERY</span>
        <h2 className="detail-section-heading">Production Interface & Live Experience</h2>

        <div className="clean-showcase-frame">
          <div className="clean-showcase-bar">
            <div className="clean-window-dots">
              <span className="clean-dot clean-dot-red"></span>
              <span className="clean-dot clean-dot-yellow"></span>
              <span className="clean-dot clean-dot-green"></span>
            </div>
            <div className="clean-window-url font-mono">
              {project.liveUrl || 'https://production-system.internal'}
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.previewImage}
            alt={`${project.name} Production Interface`}
            className="clean-showcase-img"
            loading="lazy"
          />
          <div className="clean-showcase-caption">
            <span>{project.galleryCaption}</span>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="caption-link"
              >
                Inspect Live View ↗
              </a>
            )}
          </div>
        </div>
      </section>

      <hr className="detail-section-divider" />

      {/* ================================================================= */}
      {/* 7. TECHNOLOGIES USED                                              */}
      {/* ================================================================= */}
      <section className="detail-section" id="technologies">
        <span className="detail-section-tag">06 // TECHNOLOGIES USED</span>
        <h2 className="detail-section-heading">Full-Stack Technical Ecosystem</h2>

        <div className="tech-groups-grid">
          {project.techStack.map((group, idx) => (
            <div key={idx} className="tech-group-item">
              <span className="tech-group-category">{group.category}</span>
              <div className="tech-group-pills">
                {group.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="tech-tag-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="detail-section-divider" />

      {/* ================================================================= */}
      {/* 8. SYSTEM ARCHITECTURE                                            */}
      {/* ================================================================= */}
      <section className="detail-section" id="architecture">
        <span className="detail-section-tag">07 // SYSTEM ARCHITECTURE</span>
        <h2 className="detail-section-heading">System Design & Architectural Layers</h2>
        <p className="detail-section-text">{project.architectureOverview}</p>

        <div className="arch-layers-list">
          {project.architectureLayers.map((layer, idx) => (
            <div key={idx} className="arch-layer-item">
              <div className="arch-layer-meta">
                <span className="arch-layer-name">{layer.layer}</span>
                <span className="arch-layer-tech">{layer.tech}</span>
              </div>
              <h3 className="arch-layer-title">{layer.title}</h3>
              <p className="arch-layer-desc">{layer.description}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="detail-section-divider" />

      {/* ================================================================= */}
      {/* 9. HOW IT WORKS                                                   */}
      {/* ================================================================= */}
      <section className="detail-section" id="how-it-works">
        <span className="detail-section-tag">08 // HOW IT WORKS</span>
        <h2 className="detail-section-heading">Step-by-Step Transaction Workflow</h2>

        <div className="workflow-steps-list">
          {project.howItWorks.map((step, idx) => (
            <div key={idx} className="workflow-step-item">
              <span className="workflow-step-num">{step.step}</span>
              <div className="workflow-step-content">
                <h3 className="workflow-step-title">{step.title}</h3>
                <p className="workflow-step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="detail-section-divider" />

      {/* ================================================================= */}
      {/* 10. MY ROLE AND CONTRIBUTIONS                                     */}
      {/* ================================================================= */}
      <section className="detail-section" id="role-contributions">
        <span className="detail-section-tag">09 // MY ROLE & CONTRIBUTIONS</span>
        <h2 className="detail-section-heading">Personal Engineering Deliverables</h2>
        <div className="my-role-badge">
          <span className="role-chip-dot"></span>
          <span>{project.myRole}</span>
        </div>

        <ul className="clean-contributions-list">
          {project.contributions.map((contrib, idx) => (
            <li key={idx} className="clean-contribution-item">
              <span className="contrib-bullet">⚡</span>
              <span className="contrib-text">{contrib}</span>
            </li>
          ))}
        </ul>
      </section>

      <hr className="detail-section-divider" />

      {/* ================================================================= */}
      {/* 11. LIVE DEMO AND GITHUB                                          */}
      {/* ================================================================= */}
      <section className="detail-section detail-cta-section" id="live-demo-github">
        <span className="detail-section-tag">10 // LIVE DEMO & SOURCE CODE</span>
        <h2 className="detail-section-heading">Explore {project.name}</h2>
        <p className="detail-section-text">
          Inspect the live production environment or explore the source repository, commit history,
          and architecture implementation on GitHub.
        </p>

        <div className="detail-bottom-actions">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-btn detail-btn-yellow"
            >
              <span>⚡ Launch Live Application</span>
              <span className="btn-arrow">↗</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-btn detail-btn-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span>View Source on GitHub</span>
              <span className="btn-arrow">↗</span>
            </a>
          )}
        </div>
      </section>
    </article>
  );
}
