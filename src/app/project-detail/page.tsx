'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PROJECTS_DATA } from '../../data/projects';
import DetailHeader from '../../components/detail/DetailHeader';
import QuickJumpBar from '../../components/detail/QuickJumpBar';
import ProjectDetailCaseStudy from '../../components/detail/ProjectDetailCaseStudy';
import AdjacentNav from '../../components/detail/AdjacentNav';

function ProjectDetailContent() {
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id') || 'aman-pay';

  const [activeProjectId, setActiveProjectId] = useState(queryId);

  useEffect(() => {
    if (queryId) {
      setActiveProjectId(queryId);
    }
  }, [queryId]);

  const project = PROJECTS_DATA.find((p) => p.id === activeProjectId) || PROJECTS_DATA[0];

  const currentIdx = PROJECTS_DATA.findIndex((p) => p.id === project.id);
  const prevIdx = (currentIdx - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
  const nextIdx = (currentIdx + 1) % PROJECTS_DATA.length;

  const prevProject = PROJECTS_DATA[prevIdx];
  const nextProject = PROJECTS_DATA[nextIdx];

  const handleSelectProject = (id: string) => {
    setActiveProjectId(id);
    if (typeof window !== 'undefined' && window.history.pushState) {
      const newUrl = `${window.location.pathname}?id=${id}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <DetailHeader projectName={project.name} />

      <main className="detail-main">
        <QuickJumpBar
          projects={PROJECTS_DATA}
          activeId={project.id}
          onSelectProject={handleSelectProject}
        />

        <ProjectDetailCaseStudy project={project} />

        <AdjacentNav
          prevProject={prevProject}
          nextProject={nextProject}
          onSelectProject={handleSelectProject}
        />
      </main>
    </>
  );
}

export default function ProjectDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="detail-loading-state font-mono">
          <span>LOADING CASE STUDY...</span>
        </div>
      }
    >
      <ProjectDetailContent />
    </Suspense>
  );
}
