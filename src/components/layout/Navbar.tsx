'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPos = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(sectionId);
          }
        }
      }

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        setActiveNav('contact');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header>
      <nav aria-label="Main navigation">
        <Link href="#home" className="nav-logo" aria-label="Home" onClick={closeMenu}>
          <img src="/assets/images/logo-transparent.png" alt="Petros Geto Logo" />
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          className={`mobile-menu-btn ${isOpen ? 'is-open' : ''}`}
          id="mobile-menu-btn"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="menu-burger" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Navigation Links / Dropdown Menu */}
        <div className={`nav-menu-drawer ${isOpen ? 'is-open' : ''}`} id="nav-menu-drawer">
          <ul>
            <li>
              <a
                href="#home"
                className={activeNav === 'home' ? 'active' : ''}
                onClick={closeMenu}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={activeNav === 'about' ? 'active' : ''}
                onClick={closeMenu}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className={activeNav === 'skills' ? 'active' : ''}
                onClick={closeMenu}
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={activeNav === 'projects' ? 'active' : ''}
                onClick={closeMenu}
              >
                Projects
              </a>
            </li>
            <li>
              <Link href="/project-detail/?id=aman-pay" onClick={closeMenu}>
                Project Details ↗
              </Link>
            </li>
            <li>
              <a
                href="#contact"
                className={activeNav === 'contact' ? 'active' : ''}
                onClick={closeMenu}
              >
                Get in Touch
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

