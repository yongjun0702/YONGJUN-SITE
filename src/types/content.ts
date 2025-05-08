export interface Project {
  id: string;
  title: string;
  introduction: string;
  date: string;
  period: string;
  statusTags: string[];
  technologies: string[];
  keyFeatures?: string[];
  teamInfo?: string;
  myRole?: string;
  images?: string[];
  githubUrl?: string;
  liveUrl?: string;
  velogUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  location?: string;
  introduction?: string;
  contributions?: string[];
  technologies?: string[];
  tags?: string[];
  companyLogoUrl?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  description?: string;
  logoUrl?: string;
}

export interface Activity {
  id: string;
  date: string;
  title: string;
  details?: string;
}

export interface Skill {
  name: string;
  iconName?: string;
}

export interface SkillCategory {
  categoryName: string;
  skills: Skill[];
} 