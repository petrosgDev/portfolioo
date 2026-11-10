'use client';

import React, { useState } from 'react';
import { ArchitectureNode, SchemaTable } from '../../types/project';

interface WorkbenchProps {
  architectureNodes: ArchitectureNode[];
  schemaTables: SchemaTable[];
  codePath: string;
  codeNote: string;
  codeSnippet: string;
  onShowToast: (msg: string) => void;
}

export default function Workbench({
  architectureNodes,
  schemaTables,
  codePath,
  codeNote,
  codeSnippet,
  onShowToast,
}: WorkbenchProps) {
  const [activeTab, setActiveTab] = useState<'architecture' | 'database' | 'code'>('architecture');
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);

  const activeNode = architectureNodes[selectedNodeIndex] || architectureNodes[0];

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    onShowToast(`Copied code from ${codePath}!`);
  };

  return (
    <section className="workbench-card">
      <div className="workbench-tabs-header">
        <div className="workbench-tab-btns">
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`tab-btn ${activeTab === 'architecture' ? 'is-active' : ''}`}
          >
            <span>🔀</span>
            <span>1. System Architecture</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('database')}
            className={`tab-btn ${activeTab === 'database' ? 'is-active' : ''}`}
          >
            <span>🗄️</span>
            <span>2. Database Schema &amp; ERD</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`tab-btn ${activeTab === 'code' ? 'is-active' : ''}`}
          >
            <span>💻</span>
            <span>3. Production Code</span>
          </button>
        </div>
        <div className="font-mono" style={{ fontSize: '12px', fontWeight: 800, color: '#666' }}>
          INTERACTIVE ENGINEERING DETAILS
        </div>
      </div>

      {/* TAB 1: System Architecture */}
      <div className={`tab-panel ${activeTab === 'architecture' ? 'is-active' : ''}`}>
        <div style={{ marginBottom: '22px' }}>
          <span
            style={{
              background: 'var(--cyan)',
              border: '1.5px solid var(--ink)',
              borderRadius: '999px',
              padding: '4px 12px',
              fontSize: '11px',
              fontWeight: 900,
              textTransform: 'uppercase',
            }}
          >
            CLICK ANY NODE TO INSPECT DATA FLOW
          </span>
          <h3
            className="font-display"
            style={{ fontSize: '24px', fontWeight: 900, marginTop: '10px', textTransform: 'uppercase' }}
          >
            Distributed Request Pipeline &amp; Data Flow
          </h3>
        </div>

        <div className="arch-diagram-grid">
          <div className="arch-nodes-chain">
            {architectureNodes.map((node, idx) => {
              const isSelected = idx === selectedNodeIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedNodeIndex(idx)}
                  className={`arch-node-item ${isSelected ? 'is-selected' : ''}`}
                  style={{
                    backgroundColor: isSelected ? 'var(--primary)' : 'var(--white)',
                  }}
                >
                  <div className="arch-node-header">
                    <span className="arch-step-tag">STAGE {node.step}</span>
                    <span className="arch-tech-label">{node.tech}</span>
                  </div>
                  <div className="arch-node-title">{node.title}</div>
                  <div className="arch-node-sub">{node.subtitle}</div>
                </button>
              );
            })}
          </div>

          {activeNode && (
            <div className="arch-inspector-box">
              <div>
                <div className="inspector-header">
                  <span className="inspector-tag">STAGE {activeNode.step}</span>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669' }}>
                    ● ACTIVE PIPELINE NODE
                  </span>
                </div>
                <h4 className="inspector-node-title">{activeNode.title}</h4>
                <div className="inspector-tech">{activeNode.tech}</div>
                <div className="inspector-detail-card">{activeNode.detail}</div>
              </div>
              <div style={{ marginTop: '20px', fontSize: '11px', fontWeight: 800, color: '#666' }} className="font-mono">
                ⚡ Zero data loss architecture with idempotent retries
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TAB 2: Database Schema */}
      <div className={`tab-panel ${activeTab === 'database' ? 'is-active' : ''}`}>
        <div style={{ marginBottom: '24px' }}>
          <span
            style={{
              background: 'var(--primary)',
              border: '1.5px solid var(--ink)',
              borderRadius: '999px',
              padding: '4px 12px',
              fontSize: '11px',
              fontWeight: 900,
              textTransform: 'uppercase',
            }}
          >
            RELATIONAL DATA MODEL &amp; ACID CONSTRAINTS
          </span>
          <h3
            className="font-display"
            style={{ fontSize: '24px', fontWeight: 900, marginTop: '10px', textTransform: 'uppercase' }}
          >
            Production Database Schema &amp; Table Design
          </h3>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#666', marginTop: '4px' }}>
            Engineered for strict consistency, row-level concurrency locking, and zero balance drift.
          </p>
        </div>

        <div className="schema-tables-grid">
          {schemaTables.map((table, tIdx) => (
            <div key={tIdx} className="schema-table-card">
              <div className="schema-card-header" style={{ backgroundColor: table.color }}>
                <span>{table.name}</span>
                <span
                  style={{
                    background: 'white',
                    border: '1.5px solid var(--ink)',
                    borderRadius: '999px',
                    padding: '2px 8px',
                    fontSize: '10px',
                  }}
                >
                  {table.badge}
                </span>
              </div>
              <div className="schema-columns-list">
                {table.columns.map((col, cIdx) => (
                  <div key={cIdx} className="schema-col-item">
                    <span className="col-name">{col.name}</span>
                    <span className="col-type-tag">{col.type}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TAB 3: Production Code */}
      <div className={`tab-panel ${activeTab === 'code' ? 'is-active' : ''}`}>
        <div className="code-container">
          <div className="code-header-bar">
            <div>
              <span className="code-path">{codePath}</span>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8', marginTop: '6px' }}>
                {codeNote}
              </div>
            </div>
            <button type="button" onClick={copyCode} className="copy-code-btn">
              <span>📋</span>
              <span>Copy Code</span>
            </button>
          </div>
          <pre className="code-pre">
            <code>{codeSnippet}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
