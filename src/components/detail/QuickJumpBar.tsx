import React from 'react';
import Link from 'next/link';
import { Project } from '../../types/project';

interface QuickJumpBarProps {
  projects: Project[];
  activeId: string;
  onSelectProject?: (id: string) => void;
}

export default function QuickJumpBar({ projects, activeId, onSelectProject }: QuickJumpBarProps) {
  return (
    <nav className="quick-jump-bar" aria-label="Jump to another project detail">
      <span className="quick-jump-label">Jump To Detail:</span>
      <div className="quick-jump-pills" id="quickJumpPills">
        {projects.map((p) => {
          const isActive = p.id === activeId;
          return (
            <Link
              key={p.id}
              href={`/project-detail/?id=${p.id}`}
              onClick={(e) => {
                if (onSelectProject) {
                  e.preventDefault();
                  onSelectProject(p.id);
                }
              }}
              className={`jump-pill ${isActive ? 'is-active' : ''}`}
            >
              {p.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
