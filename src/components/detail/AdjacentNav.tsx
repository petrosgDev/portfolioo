import React from 'react';
import Link from 'next/link';
import { Project } from '../../types/project';

interface AdjacentNavProps {
  prevProject: Project;
  nextProject: Project;
  onSelectProject?: (id: string) => void;
}

export default function AdjacentNav({ prevProject, nextProject, onSelectProject }: AdjacentNavProps) {
  return (
    <nav className="adjacent-nav-bar" aria-label="Adjacent project navigation">
      <Link
        href={`/project-detail/?id=${prevProject.id}`}
        onClick={(e) => {
          if (onSelectProject) {
            e.preventDefault();
            onSelectProject(prevProject.id);
          }
        }}
        id="prevProjectBtn"
        className="nav-adjacent-btn"
      >
        <span className="adj-arrow">←</span>
        <div className="adj-text-wrap text-left">
          <span className="adj-sub">Previous Detail</span>
          <span className="adj-name" id="prevProjectName">
            {prevProject.name}
          </span>
        </div>
      </Link>

      <Link href="/" className="brutal-pill brutal-btn" style={{ background: 'var(--white)' }}>
        <span>⊞ Back to Home</span>
      </Link>

      <Link
        href={`/project-detail/?id=${nextProject.id}`}
        onClick={(e) => {
          if (onSelectProject) {
            e.preventDefault();
            onSelectProject(nextProject.id);
          }
        }}
        id="nextProjectBtn"
        className="nav-adjacent-btn next-btn"
      >
        <div className="adj-text-wrap text-right">
          <span className="adj-sub">Next Detail</span>
          <span className="adj-name" id="nextProjectName">
            {nextProject.name}
          </span>
        </div>
        <span className="adj-arrow">→</span>
      </Link>
    </nav>
  );
}
