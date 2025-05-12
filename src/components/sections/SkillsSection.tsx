'use client' 

import { motion } from 'framer-motion'
import { 
    FaReact, FaJs, FaPython, FaNodeJs, FaCss3Alt, FaGitAlt,
    FaFigma, FaDatabase, FaDocker, FaLink, FaToolbox, FaCode, FaDartLang, FaPhp, FaGithub
} from 'react-icons/fa6';

import { 
    SiTypescript, SiDart, SiC, SiNextdotjs, SiTailwindcss, 
    SiNotion, SiFirebase, SiSupabase, SiFlutter, SiFastapi, SiFlask, SiPostgresql, SiPostman
} from 'react-icons/si';

import type { IconType } from 'react-icons'; 
import type { SkillCategory } from '@/types/content';

const iconMap: { [key: string]: IconType } = {
    FaReact,
    FaJs,
    FaPython,
    FaNodeJs,
    FaCss3Alt,
    FaGitAlt,
    FaFigma,
    FaDatabase,
    FaLink,
    FaToolbox,
    FaCode,
    FaDocker,
    FaPhp,
    FaGithub,
    FaDartLang,
    SiTypescript,
    SiDart,
    SiC,
    SiNextdotjs,
    SiTailwindcss,
    SiNotion,
    SiFirebase,
    SiSupabase,
    SiFlutter,
    SiFastapi,
    SiFlask,
    SiPostgresql,
    SiPostman,
};

const skillsContent = {
  title: 'Skills',
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, delay: 0.1 }
  },
};
const titleVariants = { 
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
};
const categoryColumnVariants = { 
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, staggerChildren: 0.05 }
  },
};
const skillItemVariants = { 
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export function SkillsSection({ categories }: SkillsSectionProps) {
  return (
    <motion.section
      id="skills"
      className='w-full bg-background px-4 py-16 md:px-6 md:py-24 lg:py-32 mb-32'
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <div className="container mx-auto max-w-6xl space-y-16">
        <motion.div className="mb-12 text-center md:mb-16" variants={titleVariants}>
          <div className="inline-block relative pb-5.5">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-5xl">
              {skillsContent.title}
            </h2>
            <div className="absolute bottom-0 left-0 w-full h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-400"></div>
          </div>
        </motion.div>

        <div className="flex justify-center">
            <motion.div 
                        className="grid grid-cols-1 gap-y-12 md:grid-cols-3 w-full max-w-5xl gap-y-18"
            >
                        {categories.map((category, categoryIndex) => (
                            <motion.div
                                key={category.categoryName}
                                className="flex flex-col items-center space-y-5 px-4" 
                                variants={categoryColumnVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ delay: categoryIndex * 0.1 }}
                            >
                                <h3 className="text-2xl font-semibold text-foreground text-center"> 
                                    {category.categoryName}
                                </h3>

                                <ul className="list-none grid grid-cols-2 gap-x-6 gap-y-4 md:flex md:flex-col md:items-center md:space-y-2"> 
                                    {category.skills.map((skill, skillIndex) => {
                                        const IconComponent = skill.iconName ? (iconMap[skill.iconName] || FaCode) : FaCode;
                                        const isLastItem = skillIndex === category.skills.length - 1;
                                        const isOddNumberOfSkills = category.skills.length % 2 !== 0;
                                        return (
                                            <motion.li 
                                                key={skill.name} 
                                                className={`flex items-center gap-4 ${
                                                  isOddNumberOfSkills && isLastItem ? 'md:flex md:items-center col-span-2 flex justify-center' : ''
                                                }`}
                                                variants={skillItemVariants}
                                            >
                                                <IconComponent className="h-6 w-6 flex-shrink-0 text-muted-foreground" /> 
                                                <span className="text-lg text-muted-foreground">{skill.name}</span> 
                                            </motion.li>
                                        )
                                    })}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

      </div>
    </motion.section>
  )
} 