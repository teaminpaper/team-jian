import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, StudioConfig, SEOConfig, ClientInquiry } from '../types';
import {
  DEFAULT_PROJECTS,
  DEFAULT_STUDIO_CONFIG,
  DEFAULT_SEO_CONFIG,
  DEFAULT_INQUIRIES,
} from '../data/defaultData';

interface StudioContextType {
  projects: Project[];
  config: StudioConfig;
  seo: SEOConfig;
  inquiries: ClientInquiry[];
  isAdmin: boolean;
  activeProject: Project | null;
  isShowreelOpen: boolean;
  
  // Actions
  setIsAdmin: (val: boolean) => void;
  setActiveProject: (p: Project | null) => void;
  setIsShowreelOpen: (val: boolean) => void;
  
  // Projects
  addProject: (p: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (startIndex: number, endIndex: number) => void;
  
  // Config & SEO
  updateConfig: (updated: Partial<StudioConfig>) => void;
  updateSeo: (updated: Partial<SEOConfig>) => void;
  
  // Inquiries
  addInquiry: (inquiry: Omit<ClientInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: ClientInquiry['status']) => void;
  deleteInquiry: (id: string) => void;
  
  // Backup & Reset
  resetToDefaults: () => void;
  exportJSON: () => string;
  importJSON: (jsonStr: string) => boolean;
}

const STORAGE_KEY_PREFIX = 'portfolio_pd_v11_';

const StudioContext = createContext<StudioContextType | undefined>(undefined);

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}projects`);
      return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  });

  const [config, setConfig] = useState<StudioConfig>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}config`);
      return saved ? JSON.parse(saved) : DEFAULT_STUDIO_CONFIG;
    } catch {
      return DEFAULT_STUDIO_CONFIG;
    }
  });

  const [seo, setSeo] = useState<SEOConfig>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}seo`);
      return saved ? JSON.parse(saved) : DEFAULT_SEO_CONFIG;
    } catch {
      return DEFAULT_SEO_CONFIG;
    }
  });

  const [inquiries, setInquiries] = useState<ClientInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}inquiries`);
      return saved ? JSON.parse(saved) : DEFAULT_INQUIRIES;
    } catch {
      return DEFAULT_INQUIRIES;
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isShowreelOpen, setIsShowreelOpen] = useState<boolean>(false);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}projects`, JSON.stringify(projects));
    } catch (e) {
      console.warn('Could not persist projects to localStorage', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}config`, JSON.stringify(config));
      document.documentElement.style.setProperty('--accent-color', config.accentColor);
      document.documentElement.style.setProperty('--bg-primary', config.bgTone);
    } catch (e) {
      console.warn('Could not persist config to localStorage', e);
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}seo`, JSON.stringify(seo));
      if (seo.metaTitle) {
        document.title = seo.metaTitle;
      }
    } catch (e) {
      console.warn('Could not persist seo to localStorage', e);
    }
  }, [seo]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}inquiries`, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('Could not persist inquiries to localStorage', e);
    }
  }, [inquiries]);

  // Project handlers
  const addProject = (p: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...p,
      id: `proj-${Date.now()}`,
    };
    setProjects((prev) => [newProject, ...prev]);
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
    if (activeProject && activeProject.id === id) {
      setActiveProject((prev) => (prev ? { ...prev, ...updated } : null));
    }
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((item) => item.id !== id));
    if (activeProject && activeProject.id === id) {
      setActiveProject(null);
    }
  };

  const reorderProjects = (startIndex: number, endIndex: number) => {
    setProjects((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  // Config handlers
  const updateConfig = (updated: Partial<StudioConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  const updateSeo = (updated: Partial<SEOConfig>) => {
    setSeo((prev) => ({ ...prev, ...updated }));
  };

  // Inquiry handlers
  const addInquiry = (inquiry: Omit<ClientInquiry, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newInq: ClientInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: formattedDate,
      status: 'new',
    };
    setInquiries((prev) => [newInq, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: ClientInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  // Reset & Backup
  const resetToDefaults = () => {
    setProjects(DEFAULT_PROJECTS);
    setConfig(DEFAULT_STUDIO_CONFIG);
    setSeo(DEFAULT_SEO_CONFIG);
    setInquiries(DEFAULT_INQUIRIES);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}projects`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}config`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}seo`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}inquiries`);
  };

  const exportJSON = () => {
    const data = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      config,
      seo,
      projects,
      inquiries,
    };
    return JSON.stringify(data, null, 2);
  };

  const importJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.projects && Array.isArray(parsed.projects)) {
        setProjects(parsed.projects);
      }
      if (parsed.config) {
        setConfig(parsed.config);
      }
      if (parsed.seo) {
        setSeo(parsed.seo);
      }
      if (parsed.inquiries && Array.isArray(parsed.inquiries)) {
        setInquiries(parsed.inquiries);
      }
      return true;
    } catch (e) {
      console.error('Failed to import JSON data', e);
      return false;
    }
  };

  return (
    <StudioContext.Provider
      value={{
        projects,
        config,
        seo,
        inquiries,
        isAdmin,
        activeProject,
        isShowreelOpen,
        setIsAdmin,
        setActiveProject,
        setIsShowreelOpen,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        updateConfig,
        updateSeo,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        resetToDefaults,
        exportJSON,
        importJSON,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
};
