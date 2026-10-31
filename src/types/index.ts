export type ProjectCategory = 'ALL' | '기획' | '오리지널' | 'COMMERCIAL' | 'MUSIC VIDEO' | 'FASHION / ART' | 'DOCUMENTARY' | 'BRAND FILM';

export type MainSectionCategory = '기획' | '오리지널';
export type ContentFormat = 'SHORT FORM' | 'LONG FORM';
export type SubPlatform = 'Reels' | 'Shorts' | 'YouTube' | 'Video';

export interface ProductionCredit {
  role: string;
  name: string;
}

export interface Project {
  id: string;
  title: string;
  titleKo: string;
  category: string;
  sectionCategory?: '기획' | '오리지널'; // 기획 (4) or 오리지널 (6)
  contentFormat?: 'SHORT FORM' | 'LONG FORM'; // SHORT FORM or LONG FORM
  subPlatform?: 'Reels' | 'Shorts' | 'YouTube' | 'Video'; // Reels, Shorts, YouTube, Video
  client: string;
  year: string;
  duration: string;
  role: string;
  synopsis: string;
  coverImage: string;
  videoUrl: string;
  videoType: 'mp4' | 'youtube' | 'vimeo';
  featured: boolean;
  aspect: '16:9' | '4:3' | '9:16' | '2.39:1';
  credits: ProductionCredit[];
  tags: string[];
  metrics?: string;
  awards?: string;
}

export interface DirectorProfile {
  id: string;
  name: string;
  nameKo: string;
  role: string;
  bio: string;
  specialty: string;
  notableWorks: string[];
}

export interface StudioConfig {
  name: string;
  slogan: string;
  sloganKo: string;
  philosophy: string;
  heroVideoUrl: string;
  heroPoster: string;
  accentColor: string; // e.g., #FFE600
  bgTone: string; // e.g., #080808
  fontFamily: 'outfit' | 'sans' | 'editorial';
  showMarquee: boolean;
  marqueeText: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    businessNumber: string;
    ceo: string;
  };
  socialLinks: {
    instagram: string;
    vimeo: string;
    youtube: string;
    behance: string;
    linkedin: string;
  };
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  analyticsId: string;
  robotsIndex: boolean;
}

export interface ClientInquiry {
  id: string;
  clientName: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budgetTier: string;
  targetDate: string;
  message: string;
  referenceUrl?: string;
  createdAt: string;
  status: 'new' | 'reviewing' | 'meeting' | 'completed';
}
