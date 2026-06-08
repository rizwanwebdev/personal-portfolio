export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  imageUrl: string;
  codeUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
  iconName: "Code2" | "Database" | "Cpu" | "Terminal" | "Layers";
  isCore?: boolean;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
