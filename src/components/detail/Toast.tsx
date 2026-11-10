import React from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export default function Toast({ message, isVisible }: ToastProps) {
  return (
    <div id="toastBanner" className={`toast-notice ${isVisible ? 'is-active' : ''}`}>
      <span
        style={{
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: 'var(--ink)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 900,
        }}
      >
        ✓
      </span>
      <span id="toastText">{message}</span>
    </div>
  );
}

