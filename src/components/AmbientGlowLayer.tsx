import React from 'react';

/**
 * AmbientGlowLayer Component
 * Renders multiple subtle, layered circular & elliptical ring glow rings
 * in the background with heavy blur and low opacity to create an elegant,
 * luxury dark atmospheric space without interfering with content or clicking.
 */
export const AmbientGlowLayer: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Deep Core Ambient Orb (Soft Warm Gold / Amber Accent, highly diffused) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] lg:w-[1100px] h-[700px] sm:h-[900px] lg:h-[1100px] rounded-full opacity-[0.035] filter blur-[140px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--accent-color, #FFE600) 0%, rgba(255, 230, 0, 0.1) 40%, transparent 70%)',
        }}
      />

      {/* 2. Concentric Outer Elliptical Ring 1 (Thin subtle luminous perimeter) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] lg:w-[1050px] h-[520px] sm:h-[680px] lg:h-[840px] rounded-[50%] border border-white/[0.04] opacity-50 filter blur-[1px] pointer-events-none"
        style={{
          boxShadow: '0 0 80px 2px rgba(255, 255, 255, 0.03), inset 0 0 60px 2px rgba(255, 255, 255, 0.02)',
        }}
      />

      {/* 3. Concentric Mid Elliptical Ring 2 (Warm accent tinted subtle ring) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[640px] lg:w-[780px] h-[380px] sm:h-[500px] lg:h-[620px] rounded-[50%] border border-[var(--accent-color,#FFE600)]/[0.05] opacity-60 filter blur-[1.5px] pointer-events-none"
        style={{
          boxShadow: '0 0 90px 4px rgba(255, 230, 0, 0.04), inset 0 0 70px 4px rgba(255, 230, 0, 0.02)',
        }}
      />

      {/* 4. Concentric Inner Circular Ring 3 (Ethereal fine glow) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[420px] lg:w-[520px] h-[300px] sm:h-[420px] lg:h-[520px] rounded-full border border-white/[0.045] opacity-40 filter blur-[2px] pointer-events-none"
        style={{
          boxShadow: '0 0 50px 2px rgba(255, 255, 255, 0.03)',
        }}
      />

    </div>
  );
};
