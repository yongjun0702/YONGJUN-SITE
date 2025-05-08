import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { getSkills } from '@/lib/content';

export default function HomePage() {
  const skillsCategories = getSkills();

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <AboutSection />
      <SkillsSection categories={skillsCategories} />
      <ExperienceSection />
      <ProjectsSection />
    </main>
  );
}
