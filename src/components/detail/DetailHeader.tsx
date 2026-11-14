'use client';

import React from 'react';
import Link from 'next/link';

interface DetailHeaderProps {
  projectName: string;
}

export default function DetailHeader({ projectName }: DetailHeaderProps) {
  return (
    <header className="detail-header" id="detailHeader">
      <div className="detail-header-inner">
        <Link href="/" className="detail-back-btn" aria-label="Back to Home">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
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
            PETROS GETO // <strong>{projectName.toUpperCase()}</strong>
          </div>
          <Link href="/" className="detail-logo-badge" title="Petros Geto — Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/logo-transparent.png" alt="Petros Geto Monogram" />
          </Link>
        </div>
      </div>
    </header>
  );
}
