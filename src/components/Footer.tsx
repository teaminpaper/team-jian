import React from 'react';
import { useStudio } from '../context/StudioContext';
import { ArrowUp, Instagram, Youtube, Video, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { config } = useStudio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/10 text-zinc-400 py-16 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-12">
        {/* Top: Brand wordmark & Back to Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-2">
            <div className="text-2xl font-black font-display text-white tracking-tighter">
              {config.name}
            </div>
            <p className="text-zinc-500 text-[11px]">
              {config.sloganKo}
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-zinc-400 hover:text-[var(--accent-color,#FFE600)] transition-colors cursor-pointer self-start sm:self-auto py-2"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Middle: Studio Info & Social Channels */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-8 space-y-2 text-zinc-400 text-xs leading-relaxed font-sans">
            <div>
              <span className="text-zinc-300 font-semibold">{config.name} (인페이퍼 스튜디오)</span> · 대표자: {config.contactInfo.ceo} · 사업자등록번호: {config.contactInfo.businessNumber}
            </div>
            <div>
              주소: {config.contactInfo.address}
            </div>
            <div>
              대표전화: {config.contactInfo.phone} · 공식 이메일: {config.contactInfo.email}
            </div>
            <div className="text-zinc-600 text-[11px] pt-1 font-mono">
              통신판매업 신고번호: 제 2026-서울강남-0921호 · 영상물 제작 및 배급업 정식 등록 사업체
            </div>
          </div>

          <div className="md:col-span-4 flex flex-wrap items-center gap-4 md:justify-end">
            {config.socialLinks.instagram && (
              <a
                href={config.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-white/10 text-zinc-400 hover:text-white hover:border-white transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {config.socialLinks.vimeo && (
              <a
                href={config.socialLinks.vimeo}
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-white/10 text-zinc-400 hover:text-white hover:border-white transition-colors"
                title="Vimeo"
              >
                <Video className="w-4 h-4" />
              </a>
            )}
            {config.socialLinks.youtube && (
              <a
                href={config.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-white/10 text-zinc-400 hover:text-white hover:border-white transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            )}
            {config.socialLinks.linkedin && (
              <a
                href={config.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-white/10 text-zinc-400 hover:text-white hover:border-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-zinc-600 text-[11px]">
          <div>
            © 2026 {config.name}. ALL RIGHTS RESERVED.
          </div>
          <div>
            DESIGNED FOR CREATIVE FILMMAKERS &amp; MEDIA STUDIOS
          </div>
        </div>
      </div>
    </footer>
  );
};
