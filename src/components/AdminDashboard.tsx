import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { Project, ProjectCategory, ProductionCredit } from '../types';
import {
  Film,
  Palette,
  Globe,
  Share2,
  Inbox,
  Database,
  Plus,
  Trash2,
  Edit3,
  Check,
  Eye,
  ArrowLeft,
  Search,
  ExternalLink,
  Sparkles,
  Save,
  RotateCcw,
  Copy,
  AlertCircle
} from 'lucide-react';

const MEDIA_LIBRARY = [
  { name: 'Shooting Studio Set (IMG_6013)', path: '/assets/aistudio/IMG_6013_5dda45fa.JPG' },
  { name: 'Showreel Film Set (Cinema ARRI)', path: '/src/assets/images/hero_showreel_poster_1793321553060.jpg' },
  { name: 'Lucid Horizon (Tech Commercial)', path: '/src/assets/images/project_commercial_tech_1793321553666.jpg' },
  { name: 'Midnight Reverie (Amber Music Video)', path: '/src/assets/images/project_musicvideo_neon_1793321554630.jpg' },
  { name: 'Sculptural Fluidity (Fashion Editorial)', path: '/src/assets/images/project_fashion_film_1793321554902.jpg' },
  { name: 'Heritage of Lacquer (Artisan Documentary)', path: '/src/assets/images/project_documentary_1793321556160.jpg' },
];

const ACCENT_COLOR_PRESETS = [
  { label: 'Electric Yellow', value: '#FFE600' },
  { label: 'Vivid Gold', value: '#FACC15' },
  { label: 'Amber Flame', value: '#F59E0B' },
  { label: 'Cyber Lemon', value: '#EAB308' },
  { label: 'Acid Lime', value: '#CCFF00' },
];

const BG_TONE_PRESETS = [
  { label: 'Onyx Black', value: '#080808' },
  { label: 'Pure Jet Black', value: '#000000' },
  { label: 'Deep Charcoal', value: '#121212' },
  { label: 'Midnight Film Slate', value: '#0f1015' },
];

export const AdminDashboard: React.FC = () => {
  const {
    projects,
    config,
    seo,
    inquiries,
    setIsAdmin,
    addProject,
    updateProject,
    deleteProject,
    updateConfig,
    updateSeo,
    updateInquiryStatus,
    deleteInquiry,
    resetToDefaults,
    exportJSON,
    importJSON,
  } = useStudio();

  const [activeTab, setActiveTab] = useState<'works' | 'theme' | 'studio' | 'seo' | 'inquiries' | 'backup'>('works');

  // Project Editor state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [projectForm, setProjectForm] = useState<Omit<Project, 'id'>>({
    title: '',
    titleKo: '',
    category: 'COMMERCIAL',
    client: '',
    year: '2026',
    duration: '01:30',
    role: 'Creative Direction & Full Production',
    synopsis: '',
    coverImage: MEDIA_LIBRARY[0].path,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    videoType: 'mp4',
    featured: false,
    aspect: '16:9',
    tags: ['Commercial', '4K'],
    credits: [
      { role: 'Executive Producer', name: 'INPAPER STUDIO' },
      { role: 'Director', name: 'Minwoo Kang' },
    ],
    awards: '',
  });

  // Selected Inquiry Modal
  const [viewingInquiry, setViewingInquiry] = useState<string | null>(null);

  // Backup & Import state
  const [importText, setImportText] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const showSaveSuccess = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleOpenNewProject = () => {
    setIsCreatingNew(true);
    setEditingProject(null);
    setProjectForm({
      title: '',
      titleKo: '',
      category: 'COMMERCIAL',
      client: '',
      year: '2026',
      duration: '01:30',
      role: 'Creative Direction & Full Production',
      synopsis: '',
      coverImage: MEDIA_LIBRARY[0].path,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      videoType: 'mp4',
      featured: false,
      aspect: '16:9',
      tags: ['Commercial', '4K'],
      credits: [
        { role: 'Executive Producer', name: 'INPAPER STUDIO' },
        { role: 'Director', name: 'Minwoo Kang' },
      ],
      awards: '',
    });
  };

  const handleStartEdit = (p: Project) => {
    setIsCreatingNew(false);
    setEditingProject(p);
    setProjectForm({
      title: p.title,
      titleKo: p.titleKo,
      category: p.category,
      client: p.client,
      year: p.year,
      duration: p.duration,
      role: p.role,
      synopsis: p.synopsis,
      coverImage: p.coverImage,
      videoUrl: p.videoUrl,
      videoType: p.videoType,
      featured: p.featured,
      aspect: p.aspect,
      tags: p.tags,
      credits: p.credits || [],
      awards: p.awards || '',
    });
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title) {
      alert('프로젝트 영문 제목을 입력해 주세요.');
      return;
    }

    if (isCreatingNew) {
      addProject(projectForm);
    } else if (editingProject) {
      updateProject(editingProject.id, projectForm);
    }

    setEditingProject(null);
    setIsCreatingNew(false);
    showSaveSuccess();
  };

  const handleAddCredit = () => {
    setProjectForm({
      ...projectForm,
      credits: [...projectForm.credits, { role: 'Staff Role', name: 'Name' }],
    });
  };

  const handleRemoveCredit = (idx: number) => {
    setProjectForm({
      ...projectForm,
      credits: projectForm.credits.filter((_, i) => i !== idx),
    });
  };

  const handleCreditChange = (idx: number, field: 'role' | 'name', value: string) => {
    const updated = [...projectForm.credits];
    updated[idx][field] = value;
    setProjectForm({ ...projectForm, credits: updated });
  };

  // SEO Health calculation
  const seoScore = React.useMemo(() => {
    let score = 0;
    if (seo.metaTitle && seo.metaTitle.length >= 10 && seo.metaTitle.length <= 60) score += 25;
    if (seo.metaDescription && seo.metaDescription.length >= 30 && seo.metaDescription.length <= 160) score += 25;
    if (seo.ogImage) score += 25;
    if (seo.keywords && seo.keywords.includes(',')) score += 25;
    return score;
  }, [seo]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200 font-sans pb-24">
      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#0d0d0d] border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdmin(false)}
              className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>사이트로 돌아가기</span>
            </button>
            <span className="text-zinc-600">/</span>
            <span className="text-sm font-bold font-display text-white">
              {config.name} 관리자 CMS
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-[var(--accent-color,#FFE600)] text-black font-bold">
              LIVE ADMIN
            </span>
          </div>

          <div className="flex items-center gap-3">
            {saveToast && (
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                <Check className="w-4 h-4" />
                <span>저장 완료</span>
              </span>
            )}
            <button
              onClick={() => setIsAdmin(false)}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>실제 웹사이트 미리보기</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace Container */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto pb-px scrollbar-none">
          <button
            onClick={() => setActiveTab('works')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-mono tracking-wider transition-colors cursor-pointer whitespace-nowrap border-b-2 ${
              activeTab === 'works'
                ? 'border-[var(--accent-color,#FFE600)] text-white font-bold bg-white/5'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>포트폴리오 관리 ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-mono tracking-wider transition-colors cursor-pointer whitespace-nowrap border-b-2 ${
              activeTab === 'theme'
                ? 'border-[var(--accent-color,#FFE600)] text-white font-bold bg-white/5'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>테마 &amp; 비주얼 디자인</span>
          </button>

          <button
            onClick={() => setActiveTab('studio')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-mono tracking-wider transition-colors cursor-pointer whitespace-nowrap border-b-2 ${
              activeTab === 'studio'
                ? 'border-[var(--accent-color,#FFE600)] text-white font-bold bg-white/5'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>스튜디오 정보 &amp; SNS</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-mono tracking-wider transition-colors cursor-pointer whitespace-nowrap border-b-2 ${
              activeTab === 'seo'
                ? 'border-[var(--accent-color,#FFE600)] text-white font-bold bg-white/5'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>SEO 도구 &amp; 소셜 공유</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-mono tracking-wider transition-colors cursor-pointer whitespace-nowrap border-b-2 ${
              activeTab === 'inquiries'
                ? 'border-[var(--accent-color,#FFE600)] text-white font-bold bg-white/5'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>클라이언트 문의함 ({inquiries.length})</span>
            {inquiries.filter((i) => i.status === 'new').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-[var(--accent-color,#FFE600)]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-mono tracking-wider transition-colors cursor-pointer whitespace-nowrap border-b-2 ${
              activeTab === 'backup'
                ? 'border-[var(--accent-color,#FFE600)] text-white font-bold bg-white/5'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>데이터 백업 &amp; 초기화</span>
          </button>
        </div>

        {/* Tab 1: Works Management */}
        {activeTab === 'works' && (
          <div className="py-8 space-y-8">
            {/* Header with New Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-display text-white">
                  포트폴리오 영상 프로젝트 관리
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  작품을 새로 등록하거나 편집, 삭제, 추천(Featured) 상태를 즉시 변경할 수 있습니다.
                </p>
              </div>

              {!isCreatingNew && !editingProject && (
                <button
                  onClick={handleOpenNewProject}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent-color,#FFE600)] text-black font-bold text-xs font-mono uppercase tracking-wider hover:brightness-110 transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>새 프로젝트 등록</span>
                </button>
              )}
            </div>

            {/* Create / Edit Form Drawer */}
            {(isCreatingNew || editingProject) && (
              <div className="bg-zinc-950 border border-[var(--accent-color,#FFE600)]/40 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[var(--accent-color,#FFE600)]" />
                    <h4 className="text-lg font-bold font-display text-white">
                      {isCreatingNew ? '새 프로젝트 등록' : `프로젝트 편집: ${editingProject?.title}`}
                    </h4>
                  </div>
                  <button
                    onClick={() => {
                      setIsCreatingNew(false);
                      setEditingProject(null);
                    }}
                    className="text-xs font-mono text-zinc-400 hover:text-white cursor-pointer"
                  >
                    취소
                  </button>
                </div>

                <form onSubmit={handleSaveProject} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Title En */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono uppercase text-zinc-400">
                        영문 제목 <span className="text-[var(--accent-color,#FFE600)]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="예: LUCID HORIZON"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)]"
                      />
                    </div>

                    {/* Title Ko */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono uppercase text-zinc-400">
                        한글 서브타이틀
                      </label>
                      <input
                        type="text"
                        placeholder="예: 루시드 호라이즌 : 빛의 궤적"
                        value={projectForm.titleKo}
                        onChange={(e) => setProjectForm({ ...projectForm, titleKo: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Category */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono uppercase text-zinc-400">
                        카테고리
                      </label>
                      <select
                        value={projectForm.category}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            category: e.target.value as any,
                            sectionCategory: e.target.value === '기획' ? '기획' : '오리지널',
                          })
                        }
                        className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)]"
                      >
                        <option value="오리지널">오리지널 (Original Series)</option>
                        <option value="기획">기획 (Planning & Concept)</option>
                        <option value="COMMERCIAL">COMMERCIAL (광고/CF)</option>
                        <option value="MUSIC VIDEO">MUSIC VIDEO (뮤직비디오)</option>
                        <option value="FASHION / ART">FASHION / ART (패션/아트)</option>
                        <option value="DOCUMENTARY">DOCUMENTARY (다큐멘터리)</option>
                        <option value="BRAND FILM">BRAND FILM (브랜드필름)</option>
                      </select>
                    </div>

                    {/* Client */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono uppercase text-zinc-400">
                        클라이언트
                      </label>
                      <input
                        type="text"
                        placeholder="예: Genesis Motors"
                        value={projectForm.client}
                        onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)]"
                      />
                    </div>

                    {/* Year & Duration */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="block text-xs font-mono uppercase text-zinc-400">
                          제작연도
                        </label>
                        <input
                          type="text"
                          placeholder="2026"
                          value={projectForm.year}
                          onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/10 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-mono uppercase text-zinc-400">
                          러닝타임
                        </label>
                        <input
                          type="text"
                          placeholder="01:45"
                          value={projectForm.duration}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, duration: e.target.value })
                          }
                          className="w-full bg-zinc-900 border border-white/10 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Role & Aspect Ratio */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-mono uppercase text-zinc-400">
                        수행 역할 (Role)
                      </label>
                      <input
                        type="text"
                        placeholder="Creative Direction & Full Production"
                        value={projectForm.role}
                        onChange={(e) => setProjectForm({ ...projectForm, role: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-mono uppercase text-zinc-400">
                        화면 비율 (Aspect Ratio)
                      </label>
                      <select
                        value={projectForm.aspect}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            aspect: e.target.value as any,
                          })
                        }
                        className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)]"
                      >
                        <option value="16:9">16:9 (Standard Widescreen)</option>
                        <option value="2.39:1">2.39:1 (Cinemascope Anamorphic)</option>
                        <option value="4:3">4:3 (Editorial Retro Box)</option>
                        <option value="9:16">9:16 (Vertical Mobile Story)</option>
                      </select>
                    </div>
                  </div>

                  {/* Media Library Quick Select & URL */}
                  <div className="space-y-3">
                    <label className="block text-xs font-mono uppercase text-zinc-400">
                      커버 이미지 선택 (스튜디오 미디어 라이브러리)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {MEDIA_LIBRARY.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => setProjectForm({ ...projectForm, coverImage: item.path })}
                          className={`group cursor-pointer border p-1 relative transition-all ${
                            projectForm.coverImage === item.path
                              ? 'border-[var(--accent-color,#FFE600)] bg-[var(--accent-color,#FFE600)]/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <img
                            src={item.path}
                            alt={item.name}
                            className="w-full aspect-video object-cover"
                          />
                          <div className="text-[10px] font-mono text-zinc-400 truncate mt-1">
                            {item.name}
                          </div>
                        </div>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="또는 직접 이미지 URL 입력 (https://...)"
                      value={projectForm.coverImage}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, coverImage: e.target.value })
                      }
                      className="w-full bg-zinc-900 border border-white/10 px-4 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)] font-mono"
                    />
                  </div>

                  {/* Video URL */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase text-zinc-400">
                      영상 스트림 URL (MP4 / WebM / Vimeo / YouTube)
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={projectForm.videoUrl}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, videoUrl: e.target.value })
                      }
                      className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)] font-mono"
                    />
                  </div>

                  {/* Synopsis */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase text-zinc-400">
                      작품 시놉시스 및 기획 의도
                    </label>
                    <textarea
                      rows={3}
                      placeholder="조명, 카메라 워크, 콘셉트 등 작품 설명"
                      value={projectForm.synopsis}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, synopsis: e.target.value })
                      }
                      className="w-full bg-zinc-900 border border-white/10 p-4 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)] leading-relaxed"
                    />
                  </div>

                  {/* Awards / Accolades */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase text-zinc-400">
                      수상 내역 (Awards / Festival Selections)
                    </label>
                    <input
                      type="text"
                      placeholder="예: 2026 Korea Advertising Awards Gold"
                      value={projectForm.awards || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, awards: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)]"
                    />
                  </div>

                  {/* Credits Editor */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-mono uppercase text-zinc-400">
                        제작 크레딧 (Production Credits)
                      </label>
                      <button
                        type="button"
                        onClick={handleAddCredit}
                        className="text-xs font-mono text-[var(--accent-color,#FFE600)] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>크레딧 스태프 추가</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {projectForm.credits.map((credit, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <input
                            type="text"
                            placeholder="직책 (예: Director, DP, Colorist)"
                            value={credit.role}
                            onChange={(e) => handleCreditChange(idx, 'role', e.target.value)}
                            className="w-1/3 bg-zinc-900 border border-white/10 px-3 py-1.5 text-xs text-white font-mono"
                          />
                          <input
                            type="text"
                            placeholder="이름 (예: Minwoo Kang)"
                            value={credit.name}
                            onChange={(e) => handleCreditChange(idx, 'name', e.target.value)}
                            className="flex-1 bg-zinc-900 border border-white/10 px-3 py-1.5 text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveCredit(idx)}
                            className="p-1.5 text-zinc-500 hover:text-rose-400 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured Status checkbox */}
                  <div className="pt-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={projectForm.featured}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, featured: e.target.checked })
                      }
                      className="w-4 h-4 accent-[#FFE600]"
                    />
                    <label htmlFor="featured" className="text-xs font-mono text-zinc-300">
                      메인 추천작 (Featured Project)으로 상단 고정 노출
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex items-center gap-3 border-t border-white/10">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[var(--accent-color,#FFE600)] text-black font-bold text-xs font-mono uppercase tracking-wider hover:brightness-110 cursor-pointer flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isCreatingNew ? '새 프로젝트 등록 완료' : '변경 사항 저장'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingNew(false);
                        setEditingProject(null);
                      }}
                      className="px-6 py-3 bg-zinc-800 text-white text-xs font-mono hover:bg-zinc-700 cursor-pointer"
                    >
                      취소
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Existing Projects Table */}
            <div className="border border-white/10 bg-zinc-950/60 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-zinc-900 text-zinc-400 border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">썸네일</th>
                    <th className="py-3 px-4">제목 &amp; 서브타이틀</th>
                    <th className="py-3 px-4">카테고리</th>
                    <th className="py-3 px-4">클라이언트</th>
                    <th className="py-3 px-4">연도</th>
                    <th className="py-3 px-4">추천작</th>
                    <th className="py-3 px-4 text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3 px-4 w-24">
                        <img
                          src={proj.coverImage}
                          alt={proj.title}
                          className="w-20 aspect-video object-cover border border-white/10"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-white font-bold font-display text-sm">
                          {proj.title}
                        </div>
                        <div className="text-zinc-500 text-[11px] font-sans">
                          {proj.titleKo}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[var(--accent-color,#FFE600)] font-semibold">
                          {proj.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-zinc-300">
                        {proj.client}
                      </td>
                      <td className="py-3 px-4 text-zinc-400">
                        {proj.year}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => updateProject(proj.id, { featured: !proj.featured })}
                          className={`px-2 py-0.5 text-[10px] font-bold cursor-pointer ${
                            proj.featured
                              ? 'bg-[var(--accent-color,#FFE600)] text-black'
                              : 'bg-zinc-800 text-zinc-500 hover:text-white'
                          }`}
                        >
                          {proj.featured ? 'FEATURED' : '일반'}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleStartEdit(proj)}
                          className="p-1.5 text-zinc-400 hover:text-white border border-white/10 hover:border-white/30 cursor-pointer"
                          title="수정"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`'${proj.title}' 프로젝트를 삭제하시겠습니까?`)) {
                              deleteProject(proj.id);
                              showSaveSuccess();
                            }
                          }}
                          className="p-1.5 text-zinc-400 hover:text-rose-400 border border-white/10 hover:border-rose-400/40 cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Theme & Visual Design */}
        {activeTab === 'theme' && (
          <div className="py-8 max-w-4xl space-y-10">
            <div>
              <h3 className="text-xl font-bold font-display text-white">
                디자인 &amp; 테마 커스터마이징
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                사이트의 포인트 컬러(노란색 계열 및 커스텀), 배경 톤, 폰트 및 슬로건을 자유롭게 설정할 수 있습니다.
              </p>
            </div>

            {/* Accent Point Color */}
            <div className="space-y-4 p-6 bg-zinc-950 border border-white/10">
              <label className="block text-xs font-mono uppercase text-zinc-300 font-bold">
                포인트 컬러 (Accent Yellow / Gold)
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {ACCENT_COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => {
                      updateConfig({ accentColor: preset.value });
                      showSaveSuccess();
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 border text-xs font-mono transition-all cursor-pointer ${
                      config.accentColor === preset.value
                        ? 'border-white bg-white/10 text-white'
                        : 'border-white/10 text-zinc-400 hover:border-white/30'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-none shrink-0"
                      style={{ backgroundColor: preset.value }}
                    />
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>

              {/* Custom Hex Color Picker */}
              <div className="pt-2 flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-400">커스텀 색상 선택:</span>
                <input
                  type="color"
                  value={config.accentColor}
                  onChange={(e) => {
                    updateConfig({ accentColor: e.target.value });
                    showSaveSuccess();
                  }}
                  className="w-8 h-8 cursor-pointer bg-transparent border-0"
                />
                <span className="text-xs font-mono text-zinc-300">{config.accentColor}</span>
              </div>
            </div>

            {/* Background Tone */}
            <div className="space-y-4 p-6 bg-zinc-950 border border-white/10">
              <label className="block text-xs font-mono uppercase text-zinc-300 font-bold">
                배경 톤 (Black / Dark Slate Tone)
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {BG_TONE_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => {
                      updateConfig({ bgTone: preset.value });
                      showSaveSuccess();
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 border text-xs font-mono transition-all cursor-pointer ${
                      config.bgTone === preset.value
                        ? 'border-white bg-white/10 text-white'
                        : 'border-white/10 text-zinc-400 hover:border-white/30'
                    }`}
                  >
                    <span
                      className="w-4 h-4 border border-zinc-700 shrink-0"
                      style={{ backgroundColor: preset.value }}
                    />
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slogan & Philosophy */}
            <div className="space-y-6 p-6 bg-zinc-950 border border-white/10">
              <label className="block text-xs font-mono uppercase text-zinc-300 font-bold">
                스튜디오 슬로건 &amp; 소개문 편집
              </label>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400">
                  한글 메인 슬로건
                </label>
                <input
                  type="text"
                  value={config.sloganKo}
                  onChange={(e) => updateConfig({ sloganKo: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400">
                  영문 서브 슬로건
                </label>
                <input
                  type="text"
                  value={config.slogan}
                  onChange={(e) => updateConfig({ slogan: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)] font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400">
                  스튜디오 철학 본문 (Philosophy)
                </label>
                <textarea
                  rows={4}
                  value={config.philosophy}
                  onChange={(e) => updateConfig({ philosophy: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 p-4 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)] leading-relaxed"
                />
              </div>

              {/* Marquee Settings */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-zinc-300 font-bold">
                    메인 상단 흐르는 텍스트 (Marquee Ribbon)
                  </label>
                  <button
                    onClick={() => updateConfig({ showMarquee: !config.showMarquee })}
                    className={`px-3 py-1 text-xs font-mono ${
                      config.showMarquee
                        ? 'bg-[var(--accent-color,#FFE600)] text-black font-bold'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {config.showMarquee ? '노출 중' : '숨김'}
                  </button>
                </div>
                <input
                  type="text"
                  value={config.marqueeText}
                  onChange={(e) => updateConfig({ marqueeText: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 px-4 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)] font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Studio Info & Social Links */}
        {activeTab === 'studio' && (
          <div className="py-8 max-w-4xl space-y-8">
            <div>
              <h3 className="text-xl font-bold font-display text-white">
                스튜디오 기본 정보 &amp; 소셜 채널 연동
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                사이트 푸터와 문의 섹션에 반영되는 공식 연락처, 사업자 정보, SNS 링크를 관리합니다.
              </p>
            </div>

            <div className="p-6 bg-zinc-950 border border-white/10 space-y-6">
              <h4 className="text-xs font-mono uppercase text-[var(--accent-color,#FFE600)] font-bold">
                스튜디오 공식 정보
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-zinc-400">브랜드명 (Studio Name)</label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => updateConfig({ name: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white font-display font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-zinc-400">대표자명 (CEO)</label>
                  <input
                    type="text"
                    value={config.contactInfo.ceo}
                    onChange={(e) =>
                      updateConfig({
                        contactInfo: { ...config.contactInfo, ceo: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-zinc-400">공식 문의 이메일</label>
                  <input
                    type="email"
                    value={config.contactInfo.email}
                    onChange={(e) =>
                      updateConfig({
                        contactInfo: { ...config.contactInfo, email: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-zinc-400">대표 전화번호</label>
                  <input
                    type="text"
                    value={config.contactInfo.phone}
                    onChange={(e) =>
                      updateConfig({
                        contactInfo: { ...config.contactInfo, phone: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400">스튜디오 소재지 주소</label>
                <input
                  type="text"
                  value={config.contactInfo.address}
                  onChange={(e) =>
                    updateConfig({
                      contactInfo: { ...config.contactInfo, address: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400">사업자 등록번호</label>
                <input
                  type="text"
                  value={config.contactInfo.businessNumber}
                  onChange={(e) =>
                    updateConfig({
                      contactInfo: { ...config.contactInfo, businessNumber: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-6">
              <h4 className="text-xs font-mono uppercase text-[var(--accent-color,#FFE600)] font-bold">
                소셜 미디어 (SNS) 공식 채널 링크
              </h4>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-zinc-400">Instagram URL</label>
                  <input
                    type="url"
                    value={config.socialLinks.instagram}
                    onChange={(e) =>
                      updateConfig({
                        socialLinks: { ...config.socialLinks, instagram: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-900 border border-white/10 px-4 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-zinc-400">Vimeo URL</label>
                  <input
                    type="url"
                    value={config.socialLinks.vimeo}
                    onChange={(e) =>
                      updateConfig({
                        socialLinks: { ...config.socialLinks, vimeo: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-900 border border-white/10 px-4 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-zinc-400">YouTube URL</label>
                  <input
                    type="url"
                    value={config.socialLinks.youtube}
                    onChange={(e) =>
                      updateConfig({
                        socialLinks: { ...config.socialLinks, youtube: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-900 border border-white/10 px-4 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-zinc-400">Behance URL</label>
                  <input
                    type="url"
                    value={config.socialLinks.behance}
                    onChange={(e) =>
                      updateConfig({
                        socialLinks: { ...config.socialLinks, behance: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-900 border border-white/10 px-4 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: SEO Tools & Social Cards */}
        {activeTab === 'seo' && (
          <div className="py-8 max-w-4xl space-y-10">
            <div>
              <h3 className="text-xl font-bold font-display text-white">
                검색엔진 최적화 (SEO) &amp; 소셜 공유 카드 관리
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                구글, 네이버 검색 노출 메타태그와 카카오톡, 트위터, 인스타그램 링크 공유 시 노출되는 오픈그래프(OG) 카드를 설정합니다.
              </p>
            </div>

            {/* SEO Health Score Card */}
            <div className="p-6 bg-zinc-950 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="text-xs font-mono uppercase text-zinc-400">
                  SEO HEALTH AUDIT SCORE
                </div>
                <div className="text-3xl font-black font-display text-white mt-1 flex items-center gap-2">
                  <span className="text-[var(--accent-color,#FFE600)]">{seoScore}</span>
                  <span className="text-zinc-600">/ 100</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  {seoScore === 100
                    ? '완벽합니다! 검색 엔진 및 소셜 공유 최적화가 모두 완료되었습니다.'
                    : '제목, 설명, 오픈그래프 이미지를 입력하여 최적화 점수를 높여보세요.'}
                </p>
              </div>

              <div className="space-y-1 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  {seo.metaTitle.length >= 10 ? '✅' : '⚪'} <span>타이틀 길이 (10~60자)</span>
                </div>
                <div className="flex items-center gap-2">
                  {seo.metaDescription.length >= 30 ? '✅' : '⚪'} <span>메타 설명 (30~160자)</span>
                </div>
                <div className="flex items-center gap-2">
                  {seo.ogImage ? '✅' : '⚪'} <span>소셜 썸네일 (OG Image)</span>
                </div>
              </div>
            </div>

            {/* Live Search Engine SERP Preview */}
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-4">
              <div className="text-xs font-mono uppercase text-[var(--accent-color,#FFE600)] font-bold">
                구글 검색 결과 미리보기 (Google SERP Snippet)
              </div>
              <div className="bg-[#1f1f1f] p-4 rounded-md space-y-1 font-sans">
                <div className="text-xs text-zinc-400">https://inpaperstudio.com</div>
                <div className="text-base text-[#8ab4f8] hover:underline cursor-pointer font-medium">
                  {seo.metaTitle || 'INPAPER STUDIO | 하이엔드 영상 미디어'}
                </div>
                <div className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                  {seo.metaDescription || '종이 위의 기획에서 스크린 위 시네마틱 미디어로. 광고, 뮤직비디오, 브랜드 필름 제작.'}
                </div>
              </div>
            </div>

            {/* Live Social Share Card Preview (KakaoTalk / Twitter) */}
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-4">
              <div className="text-xs font-mono uppercase text-[var(--accent-color,#FFE600)] font-bold">
                카카오톡 &amp; SNS 공유 카드 미리보기 (OpenGraph Preview)
              </div>
              <div className="max-w-md bg-zinc-900 border border-white/10 overflow-hidden">
                <img
                  src={seo.ogImage || MEDIA_LIBRARY[0].path}
                  alt="OG Preview"
                  className="w-full aspect-[1.91/1] object-cover"
                />
                <div className="p-4 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-zinc-400">
                    INPAPERSTUDIO.COM
                  </div>
                  <div className="text-sm font-bold text-white line-clamp-1">
                    {seo.metaTitle}
                  </div>
                  <div className="text-xs text-zinc-400 line-clamp-2">
                    {seo.metaDescription}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">메타 타이틀 (Meta Title)</span>
                  <span className="text-zinc-500">{seo.metaTitle.length}/60자</span>
                </div>
                <input
                  type="text"
                  value={seo.metaTitle}
                  onChange={(e) => updateSeo({ metaTitle: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">메타 설명문 (Meta Description)</span>
                  <span className="text-zinc-500">{seo.metaDescription.length}/160자</span>
                </div>
                <textarea
                  rows={3}
                  value={seo.metaDescription}
                  onChange={(e) => updateSeo({ metaDescription: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 p-4 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)] leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400">
                  검색 키워드 (쉼표로 구분)
                </label>
                <input
                  type="text"
                  value={seo.keywords}
                  onChange={(e) => updateSeo({ keywords: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-color,#FFE600)] font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400">
                  오픈그래프 대표 이미지 URL
                </label>
                <input
                  type="text"
                  value={seo.ogImage}
                  onChange={(e) => updateSeo({ ogImage: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 px-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-[var(--accent-color,#FFE600)]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400">
                  Google Analytics 추적 ID (GA4)
                </label>
                <input
                  type="text"
                  placeholder="G-XXXXXXX"
                  value={seo.analyticsId}
                  onChange={(e) => updateSeo({ analyticsId: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[var(--accent-color,#FFE600)]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Inquiries Inbox */}
        {activeTab === 'inquiries' && (
          <div className="py-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-display text-white">
                  클라이언트 견적 및 협업 문의함
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  웹사이트의 Contact 폼을 통해 접수된 실시간 제작 문의 내역입니다.
                </p>
              </div>
              <div className="text-xs font-mono text-zinc-400">
                총 {inquiries.length}건 접수됨
              </div>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-16 border border-white/10 bg-zinc-950 text-center space-y-2">
                <Inbox className="w-8 h-8 text-zinc-600 mx-auto" />
                <p className="text-sm text-zinc-400">접수된 문의 내역이 없습니다.</p>
              </div>
            ) : (
              <div className="border border-white/10 bg-zinc-950 overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-zinc-900 text-zinc-400 border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">상태</th>
                      <th className="py-3 px-4">의뢰인 / 회사</th>
                      <th className="py-3 px-4">프로젝트 분야</th>
                      <th className="py-3 px-4">예산</th>
                      <th className="py-3 px-4">접수일시</th>
                      <th className="py-3 px-4 text-right">상세보기 &amp; 관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-zinc-900/40 transition-colors">
                        <td className="py-3 px-4">
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              updateInquiryStatus(inq.id, e.target.value as any)
                            }
                            className={`px-2 py-1 text-[11px] font-bold border ${
                              inq.status === 'new'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : inq.status === 'reviewing'
                                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                                : inq.status === 'meeting'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                            }`}
                          >
                            <option value="new">신규접수</option>
                            <option value="reviewing">검토중</option>
                            <option value="meeting">미팅예정</option>
                            <option value="completed">계약완료</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-white font-bold">{inq.clientName}</div>
                          <div className="text-zinc-500 text-[11px]">{inq.company}</div>
                        </td>
                        <td className="py-3 px-4 text-[var(--accent-color,#FFE600)]">
                          {inq.projectType}
                        </td>
                        <td className="py-3 px-4 text-zinc-300">
                          {inq.budgetTier}
                        </td>
                        <td className="py-3 px-4 text-zinc-500">
                          {inq.createdAt}
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => setViewingInquiry(inq.id)}
                            className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer"
                          >
                            내용 보기
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('이 문의 내역을 삭제하시겠습니까?')) {
                                deleteInquiry(inq.id);
                              }
                            }}
                            className="p-1 text-zinc-500 hover:text-rose-400 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Viewing Inquiry Modal */}
            {viewingInquiry && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#121212] border border-white/10 max-w-2xl w-full p-6 sm:p-8 space-y-6">
                  {(() => {
                    const item = inquiries.find((i) => i.id === viewingInquiry);
                    if (!item) return null;
                    return (
                      <>
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                          <div>
                            <div className="text-xs font-mono text-[var(--accent-color,#FFE600)] font-bold">
                              {item.projectType}
                            </div>
                            <h4 className="text-xl font-bold font-display text-white mt-1">
                              {item.clientName} ({item.company})
                            </h4>
                          </div>
                          <button
                            onClick={() => setViewingInquiry(null)}
                            className="text-zinc-400 hover:text-white cursor-pointer"
                          >
                            닫기
                          </button>
                        </div>

                        <div className="space-y-4 text-xs font-mono">
                          <div className="grid grid-cols-2 gap-4 bg-zinc-900/60 p-4 border border-white/5">
                            <div>
                              <span className="text-zinc-500">이메일:</span>
                              <div className="text-zinc-200 mt-0.5">{item.email}</div>
                            </div>
                            <div>
                              <span className="text-zinc-500">연락처:</span>
                              <div className="text-zinc-200 mt-0.5">{item.phone}</div>
                            </div>
                            <div>
                              <span className="text-zinc-500">희망 예산:</span>
                              <div className="text-zinc-200 mt-0.5">{item.budgetTier}</div>
                            </div>
                            <div>
                              <span className="text-zinc-500">희망 온에어 일정:</span>
                              <div className="text-zinc-200 mt-0.5">{item.targetDate}</div>
                            </div>
                          </div>

                          {item.referenceUrl && (
                            <div>
                              <span className="text-zinc-500">레퍼런스 링크:</span>
                              <a
                                href={item.referenceUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="block text-[var(--accent-color,#FFE600)] underline mt-0.5 truncate"
                              >
                                {item.referenceUrl}
                              </a>
                            </div>
                          )}

                          <div>
                            <span className="text-zinc-500">문의 및 요청 사항 본문:</span>
                            <div className="bg-zinc-900 p-4 border border-white/5 text-zinc-200 leading-relaxed font-sans mt-1 whitespace-pre-line text-sm">
                              {item.message}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/10 pt-4">
                          <a
                            href={`mailto:${item.email}?subject=[INPAPER STUDIO] ${item.clientName}님 제작 문의 회신드립니다`}
                            className="px-5 py-2.5 bg-[var(--accent-color,#FFE600)] text-black font-bold text-xs font-mono uppercase tracking-wider hover:brightness-110 flex items-center gap-2"
                          >
                            <span>이메일로 즉시 답장하기</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => setViewingInquiry(null)}
                            className="px-4 py-2 bg-zinc-800 text-white text-xs font-mono hover:bg-zinc-700 cursor-pointer"
                          >
                            닫기
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 6: Backup & Reset */}
        {activeTab === 'backup' && (
          <div className="py-8 max-w-4xl space-y-10">
            <div>
              <h3 className="text-xl font-bold font-display text-white">
                데이터 백업, 가져오기 및 초기화
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                사이트의 모든 포트폴리오, 테마 설정, 문의 내역을 JSON 파일로 내보내거나 백업 파일에서 복원할 수 있습니다.
              </p>
            </div>

            {/* Export */}
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold font-display text-white">
                    현재 데이터 전체 내보내기 (Export JSON)
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    포트폴리오 게시글, 테마 색상, 스튜디오 정보, 문의함 전체 데이터를 다운로드합니다.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const json = exportJSON();
                    const blob = new Blob([json], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `inpaper_studio_backup_${Date.now()}.json`;
                    a.click();
                    showSaveSuccess();
                  }}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono flex items-center gap-2 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>JSON 파일 다운로드</span>
                </button>
              </div>
            </div>

            {/* Import */}
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-4">
              <h4 className="text-sm font-bold font-display text-white">
                백업 데이터 가져오기 (Import JSON)
              </h4>
              <textarea
                rows={4}
                placeholder="내보냈던 JSON 백업 텍스트를 이곳에 붙여넣으세요..."
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 p-3 text-xs text-white font-mono"
              />
              <button
                onClick={() => {
                  if (!importText) return;
                  const ok = importJSON(importText);
                  if (ok) {
                    alert('성공적으로 데이터를 복원했습니다.');
                    setImportText('');
                    showSaveSuccess();
                  } else {
                    alert('유효하지 않은 JSON 데이터입니다. 형식을 확인해 주세요.');
                  }
                }}
                className="px-4 py-2 bg-[var(--accent-color,#FFE600)] text-black font-bold text-xs font-mono hover:brightness-110 cursor-pointer"
              >
                데이터 가져와서 적용하기
              </button>
            </div>

            {/* Reset to Factory Defaults */}
            <div className="p-6 bg-rose-950/20 border border-rose-500/20 space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold font-display text-rose-300">
                    초기 샘플 데이터 복원 (Reset to Defaults)
                  </h4>
                  <p className="text-xs text-rose-200/60 mt-1 leading-relaxed">
                    모든 수정 사항과 새로 추가한 프로젝트를 삭제하고, 최초의 하이엔드 솔파 스타일 샘플 포트폴리오 및 기본 설정으로 즉시 되돌립니다.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (confirm('모든 데이터가 초기 샘플로 리셋됩니다. 계속하시겠습니까?')) {
                    resetToDefaults();
                    alert('초기 샘플 데이터로 정상 복원되었습니다.');
                  }
                }}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>초기 샘플 데이터로 복원</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
