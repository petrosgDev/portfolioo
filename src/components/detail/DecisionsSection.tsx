import React from 'react';
import { DecisionItem } from '../../types/project';

interface DecisionsSectionProps {
  decisions: DecisionItem[];
}

export default function DecisionsSection({ decisions }: DecisionsSectionProps) {
  return (
    <section className="decisions-section">
      <div className="decisions-header">
        <div>
          <span
            style={{
              background: 'var(--pink)',
              border: '2px solid var(--ink)',
              borderRadius: '999px',
              padding: '4px 12px',
              fontSize: '11px',
              fontWeight: 900,
              textTransform: 'uppercase',
            }}
          >
            UNDER THE HOOD
          </span>
          <h3 className="decisions-title" style={{ marginTop: '8px' }}>
            Key Engineering Decisions &amp; Architectural Trade-Offs
          </h3>
        </div>
        <span
          className="font-mono"
          style={{ fontSize: '11px', fontWeight: 800, color: '#666', letterSpacing: '0.5px' }}
        >
          PRODUCTION POST-MORTEM &amp; DESIGN NOTES
        </span>
      </div>

      <div className="decisions-grid" id="detailDecisionsGrid">
        {decisions.map((d, idx) => (
          <div key={idx} className="decision-card">
            <div>
              <span className="decision-tag">{d.badge}</span>
              <h4 className="decision-heading">{d.title}</h4>
              <p className="decision-desc">{d.desc}</p>
            </div>
            <div
              style={{
                marginTop: '14px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                fontWeight: 800,
                color: '#059669',
              }}
            >
              ✓ Production Verified
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
