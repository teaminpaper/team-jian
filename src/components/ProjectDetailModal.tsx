import React, { useEffect, useRef, useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { X, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface ProjectDetailModalProps {
  onInquire?: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = () => {
  const { activeProject, setActiveProject } = useStudio();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveProject]);

  if (!activeProject) return null;

  // Detect YouTube, Vimeo, or Instagram embeds
  const isYouTube = activeProject.videoUrl?.includes('youtube.com') || activeProject.videoUrl?.includes('youtu.be');
  const isVimeo = activeProject.videoUrl?.includes('vimeo.com');
  const isInstagram = activeProject.videoUrl?.includes('instagram.com/reel/') || activeProject.videoUrl?.includes('instagram.com/p/');
  const isVertical = activeProject.aspect === '9:16' || activeProject.contentFormat === 'SHORT FORM' || isInstagram;

  const getInstagramEmbedUrl = (url: string) => {
    // Extract shortcode from /reel/DclCWHCNV2_/ or /p/...
    const match = url.match(/\/reel\/([A-Za-z0-9_-]+)/) || url.match(/\/p\/([A-Za-z0-9_-]+)/);
    if (match && match[1]) {
      return `https://www.instagram.com/reel/${match[1]}/embed/`;
    }
    return url;
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    if (url.includes('watch?v=')) {
      const id = url.split('watch?v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    return url;
  };

  const getVimeoEmbedUrl = (url: string) => {
    const parts = url.split('vimeo.com/');
    const id = parts[1]?.split('?')[0];
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  };

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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      {/* Background click listener */}
      <div
        className="fixed inset-0 cursor-pointer"
        onClick={() => setActiveProject(null)}
      />

      {/* Floating Minimal Close Button (Top-Right, Icon Only, No Text) */}
      <button
        onClick={() => setActiveProject(null)}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2.5 text-zinc-400 hover:text-white bg-black/60 hover:bg-black/80 border border-white/10 rounded-full transition-all cursor-pointer shadow-lg"
        aria-label="닫기"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Main Pure Video Viewport - Only Video, Zero Text */}
      <div
        className={`relative z-10 w-full mx-auto bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl ${
          isVertical
            ? 'max-w-[440px] sm:max-w-[480px] aspect-[9/16] h-[90vh] max-h-[880px]'
            : 'max-w-6xl aspect-video max-h-[88vh]'
        }`}
      >
        {isInstagram ? (
          <iframe
            src={getInstagramEmbedUrl(activeProject.videoUrl)}
            title="Video Player"
            className="w-full h-full border-0 bg-black"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : isYouTube ? (
          <iframe
            src={getYouTubeEmbedUrl(activeProject.videoUrl)}
            title="Video Player"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : isVimeo ? (
          <iframe
            src={getVimeoEmbedUrl(activeProject.videoUrl)}
            title="Video Player"
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : activeProject.videoUrl ? (
          <video
            ref={videoRef}
            src={activeProject.videoUrl}
            poster={activeProject.coverImage}
            autoPlay
            loop
            controls
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={activeProject.coverImage}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};
