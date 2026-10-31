import React, { useState } from 'react';
import { StudioProvider, useStudio } from './context/StudioContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { WorksSection } from './components/WorksSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ShowreelModal } from './components/ShowreelModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AmbientGlowLayer } from './components/AmbientGlowLayer';
import { SlidersHorizontal } from 'lucide-react';

const StudioAppContent: React.FC = () => {
  const { isAdmin, setIsAdmin, config } = useStudio();
  const [currentTab, setCurrentTab] = useState<'home' | 'works' | 'contact' | 'about'>('home');
  const [targetWorksCategory, setTargetWorksCategory] = useState<'오리지널' | '기획'>('기획');
  const [targetWorksFormat, setTargetWorksFormat] = useState<'SHORT FORM' | 'LONG FORM'>('SHORT FORM');
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('');

  const handleTabChange = (
    tab: 'home' | 'works' | 'contact' | 'about',
    category?: '오리지널' | '기획',
    format?: 'SHORT FORM' | 'LONG FORM'
  ) => {
    if (isAdmin) {
      setIsAdmin(false);
    }
    if (category) {
      setTargetWorksCategory(category);
    }
    if (format) {
      setTargetWorksFormat(format);
    } else {
      setTargetWorksFormat('SHORT FORM');
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInquireFromProject = (projectTitle: string) => {
    setSelectedServiceForInquiry(`프로젝트 스타일 참고: ${projectTitle}`);
    setCurrentTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInquireService = (serviceName: string) => {
    setSelectedServiceForInquiry(serviceName);
    setCurrentTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen text-white font-sans selection:bg-[var(--accent-color,#FFE600)] selection:text-black transition-colors relative"
      style={{
        backgroundColor: config.bgTone || '#080808',
      }}
    >
      {/* Ambient Deep Ring Glow Layer for subpages (Works, Contact, About) */}
      {currentTab !== 'home' && <AmbientGlowLayer />}

      {/* If Admin Mode is active, display the full-featured Admin CMS */}
      {isAdmin ? (
        <AdminDashboard />
      ) : (
        /* Live Studio Website */
        <main className={`relative ${currentTab === 'home' ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
          <Navbar currentTab={currentTab} onNavigate={(tab) => handleTabChange(tab)} />
          
          {/* HOME: Pure single cover page with floating water balloon previews */}
          {currentTab === 'home' && (
            <HeroSection
              onExploreWorks={(cat, fmt) => handleTabChange('works', cat || '기획', fmt)}
            />
          )}

          {/* WORKS: Direct Portfolio Gallery & Instant Video Playback */}
          {currentTab === 'works' && (
            <div className="min-h-screen">
              <WorksSection
                initialCategory={targetWorksCategory}
                initialFormat={targetWorksFormat}
              />
            </div>
          )}

          {/* CONTACT: Clean Single-Page Reference View */}
          {currentTab === 'contact' && (
            <div className="h-screen overflow-hidden">
              <ContactSection />
            </div>
          )}

          {/* ABOUT: Philosophy & Vision Page */}
          {currentTab === 'about' && (
            <div className="min-h-screen">
              <AboutSection />
            </div>
          )}

          {/* Modals */}
          <ProjectDetailModal onInquire={handleInquireFromProject} />
          <ShowreelModal />

          {/* Floating Admin Quick Access Badge on bottom-right */}
          <div className="fixed bottom-6 right-6 z-30">
            <button
              onClick={() => setIsAdmin(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-black/80 hover:bg-black text-white hover:text-[var(--accent-color,#FFE600)] border border-white/20 hover:border-[var(--accent-color,#FFE600)] text-xs font-mono backdrop-blur-md shadow-2xl transition-all cursor-pointer group"
              title="관리자 대시보드 열기"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--accent-color,#FFE600)] group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-semibold">CMS 관리자</span>
            </button>
          </div>
        </main>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StudioProvider>
      <StudioAppContent />
    </StudioProvider>
  );
}
