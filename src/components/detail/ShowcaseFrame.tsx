import React from 'react';

interface ShowcaseFrameProps {
  previewImage: string;
  projectName: string;
  liveUrl: string;
}

export default function ShowcaseFrame({ previewImage, projectName, liveUrl }: ShowcaseFrameProps) {
  return (
    <section className="preview-showcase-section">
      <div className="preview-browser-frame">
        <div className="browser-bar">
          <div className="os-dots-wrap">
            <span className="os-dot red"></span>
            <span className="os-dot yellow"></span>
            <span className="os-dot green"></span>
          </div>
          <div className="browser-address-input" id="browserAddressBar">
            {liveUrl || 'https://petrosgdev.pages.dev'}
          </div>
          <div style={{ fontSize: '12px', fontWeight: 900, color: '#666' }}>● SECURE</div>
        </div>
        <div className="browser-canvas">
          <img
            id="detailPreviewImage"
            src={previewImage}
            alt={`${projectName} Interface Preview`}
          />
        </div>
      </div>
    </section>
  );
}

