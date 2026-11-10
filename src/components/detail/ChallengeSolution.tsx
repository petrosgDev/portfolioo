import React from 'react';

interface ChallengeSolutionProps {
  challengeTitle: string;
  challengeBody: string;
  challengeBullets: string[];
  solutionTitle: string;
  solutionBody: string;
  solutionBullets: string[];
}

export default function ChallengeSolution({
  challengeTitle,
  challengeBody,
  challengeBullets,
  solutionTitle,
  solutionBody,
  solutionBullets,
}: ChallengeSolutionProps) {
  return (
    <section className="challenge-solution-grid">
      <div className="challenge-card">
        <div className="section-tag-pill tag-challenge">
          <span>⚠️ THE ENGINEERING CHALLENGE</span>
        </div>
        <h3 className="cs-title">{challengeTitle}</h3>
        <p className="cs-body">{challengeBody}</p>
        <ul className="cs-bullets-list">
          {challengeBullets.map((b, idx) => (
            <li key={idx} className="cs-bullet-item">
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="solution-card">
        <div className="section-tag-pill tag-solution">
          <span>✅ THE ARCHITECTURAL SOLUTION</span>
        </div>
        <h3 className="cs-title">{solutionTitle}</h3>
        <p className="cs-body">{solutionBody}</p>
        <ul className="cs-bullets-list">
          {solutionBullets.map((b, idx) => (
            <li key={idx} className="cs-bullet-item">
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

