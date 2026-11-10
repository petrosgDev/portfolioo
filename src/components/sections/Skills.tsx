'use client';

import React, { useEffect, useRef } from 'react';

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const computeInitialCardStack = () => {
      const skillsWrapper = section.querySelector('.skills-categories-wrapper') as HTMLElement;
      const allSkillTiles = section.querySelectorAll<HTMLElement>('.skill-tile');
      if (!skillsWrapper || !allSkillTiles.length) return;

      const wrapperRect = skillsWrapper.getBoundingClientRect();
      const centerX = wrapperRect.left + wrapperRect.width / 2;
      const centerY = wrapperRect.top + wrapperRect.height / 2;

      allSkillTiles.forEach((tile, index) => {
        const tileRect = tile.getBoundingClientRect();
        const targetTileCenterX = tileRect.left + tileRect.width / 2;
        const targetTileCenterY = tileRect.top + tileRect.height / 2;

        const deltaX = centerX - targetTileCenterX;
        const deltaY = centerY - targetTileCenterY;

        tile.style.setProperty('--stack-x', `${deltaX + ((index % 4) - 1.5) * 4}px`);
        tile.style.setProperty('--stack-y', `${deltaY + ((index % 3) - 1) * 3}px`);
        tile.style.setProperty('--stack-rot', `${((index % 7) - 3) * 4}deg`);
        tile.style.transitionDelay = `${index * 0.035}s`;
      });

      if (allSkillTiles[0]) {
        allSkillTiles[0].classList.add('stack-top-card');
      }
    };

    computeInitialCardStack();
    window.addEventListener('resize', computeInitialCardStack);

    let hasExploded = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasExploded) {
            hasExploded = true;
            setTimeout(() => {
              section.classList.add('is-active');
            }, 200);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(section);

    return () => {
      window.removeEventListener('resize', computeInitialCardStack);
      observer.disconnect();
    };
  }, []);

  const triggerNow = () => {
    if (sectionRef.current) {
      sectionRef.current.classList.add('is-active');
    }
  };

  return (
    <section
      className="skills-section"
      id="skills"
      ref={sectionRef}
      onClick={triggerNow}
      onTouchStart={triggerNow}
    >
      <div className="section-header">
        <h2>
          MY TECH STACK
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
            <rect x="1.5" y="1.5" width="21" height="15" rx="2" fill="white" stroke="black" />
            <path d="M6.5 6L4 9L6.5 12" stroke="black" />
            <path d="M17.5 6L20 9L17.5 12" stroke="black" />
            <path d="M13 5.5L11 12.5" stroke="black" />
          </svg>
        </h2>
      </div>

      <div className="skills-categories-wrapper">
        <div className="skills-category-group" data-category="frontend">
          <h3 className="category-heading">Frontend</h3>
          <div className="category-tiles-zone">
            <div className="skill-tile tile--cyan rot-pos-1" style={{ '--orig-rot': '1.5deg' } as any}>
              <span className="skill-icon" aria-hidden="true">&lt;/&gt;</span>
              <span className="skill-name">REACT</span>
            </div>
            <div className="skill-tile tile--lime rot-neg-2" style={{ '--orig-rot': '-3deg' } as any}>
              <span className="skill-icon" aria-hidden="true">JS</span>
              <span className="skill-name">JAVASCRIPT</span>
            </div>
            <div className="skill-tile tile--orange rot-pos-2" style={{ '--orig-rot': '3deg' } as any}>
              <span className="skill-icon" aria-hidden="true">&lt;N&gt;</span>
              <span className="skill-name">NEXT.JS</span>
            </div>
            <div className="skill-tile tile--cyan rot-pos-1" style={{ '--orig-rot': '2deg' } as any}>
              <span className="skill-icon" aria-hidden="true">💙</span>
              <span className="skill-name">FLUTTER</span>
            </div>
            <div className="skill-tile tile--purple rot-neg-1" style={{ '--orig-rot': '-1.5deg' } as any}>
              <span className="skill-icon" aria-hidden="true">&lt;html&gt;</span>
              <span className="skill-name">HTML5</span>
            </div>
            <div className="skill-tile tile--pink rot-neg-2" style={{ '--orig-rot': '-2.5deg' } as any}>
              <span className="skill-icon" aria-hidden="true">#css</span>
              <span className="skill-name">CSS3</span>
            </div>
          </div>
        </div>

        <div className="skills-category-group" data-category="backend">
          <h3 className="category-heading">Backend</h3>
          <div className="category-tiles-zone">
            <div className="skill-tile tile--yellow rot-neg-1" style={{ '--orig-rot': '-1.5deg' } as any}>
              <span className="skill-icon" aria-hidden="true">🟢</span>
              <span className="skill-name">NODE.JS</span>
            </div>
            <div className="skill-tile tile--cyan rot-pos-2" style={{ '--orig-rot': '2.5deg' } as any}>
              <span className="skill-icon" aria-hidden="true">⚡</span>
              <span className="skill-name">EXPRESS</span>
            </div>
            <div className="skill-tile tile--lime rot-neg-1" style={{ '--orig-rot': '-2deg' } as any}>
              <span className="skill-icon" aria-hidden="true">🌱</span>
              <span className="skill-name">SPRING BOOT</span>
            </div>
            <div className="skill-tile tile--yellow rot-pos-1" style={{ '--orig-rot': '1.5deg' } as any}>
              <span className="skill-icon" aria-hidden="true">🐍</span>
              <span className="skill-name">PYTHON</span>
            </div>
            <div className="skill-tile tile--purple rot-neg-2" style={{ '--orig-rot': '-3deg' } as any}>
              <span className="skill-icon" aria-hidden="true">🌐</span>
              <span className="skill-name">REST APIs</span>
            </div>
            <div className="skill-tile tile--lime rot-neg-2" style={{ '--orig-rot': '-2deg' } as any}>
              <span className="skill-icon" aria-hidden="true">C++</span>
              <span className="skill-name">C++</span>
            </div>
          </div>
        </div>

        <div className="skills-category-group" data-category="devops">
          <h3 className="category-heading">DevOps &amp; Tools</h3>
          <div className="category-tiles-zone">
            <div className="skill-tile tile--orange rot-pos-2" style={{ '--orig-rot': '3deg' } as any}>
              <span className="skill-icon" aria-hidden="true">🐙</span>
              <span className="skill-name">GIT</span>
            </div>
            <div className="skill-tile tile--yellow rot-neg-2" style={{ '--orig-rot': '-2.5deg' } as any}>
              <span className="skill-icon" aria-hidden="true">🐈</span>
              <span className="skill-name">GITHUB</span>
            </div>
            <div className="skill-tile tile--cyan rot-neg-1" style={{ '--orig-rot': '-1.5deg' } as any}>
              <span className="skill-icon" aria-hidden="true">🐳</span>
              <span className="skill-name">DOCKER</span>
            </div>
            <div className="skill-tile tile--lime rot-pos-1" style={{ '--orig-rot': '2deg' } as any}>
              <span className="skill-icon" aria-hidden="true">▲</span>
              <span className="skill-name">VERCEL</span>
            </div>
            <div className="skill-tile tile--purple rot-neg-1" style={{ '--orig-rot': '-2deg' } as any}>
              <span className="skill-icon" aria-hidden="true">🚀</span>
              <span className="skill-name">RENDER</span>
            </div>
            <div className="skill-tile tile--pink rot-pos-1" style={{ '--orig-rot': '1.5deg' } as any}>
              <span className="skill-icon" aria-hidden="true">🔄</span>
              <span className="skill-name">CI/CD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

