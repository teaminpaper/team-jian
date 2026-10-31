import React, { useEffect, useRef, useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

export const ShowreelModal: React.FC = () => {
  const { isShowreelOpen, setIsShowreelOpen, config } = useStudio();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsShowreelOpen(false);
      }
    };
    if (isShowreelOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isShowreelOpen, setIsShowreelOpen]);

  if (!isShowreelOpen) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/98 flex flex-col justify-between p-4 md:p-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="text-sm font-black font-display tracking-tight text-white">
            {config.name}
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-xs font-mono text-[var(--accent-color,#FFE600)] font-bold">
            2026 OFFICIAL SHOWREEL (4K MASTER)
          </span>
        </div>

        <button
          onClick={() => setIsShowreelOpen(false)}
          className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="닫기 (ESC)"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Video Viewport */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        <div className="relative w-full max-w-6xl aspect-video bg-black border border-white/10 shadow-2xl">
          <video
            ref={videoRef}
            src={config.heroVideoUrl}
            poster={config.heroPoster}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Central Overlay Click to Play/Pause */}
          <div
            onClick={togglePlay}
            className="absolute inset-0 cursor-pointer flex items-center justify-center"
          >
            {!isPlaying && (
              <div className="w-20 h-20 rounded-full bg-[var(--accent-color,#FFE600)]/90 flex items-center justify-center text-black shadow-2xl">
                <Play className="w-8 h-8 fill-black ml-1" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 text-white hover:text-[var(--accent-color,#FFE600)] transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 text-white hover:text-[var(--accent-color,#FFE600)] transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[var(--accent-color,#FFE600)]" />}
            <span>{isMuted ? 'UNMUTE' : 'MUTE'}</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-zinc-500">FORMAT: 2.39:1 CINEMASCOPE 4K UHD</span>
          <button
            onClick={handleFullscreen}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <Maximize className="w-3.5 h-3.5" />
            <span>FULLSCREEN</span>
          </button>
        </div>
      </div>
    </div>
  );
};
