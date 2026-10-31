import React, { useState, useEffect } from 'react';
import { useStudio } from '../context/StudioContext';
import { SlidersHorizontal, Eye, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'works' | 'contact' | 'about';
  onNavigate: (tab: 'home' | 'works' | 'contact' | 'about') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate }) => {
  const { config, isAdmin, setIsAdmin } = useStudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab: 'home' | 'works' | 'contact' | 'about') => {
    setMobileMenuOpen(false);
    onNavigate(tab);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
            aria-label="INPAPER STUDIO 홈으로 이동"
          >
            <span className="text-sm sm:text-base font-bold tracking-wider uppercase text-white font-sans group-hover:text-[var(--accent-color,#FFE600)] transition-colors whitespace-nowrap shrink-0">
              INPAPER STUDIO
            </span>
            <span className="hidden sm:inline text-[9px] font-mono tracking-widest text-zinc-500 uppercase font-normal">
              PRODUCTION
            </span>
            <span
              className="w-1 h-1 rounded-none transition-transform group-hover:scale-125"
              style={{ backgroundColor: config.accentColor || '#FFE600' }}
            />
          </button>

          {/* Zone 2: 4-5 clean single-line text navigation links with active state */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest font-semibold uppercase">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors cursor-pointer whitespace-nowrap shrink-0 py-1 ${
                currentTab === 'home' ? 'text-white' : 'text-zinc-500 hover:text-white'
              }`}
            >
              HOME
            </button>
            <button
              onClick={() => handleNavClick('works')}
              className={`transition-colors cursor-pointer whitespace-nowrap shrink-0 py-1 ${
                currentTab === 'works' ? 'text-white' : 'text-zinc-500 hover:text-white'
              }`}
            >
              ARCHIVE
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors cursor-pointer whitespace-nowrap shrink-0 py-1 ${
                currentTab === 'about' ? 'text-white' : 'text-zinc-500 hover:text-white'
              }`}
            >
              ABOUT
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`transition-colors cursor-pointer whitespace-nowrap shrink-0 py-1 ${
                currentTab === 'contact' ? 'text-white' : 'text-zinc-500 hover:text-white'
              }`}
            >
              CONTACT
            </button>
          </nav>

          {/* Zone 3: Primary action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Admin CMS Switch Button */}
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-none transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 border ${
                isAdmin
                  ? 'bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700'
                  : 'bg-[var(--accent-color,#FFE600)] text-black border-transparent hover:brightness-110 shadow-sm'
              }`}
            >
              {isAdmin ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>사이트 보기</span>
                </>
              ) : (
                <>
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>관리자 대시보드</span>
                </>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none cursor-pointer"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#080808]/98 backdrop-blur-xl pt-24 px-8 pb-10 flex flex-col justify-between md:hidden">
          <div className="space-y-6">
            <div className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Navigation</div>
            <div className="flex flex-col gap-4 text-2xl font-bold font-display">
              <button
                onClick={() => handleNavClick('home')}
                className={`text-left py-2 transition-colors flex items-center justify-between ${
                  currentTab === 'home' ? 'text-[var(--accent-color,#FFE600)] font-black' : 'text-white'
                }`}
              >
                <span>HOME (홈)</span>
                <ArrowUpRight className="w-5 h-5 text-zinc-500" />
              </button>
              <button
                onClick={() => handleNavClick('works')}
                className={`text-left py-2 transition-colors flex items-center justify-between ${
                  currentTab === 'works' ? 'text-[var(--accent-color,#FFE600)] font-black' : 'text-white'
                }`}
              >
                <span>ARCHIVE (아카이브)</span>
                <ArrowUpRight className="w-5 h-5 text-zinc-500" />
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className={`text-left py-2 transition-colors flex items-center justify-between ${
                  currentTab === 'about' ? 'text-[var(--accent-color,#FFE600)] font-black' : 'text-white'
                }`}
              >
                <span>ABOUT (소개)</span>
                <ArrowUpRight className="w-5 h-5 text-zinc-500" />
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className={`text-left py-2 transition-colors flex items-center justify-between ${
                  currentTab === 'contact' ? 'text-[var(--accent-color,#FFE600)] font-black' : 'text-white'
                }`}
              >
                <span>CONTACT (제작 문의)</span>
                <ArrowUpRight className="w-5 h-5 text-zinc-500" />
              </button>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6 space-y-4">
            <div className="text-xs text-zinc-400">
              <div>{config.contactInfo.email}</div>
              <div className="text-zinc-600 font-mono mt-1">{config.contactInfo.phone}</div>
            </div>
            <button
              onClick={() => {
                setIsAdmin(!isAdmin);
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center text-xs font-bold uppercase tracking-wider bg-[var(--accent-color,#FFE600)] text-black"
            >
              {isAdmin ? '실제 웹사이트 화면 보기' : '관리자 대시보드 바로가기'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
