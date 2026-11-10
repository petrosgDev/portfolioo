import React, { useState } from 'react';
import { Project } from '../../types/project';

interface HeroCardProps {
  project: Project;
  onShowToast: (msg: string) => void;
}

export default function HeroCard({ project, onShowToast }: HeroCardProps) {
  const [copied, setCopied] = useState(false);

  const copyClone = () => {
    navigator.clipboard.writeText(project.cloneCmd);
    setCopied(true);
    onShowToast(`Copied: ${project.cloneCmd}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const windowPath = `CASE_STUDY // ${project.id.toUpperCase().replace(/-/g, '_')}_${project.version.toUpperCase()}`;

  return (
    <article className="detail-hero-card brutal-card">
      <div className="detail-window-top">
        <div className="os-dots-wrap">
          <span className="os-dot red"></span>
          <span className="os-dot yellow"></span>
          <span className="os-dot green"></span>
          <span className="window-path-text font-mono" id="windowPathText">
            {windowPath}
          </span>
        </div>

        <div className="detail-top-badges">
          <span className="badge-status">
            <span className="status-dot-pulse"></span>
            <span>PRODUCTION READY</span>
          </span>
          <span
            className="badge-category"
            style={{ backgroundColor: project.categoryBadgeBg }}
          >
            {project.categoryBadge}
          </span>
        </div>
      </div>

      <div className="hero-split-grid">
        <div className="hero-left-col">
          <div className="role-timeline-chip font-mono">
            {project.roleTimeline}
          </div>

          <h1 className="detail-title font-display">{project.name}</h1>
          <p className="detail-subtitle">{project.subtitle}</p>
          <p className="detail-overview-text">{project.overview}</p>

          <div className="tech-pills-label">Core Technology Stack &amp; Protocols:</div>
          <div className="tech-pills-row">
            {project.techPills.map((p, i) => (
              <span key={i} className={`tech-pill-badge ${p.bg}`}>
                {p.label}
              </span>
            ))}
          </div>

          <div className="detail-actions-row">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn btn-live"
              >
                <span>Live Production</span>
                <span>↗</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn btn-github"
              >
                <span>GitHub Repo</span>
                <span>↗</span>
              </a>
            )}
            {project.cloneCmd && (
              <button
                type="button"
                onClick={copyClone}
                className="action-btn btn-copy"
                title="Copy Git clone command"
              >
                <span id="cloneCmdText">{project.cloneCmd}</span>
                <span
                  style={{
                    background: 'var(--ink)',
                    color: 'var(--primary)',
                    padding: '2px 7px',
                    borderRadius: '4px',
                    fontSize: '10px',
                  }}
                >
                  {copied ? 'COPIED' : 'COPY'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Right System Details Box */}
        <div className="spec-sheet-box">
          <div className="spec-sheet-header">
            <span className="spec-sheet-title">⚡ SYSTEM DETAIL SHEET</span>
            <span className="spec-sheet-tag">{project.version}</span>
          </div>

          <div className="spec-rows-list">
            {project.specs.map((s, idx) => (
              <div key={idx} className="spec-row">
                <span className="spec-label">{s.label}:</span>
                <span className="spec-value">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="spec-audit-panel">
            <div className="spec-audit-header">
              <span>Production Readiness Audit</span>
              <span className="audit-score-summary">99.4 / 100</span>
            </div>
            <div className="audit-grid">
              <div className="audit-box">
                <div className="audit-val">{project.scores.perf}</div>
                <div className="audit-lbl">Perf</div>
              </div>
              <div className="audit-box">
                <div className="audit-val">{project.scores.sec}</div>
                <div className="audit-lbl">Security</div>
              </div>
              <div className="audit-box">
                <div className="audit-val">{project.scores.uptime}</div>
                <div className="audit-lbl">Uptime</div>
              </div>
              <div className="audit-box">
                <div className="audit-val">{project.scores.tests}</div>
                <div className="audit-lbl">Tests</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
