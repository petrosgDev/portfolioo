import React from 'react';
import Link from 'next/link';

interface DetailHeaderProps {
  projectId: string;
}

export default function DetailHeader({ projectId }: DetailHeaderProps) {
  const slug = `${projectId.toUpperCase().replace(/-/g, '_')}_DETAIL`;

  return (
    <header className="detail-header">
      <div className="detail-header-inner">
        <Link href="/" className="back-btn" id="backToProjectsBtn" aria-label="Back to Home">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Home</span>
        </Link>

        <div className="detail-header-right">
          <div className="detail-breadcrumb font-mono">
            PETROS GETO // <strong id="headerSlugTag">{slug}</strong>
          </div>
          <Link href="/" className="detail-logo-badge" title="Petros Geto — Home">
            <img src="/assets/images/logo-transparent.png" alt="Petros Geto Monogram" />
          </Link>
        </div>
      </div>
    </header>
  );
}

