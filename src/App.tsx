import React, { useState } from 'react';
import { StudioProvider, useStudio } from './context/StudioContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { WorksSection } from './components/WorksSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ShowreelModal } from './components/ShowreelModal';
import { AmbientGlowLayer } from './components/AmbientGlowLayer';

const StudioAppContent: React.FC = () => {
  const { config } = useStudio();
  const [currentTab, setCurrentTab] = useState<'home' | 'works' | 'contact'>('home');
  const [targetWorksCategory, setTargetWorksCategory] = useState<'오리지널' | '기획'>('기획');
  const [targetWorksFormat, setTargetWorksFormat] = useState<'SHORT FORM' | 'LONG FORM'>('SHORT FORM');
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('');

  const handleTabChange = (
    tab: 'home' | 'works' | 'contact',
    category?: '오리지널' | '기획',
    format?: 'SHORT FORM' | 'LONG FORM'
  ) => {
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
      {/* Ambient Deep Ring Glow Layer for subpages (Works, Contact) */}
      {currentTab !== 'home' && <AmbientGlowLayer />}

      {/* Live Studio Website */}
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

          {/* Modals */}
          <ProjectDetailModal onInquire={handleInquireFromProject} />
          <ShowreelModal />
        </main>
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
