import React from 'react';
import { Video, Film, Wand2, Volume2, ArrowUpRight } from 'lucide-react';

interface ServicesSectionProps {
  onInquireService?: (serviceName: string) => void;
}

export const SERVICES_LIST = [
  {
    id: 'prod',
    index: '01',
    title: '통합 영상 제작',
    titleEn: 'Commercial & Brand Film Production',
    icon: Video,
    description: '브랜드의 핵심 철학을 관통하는 콘셉트 기획부터 시나리오 작성, 로케이션 헌팅, 시네마 카메라(ARRI/RED) 촬영, 조명 연출까지 모든 제작 단계를 총괄하는 원스톱 하이엔드 영상 프로덕션입니다.',
    deliverables: ['TV & 디지털 캠페인 CF', '기업 및 브랜드 필름', 'K-POP 뮤직비디오', '오리지널 다큐멘터리'],
    turnaround: '기획부터 납품까지 3~6주',
  },
  {
    id: 'edit',
    index: '02',
    title: '포트폴리오 & 쇼릴 영상 편집',
    titleEn: 'Portfolio & Showreel Video Editing',
    icon: Film,
    description: '방대한 원본 영상에서 가장 강렬한 시각적 훅(Hook)을 포착하여 관객의 시선을 단 3초 만에 사로잡는 리듬감 있는 컷 편집을 진행합니다. 아티스트와 브랜드의 포트폴리오 가치를 극대화합니다.',
    deliverables: ['브랜드/기업 쇼릴 (Showreel)', '아티스트 포트폴리오 필름', '소셜 미디어 숏폼 하이라이트', '이벤트 & 런웨이 리캡'],
    turnaround: '원천 소스 수급 후 1~2주',
  },
  {
    id: 'motion',
    index: '03',
    title: '모션 그래픽 & 2D/3D VFX',
    titleEn: 'Motion Graphics & 3D Visual Effects',
    icon: Wand2,
    description: '실사 촬영의 한계를 뛰어넘는 초현실적 3D 오브젝트 시뮬레이션, 볼드한 키네틱 타이포그래피, 정밀한 공간 매치무브 합성으로 영상에 현대적이고 감각적인 비주얼 임팩트를 부여합니다.',
    deliverables: ['3D 제품 렌더링 & 시뮬레이션', '키네틱 타이포그래피', '로고 인트로 & 브랜드 아이덴티티 모션', 'CG 환경 합성'],
    turnaround: '콘셉트 확정 후 2~3주',
  },
  {
    id: 'post',
    index: '04',
    title: '시네마틱 컬러 그레이딩 & 사운드 디자인',
    titleEn: 'Color Grading & Dolby Sound Mastering',
    icon: Volume2,
    description: 'DaVinci Resolve 전문 컬러 스위트에서 정교한 4K HDR 색보정 작업을 진행하며, 장면에 생명력을 불어넣는 앰비언스 사운드와 Dolby Atmos 서라운드 믹싱으로 압도적인 몰입감을 완성합니다.',
    deliverables: ['DaVinci Resolve 4K HDR 색보정 (Color grading)', '오리지널 BGM 큐레이션 & 작곡', '효과음(Foley) & 공간 사운드 믹싱', '보이스 마스터링'],
    turnaround: '가편집 확정 후 3~5일',
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onInquireService }) => {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#0a0a0a] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent-color,#FFE600)] mb-3">
              WHAT WE DO (주요 서비스)
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white">
              CORE CAPABILITIES
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            기획안(Paper)에서 출발하여 스크린 위의 감동으로 완성되는 인페이퍼 스튜디오의 4가지 핵심 영상 미디어 제작 역량입니다.
          </p>
        </div>

        {/* Services Grid (4 Clean High-End Structural Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
          {SERVICES_LIST.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="group p-8 md:p-10 bg-zinc-950/70 border border-white/10 hover:border-[var(--accent-color,#FFE600)]/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Index & Icon */}
                  <div className="flex items-center justify-between pb-6 border-b border-white/5">
                    <span className="text-xs font-mono font-bold text-[var(--accent-color,#FFE600)]">
                      {srv.index}. SERVICES
                    </span>
                    <div className="p-3 bg-zinc-900 border border-white/10 group-hover:bg-[var(--accent-color,#FFE600)] group-hover:text-black transition-colors">
                      <Icon className="w-5 h-5 transition-colors" />
                    </div>
                  </div>

                  {/* Title & Eng Title */}
                  <div className="pt-6 space-y-1">
                    <h3 className="text-2xl font-bold font-display text-white group-hover:text-[var(--accent-color,#FFE600)] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                      {srv.titleEn}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="pt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                    {srv.description}
                  </p>

                  {/* Deliverables list */}
                  <div className="pt-6 space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                      DELIVERABLES &amp; SCOPE
                    </div>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {srv.deliverables.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-[var(--accent-color,#FFE600)] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Card Action: Timeline & Inquire */}
                <div className="pt-8 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-500">
                    표준 일정: {srv.turnaround}
                  </span>

                  {onInquireService && (
                    <button
                      onClick={() => onInquireService(srv.title)}
                      className="flex items-center gap-1.5 text-xs font-mono text-white group-hover:text-[var(--accent-color,#FFE600)] transition-colors cursor-pointer"
                    >
                      <span>서비스 견적 문의</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
