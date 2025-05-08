import { projectsData } from '@/data/projects';
import { experienceData } from '@/data/experience';
import { skillsData } from '@/data/skills';
import { educationData } from '@/data/education';
import { activities } from '@/data/activities';
import type { Project, Experience, SkillCategory, Education, Activity } from '@/types/content';

export function getAllProjects(): Project[] {
  return [...projectsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProjectById(id: string): Project | undefined {
  return projectsData.find(project => project.id === id);
}

export function getSkills(): SkillCategory[] {
  return skillsData;
}

export function getAllExperience(): Experience[] {
  return [...experienceData].sort((a, b) => {
    const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
    const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });
}

export function getExperienceById(id: string): Experience | undefined {
  return experienceData.find(exp => exp.id === id);
}

export function getAllEducation(): Education[] {
  return educationData;
}

export function getAllActivities(): Activity[] {
  return activities;
}

export function getAllSkills(): SkillCategory[] {
  return skillsData;
} 