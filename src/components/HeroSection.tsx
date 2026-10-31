import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';

interface HeroSectionProps {
  onExploreWorks?: (category?: '오리지널' | '기획', format?: 'SHORT FORM' | 'LONG FORM') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreWorks }) => {
  const { projects } = useStudio();
  const [, setHoveredBubble] = useState<string | null>(null);

  // Exactly two curated work items
  // 1. Left Thumbnail: User requested image for Planning project
  const leftProject = {
    ...(projects[0] || {}),
    id: projects[0]?.id || 'featured-gen-g',
    title: projects[0]?.title || 'GEN.G ESPORTS CINEMA',
    titleKo: projects[0]?.titleKo || '젠지 이스포츠 프로덕션',
    coverImage: '/assets/aistudio/IMG_6013_5dda45fa.JPG',
  };

  // 2. Right Thumbnail: 아카이브의 오리지널 유튜브 영상 (orig-long-1)
  const originalYouTubeProject = projects.find(
    (p) => p.id === 'orig-long-1' || (p.sectionCategory === '오리지널' && p.contentFormat === 'LONG FORM')
  );
  const rightProject = originalYouTubeProject || projects[1] || null;

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen h-[100vh] flex items-center justify-center overflow-hidden bg-black select-none"
    >
      {/* Modern Stylized Minimal Daisy Line Art (Organic, Gentle, Cute & Asymmetric) */}
      <div className="absolute inset-0 bg-black pointer-events-none overflow-hidden select-none">
        
        {/* 1. Top-Right: Dynamic Organic Main Daisy (Large, tilted at 24deg with slight perspective) */}
        <div 
          className="absolute -top-12 -right-12 sm:-top-16 sm:-right-16 lg:-top-20 lg:-right-20 w-[300px] sm:w-[420px] lg:w-[490px] h-[300px] sm:h-[420px] lg:h-[490px] pointer-events-none opacity-40 transition-opacity duration-1000"
          style={{ transform: 'rotate(22deg)' }}
        >
          <svg
            viewBox="0 0 300 300"
            className="w-full h-full animate-spin-slow"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Center pistil / disc: Soft pillowy organic circle */}
            <circle
              cx="150"
              cy="150"
              r="24"
              stroke="rgba(255, 230, 0, 0.7)"
              strokeWidth="1.5"
              fill="rgba(255, 230, 0, 0.08)"
            />
            <circle
              cx="150"
              cy="150"
              r="10"
              fill="rgba(255, 230, 0, 0.25)"
            />

            {/* Exactly 8 clean, cute rounded daisy petals with gentle natural curves */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={i} transform={`rotate(${angle} 150 150)`}>
                {/* Cute rounded soft petal */}
                <path
                  d="M 141 127 C 134 98, 135 52, 150 48 C 165 52, 166 98, 159 127"
                  stroke="rgba(255, 255, 255, 0.35)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* 1-B. Top-Right Companion: Tiny floating baby daisy accent */}
        <div 
          className="absolute top-24 right-44 sm:top-28 sm:right-64 lg:top-36 lg:right-96 w-16 sm:w-20 h-16 sm:h-20 pointer-events-none opacity-25"
          style={{ transform: 'rotate(-15deg)' }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full animate-spin-reverse-slow"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="8"
              stroke="rgba(255, 230, 0, 0.6)"
              strokeWidth="1.2"
              fill="rgba(255, 230, 0, 0.1)"
            />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <g key={i} transform={`rotate(${angle} 50 50)`}>
                <path
                  d="M 46 42 C 43 32, 44 16, 50 15 C 56 16, 57 32, 54 42"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* 2. Bottom-Left: Subtly tilted, smaller cute daisy (Tilted at -35deg, scale-adjusted) */}
        <div 
          className="absolute -bottom-10 -left-10 sm:-bottom-14 sm:-left-14 lg:-bottom-16 lg:-left-16 w-[230px] sm:w-[320px] lg:w-[370px] h-[230px] sm:h-[320px] lg:h-[370px] pointer-events-none opacity-35 transition-opacity duration-1000"
          style={{ transform: 'rotate(-32deg)' }}
        >
          <svg
            viewBox="0 0 300 300"
            className="w-full h-full animate-spin-reverse-slow"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Center pistil / disc */}
            <circle
              cx="150"
              cy="150"
              r="22"
              stroke="rgba(255, 230, 0, 0.65)"
              strokeWidth="1.5"
              fill="rgba(255, 230, 0, 0.08)"
            />
            <circle
              cx="150"
              cy="150"
              r="9"
              fill="rgba(255, 230, 0, 0.2)"
            />

            {/* Exactly 8 clean, cute rounded daisy petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={i} transform={`rotate(${angle} 150 150)`}>
                <path
                  d="M 141 128 C 134 100, 135 55, 150 51 C 165 55, 166 100, 159 128"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            ))}
          </svg>
        </div>

      </div>

      {/* Floating Water Balloon Work Previews with Initial Burst Spread from Center */}
      <div className="absolute inset-0 w-full h-full max-w-[1800px] mx-auto pointer-events-none overflow-hidden">
        {/* 1. Left Floating Water Balloon Work Item (Pushed to safe upper-left perimeter) */}
        {leftProject && (
          <div
            className="absolute top-[12%] sm:top-[14%] lg:top-[16%] left-[3%] sm:left-[5%] lg:left-[8%] z-10 hover:z-30 pointer-events-auto cursor-pointer animate-spread-left"
          >
            <div
              className="animate-float-1 transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) hover:scale-120 group"
              style={{ '--bubble-rot': '-6deg' } as React.CSSProperties}
              onClick={() => {
                if (onExploreWorks) {
                  onExploreWorks('기획');
                }
              }}
              onMouseEnter={() => setHoveredBubble('left')}
              onMouseLeave={() => setHoveredBubble(null)}
            >
              {/* Main Water Balloon Capsule with inner zoom effect */}
              <div className="w-[190px] sm:w-[260px] lg:w-[320px] aspect-[16/10] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-zinc-950 border border-white/15 hover:border-white/50 water-balloon transition-all duration-500 shadow-2xl">
                <img
                  src={leftProject.coverImage}
                  alt={leftProject.title}
                  className="w-full h-full object-cover filter brightness-[0.62] group-hover:brightness-110 group-hover:scale-115 transition-all duration-700 ease-out"
                />
                {/* Bubble Specular Shine */}
                <div className="absolute inset-0 rounded-[32px] ring-1 ring-inset ring-white/15 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-50 group-hover:opacity-95 transition-opacity duration-500" />
              </div>
            </div>
          </div>
        )}

        {/* 2. Right Floating Water Balloon Work Item (Pushed to safe lower-right perimeter) */}
        {rightProject && (
          <div
            className="absolute bottom-[12%] sm:bottom-[14%] lg:bottom-[16%] right-[3%] sm:right-[5%] lg:right-[8%] z-10 hover:z-30 pointer-events-auto cursor-pointer animate-spread-right"
          >
            <div
              className="animate-float-2 transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) hover:scale-120 group"
              style={{ '--bubble-rot': '6deg' } as React.CSSProperties}
              onClick={() => {
                if (onExploreWorks) {
                  onExploreWorks('오리지널', 'LONG FORM');
                }
              }}
              onMouseEnter={() => setHoveredBubble('right')}
              onMouseLeave={() => setHoveredBubble(null)}
            >
              {/* Main Water Balloon Capsule with inner zoom effect */}
              <div className="w-[190px] sm:w-[260px] lg:w-[320px] aspect-[16/10] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-zinc-950 border border-white/15 hover:border-white/50 water-balloon transition-all duration-500 shadow-2xl">
                <img
                  src={rightProject.coverImage}
                  alt={rightProject.title}
                  className="w-full h-full object-cover filter brightness-[0.62] group-hover:brightness-110 group-hover:scale-115 transition-all duration-700 ease-out"
                />
                {/* Bubble Specular Shine */}
                <div className="absolute inset-0 rounded-[32px] ring-1 ring-inset ring-white/15 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-50 group-hover:opacity-95 transition-opacity duration-500" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Center Core Slogan (Isolated with clean z-index and max-w-2xl to prevent any text collisions) */}
      <div className="relative z-20 text-center px-6 max-w-2xl lg:max-w-3xl mx-auto pointer-events-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-medium font-sans tracking-tight text-white leading-snug">
          Where{' '}
          <span className="gradient-text-vivid font-semibold">
            imagination
          </span>{' '}
          meets execution
        </h1>
      </div>
    </section>
  );
};
