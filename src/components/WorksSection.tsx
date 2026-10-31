import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { Project } from '../types';
import { Play } from 'lucide-react';

interface WorksSectionProps {
  initialCategory?: '기획' | '오리지널';
  initialFormat?: 'SHORT FORM' | 'LONG FORM';
}

export const WorksSection: React.FC<WorksSectionProps> = ({ 
  initialCategory = '기획',
  initialFormat = 'SHORT FORM'
}) => {
  const { projects, setActiveProject } = useStudio();
  // Strictly two categories on the left: '기획' and '오리지널'
  const [selectedCategory, setSelectedCategory] = useState<'기획' | '오리지널'>(initialCategory);
  // Right-side format filter: strictly 'SHORT FORM' or 'LONG FORM'
  const [selectedFormat, setSelectedFormat] = useState<'SHORT FORM' | 'LONG FORM'>(initialFormat);

  // React to prop change if any
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  React.useEffect(() => {
    if (initialFormat) {
      setSelectedFormat(initialFormat);
    }
  }, [initialFormat]);

  // Filter projects by category
  const categoryProjects = projects.filter((p) => {
    if (selectedCategory === '기획') {
      return p.sectionCategory === '기획' || p.category === '기획';
    }
    return p.sectionCategory === '오리지널' || p.category === '오리지널' || !p.sectionCategory;
  });

  // Filter strictly by format (SHORT FORM vs LONG FORM)
  const displayedProjects = categoryProjects.filter((p) => {
    return p.contentFormat === selectedFormat;
  });

  // Calculate counts for categories
  const originalCount = projects.filter(
    (p) => p.sectionCategory === '오리지널' || p.category === '오리지널' || !p.sectionCategory
  ).length;

  const planCount = projects.filter(
    (p) => p.sectionCategory === '기획' || p.category === '기획'
  ).length;

  // Counts for active category format tabs
  const shortCount = categoryProjects.filter((p) => p.contentFormat === 'SHORT FORM').length;
  const longCount = categoryProjects.filter((p) => p.contentFormat === 'LONG FORM').length;

  return (
    <section id="works" className="min-h-screen py-20 md:py-24 px-6 md:px-12 bg-black/85 backdrop-blur-[2px] select-none relative z-10">
      <div className="max-w-[1850px] mx-auto flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
        
        {/* ========================================================
            [LEFT COLUMN] Clean Vertical Category Navigation: 기획 / 오리지널 ONLY
            ======================================================== */}
        <aside className="w-full md:w-44 lg:w-48 shrink-0 flex flex-row md:flex-col gap-6 md:gap-7 pt-1 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
          {/* Category 1: 기획 */}
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('기획');
              setSelectedFormat('SHORT FORM');
            }}
            className="text-left group cursor-pointer focus:outline-none transition-all"
          >
            <div className="flex items-center gap-2">
              <span
                className={`text-lg sm:text-xl font-bold font-display transition-colors ${
                  selectedCategory === '기획'
                    ? 'text-white'
                    : 'text-zinc-500 group-hover:text-zinc-300'
                }`}
              >
                기획
              </span>
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded-full border transition-colors ${
                  selectedCategory === '기획'
                    ? 'bg-zinc-800 text-white border-white/20'
                    : 'bg-zinc-950 text-zinc-600 border-zinc-800'
                }`}
              >
                {planCount}
              </span>
            </div>
          </button>

          {/* Category 2: 오리지널 */}
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('오리지널');
              setSelectedFormat('SHORT FORM');
            }}
            className="text-left group cursor-pointer focus:outline-none transition-all"
          >
            <div className="flex items-center gap-2">
              <span
                className={`text-lg sm:text-xl font-bold font-display transition-colors ${
                  selectedCategory === '오리지널'
                    ? 'text-white'
                    : 'text-zinc-500 group-hover:text-zinc-300'
                }`}
              >
                오리지널
              </span>
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded-full border transition-colors ${
                  selectedCategory === '오리지널'
                    ? 'bg-zinc-800 text-white border-white/20'
                    : 'bg-zinc-950 text-zinc-600 border-zinc-800'
                }`}
              >
                {originalCount}
              </span>
            </div>
          </button>
        </aside>

        {/* ========================================================
            [RIGHT COLUMN] Category View with Top Format Selector & Video Grid
            - 기획 선택 시: 상단에 [숏폼] / [롱폼]
            - 오리지널 선택 시: 상단에 [인스타그램] / [유튜브]
            ======================================================== */}
        <div className="flex-1 w-full space-y-6">
          {/* Top Format Selector Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                {selectedFormat === 'SHORT FORM' ? '인스타그램' : '유튜브'}
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-white/10">
                {displayedProjects.length}
              </span>
            </div>

            {/* Format Filter Selection Buttons: [인스타그램] / [유튜브] */}
            <div className="flex items-center gap-2 bg-zinc-950 p-1 rounded-full border border-white/10 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setSelectedFormat('SHORT FORM')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                  selectedFormat === 'SHORT FORM'
                    ? 'bg-[var(--accent-color,#FFE600)] text-black font-bold border-[var(--accent-color,#FFE600)] shadow-md'
                    : 'bg-transparent text-zinc-400 border-transparent hover:text-white'
                }`}
              >
                인스타그램 ({shortCount})
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormat('LONG FORM')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                  selectedFormat === 'LONG FORM'
                    ? 'bg-[var(--accent-color,#FFE600)] text-black font-bold border-[var(--accent-color,#FFE600)] shadow-md'
                    : 'bg-transparent text-zinc-400 border-transparent hover:text-white'
                }`}
              >
                유튜브 ({longCount})
              </button>
            </div>
          </div>

          {/* Large, Prominent Video Cards Grid (1~3 Columns for Bigger View) */}
          {displayedProjects.length === 0 ? (
            <div className="py-24 text-center border border-white/10 bg-zinc-950/40 rounded-2xl">
              <p className="text-zinc-400 text-sm">해당 포맷에 등록된 작업물이 없습니다.</p>
            </div>
          ) : (
            <div
              className={`grid gap-4 sm:gap-5 lg:gap-6 ${
                selectedFormat === 'SHORT FORM'
                  ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
                  : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
              }`}
            >
              {displayedProjects.map((project: Project) => (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className="group cursor-pointer flex flex-col space-y-3"
                >
                  {/* 9:16 Vertical for Instagram Short Form vs 16:9 for YouTube Long Form */}
                  <div
                    className={`relative w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 water-balloon group-hover:border-white/30 transition-all duration-300 shadow-xl ${
                      selectedFormat === 'SHORT FORM' || project.aspect === '9:16'
                        ? 'aspect-[9/16] w-full mx-auto'
                        : 'aspect-video'
                    }`}
                  >
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter brightness-95 group-hover:brightness-105 transition-all duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Play Button on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30 backdrop-blur-[2px]">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[var(--accent-color,#FFE600)] flex items-center justify-center text-black shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="w-5 h-5 fill-black ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
