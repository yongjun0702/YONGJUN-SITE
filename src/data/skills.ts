import type { SkillCategory } from '@/types/content';

export const skillsData: SkillCategory[] = [
  {
    categoryName: 'Languages',
    skills: [
      { name: 'Dart', iconName: 'SiDart' },
      { name: 'Python', iconName: 'FaPython' },
      { name: 'TypeScript', iconName: 'SiTypescript' },
      { name: 'JavaScript', iconName: 'FaJs' },
      { name: 'C', iconName: 'SiC' },
    ],
  },
  {
    categoryName: 'Frameworks & Libraries',
    skills: [
      { name: 'Flutter', iconName: 'SiFlutter' },
      { name: 'React', iconName: 'FaReact' },
      { name: 'Next.js', iconName: 'SiNextdotjs' },
      { name: 'FastAPI', iconName: 'SiFastapi' },
      { name: 'Flask', iconName: 'SiFlask' },
    ],
  },
  {
    categoryName: 'Tools & Platforms',
    skills: [
      { name: 'Docker', iconName: 'FaDocker' },
      { name: 'Firebase', iconName: 'SiFirebase' },
      { name: 'Supabase', iconName: 'SiSupabase' },
      { name: 'PostgreSQL', iconName: 'SiPostgresql' },
      { name: 'GitHub', iconName: 'FaGithub' },
      { name: 'Figma', iconName: 'FaFigma' },
      { name: 'Postman', iconName: 'SiPostman' },
      { name: 'Notion', iconName: 'SiNotion' },
    ],
  },
]; 