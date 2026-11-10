'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PROJECTS_DATA } from '../../data/projects';
import DetailHeader from '../../components/detail/DetailHeader';
import QuickJumpBar from '../../components/detail/QuickJumpBar';
import HeroCard from '../../components/detail/HeroCard';
import MetricsStrip from '../../components/detail/MetricsStrip';
import ShowcaseFrame from '../../components/detail/ShowcaseFrame';
import Workbench from '../../components/detail/Workbench';
import ChallengeSolution from '../../components/detail/ChallengeSolution';
import DecisionsSection from '../../components/detail/DecisionsSection';
import AdjacentNav from '../../components/detail/AdjacentNav';
import Toast from '../../components/detail/Toast';

function ProjectDetailContent() {
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id') || 'aman-pay';

  const [activeProjectId, setActiveProjectId] = useState(queryId);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

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

  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 2400);
  };

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
      <DetailHeader projectId={project.id} />

      <main className="detail-main">
        <QuickJumpBar
          projects={PROJECTS_DATA}
          activeId={project.id}
          onSelectProject={handleSelectProject}
        />

        <HeroCard project={project} onShowToast={handleShowToast} />

        <MetricsStrip metrics={project.metrics} />

        <ShowcaseFrame
          previewImage={project.previewImage}
          projectName={project.name}
          liveUrl={project.liveUrl}
        />

        <Workbench
          architectureNodes={project.architectureNodes}
          schemaTables={project.schemaTables}
          codePath={project.codePath}
          codeNote={project.codeNote}
          codeSnippet={project.codeSnippet}
          onShowToast={handleShowToast}
        />

        <ChallengeSolution
          challengeTitle={project.challengeTitle}
          challengeBody={project.challengeBody}
          challengeBullets={project.challengeBullets}
          solutionTitle={project.solutionTitle}
          solutionBody={project.solutionBody}
          solutionBullets={project.solutionBullets}
        />

        <DecisionsSection decisions={project.decisions} />

        <AdjacentNav
          prevProject={prevProject}
          nextProject={nextProject}
          onSelectProject={handleSelectProject}
        />
      </main>

      <Toast message={toastMessage} isVisible={isToastVisible} />
    </>
  );
}

export default function ProjectDetailPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', fontFamily: 'monospace' }}>Loading Project Details...</div>}>
      <ProjectDetailContent />
    </Suspense>
  );
}
