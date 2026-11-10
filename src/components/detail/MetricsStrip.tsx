import React from 'react';
import { MetricItem } from '../../types/project';

interface MetricsStripProps {
  metrics: MetricItem[];
}

export default function MetricsStrip({ metrics }: MetricsStripProps) {
  return (
    <section className="metrics-strip-grid" id="detailMetricsGrid">
      {metrics.map((m, idx) => (
        <div key={idx} className="metric-card brutal-card" style={{ backgroundColor: m.bg }}>
          <div className="metric-tag font-mono">{m.tag}</div>
          <div className="metric-val">{m.value}</div>
          <div className="metric-desc">{m.desc}</div>
        </div>
      ))}
    </section>
  );
}
