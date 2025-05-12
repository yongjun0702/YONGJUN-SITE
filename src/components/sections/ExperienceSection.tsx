'use client'

import { getAllExperience, getAllEducation, getAllActivities } from '@/lib/content'
import type { Experience, Education, Activity } from '@/types/content'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaGem } from "react-icons/fa";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 }
  },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' }
    },
}

const sectionTitle = 'Experience';
const activitiesTitle = 'Activities';

function formatDate(dateString?: string): string {
  if (!dateString) return ''
  if (dateString.toLowerCase() === 'present') return 'Present'
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}년 ${month}월`;
  } catch (e) {
    console.error("Error formatting date:", dateString, e);
    return dateString;
  }
}

function calculateDuration(startDate: string, endDate?: string): string | null {
  try {
    const start = new Date(startDate);
    const end = endDate && endDate.toLowerCase() !== 'present' ? new Date(endDate) : new Date();
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    months += 1;
    if (months === 12) {
        years++;
        months = 0;
    }

    let durationString = '';
    if (years > 0) {
        durationString += `${years}년 `;
    }
    if (months > 0) {
        durationString += `${months}개월`;
    }

    return durationString.trim() || null;

  } catch (e) {
    console.error("Error calculating duration:", startDate, endDate, e);
    return null;
  }
}

export function ExperienceSection() {
  const experiences: Experience[] = getAllExperience();
  const educationList: Education[] = getAllEducation();
  const activityList: Activity[] = getAllActivities();

  return (
    <motion.section
      id="experience"
      className='w-full bg-background px-4 py-16 md:px-6 md:py-24 lg:py-32'
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <div className="container mx-auto max-w-4xl space-y-16">
        <div className="mb-12 text-center md:mb-16">
          <div className="inline-block relative pb-5.5">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {sectionTitle} 
            </h2>
            <div className="absolute bottom-0 left-0 w-full h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-400"></div>
          </div>
        </div>

        {educationList.length > 0 && (
            <div className="relative">
                <div className="space-y-8">
                    {educationList.map((edu) => (
                        <motion.div
                            key={edu.id}
                            className="relative pl-4 md:pl-6"
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <div className="flex flex-row items-start gap-4 md:gap-6">
                                {edu.logoUrl && (
                                    <div className="md:mt-1 flex-shrink-0">
                                        <div className="relative h-16 w-16 overflow-hidden rounded-md p-1 md:h-20 md:w-20">
                                            <Image src={edu.logoUrl} alt={`${edu.institution} logo`} fill className="object-contain" sizes="(max-width: 768px) 64px, 80px" />
                                        </div>
                                    </div>
                                )}
                                <div className="flex-grow space-y-1.5">
                                    <h3 className="text-lg font-semibold text-foreground sm:text-xl">{edu.institution}</h3>
                                    <p className="font-medium text-primary">
                                        {edu.degree}
                                        {edu.fieldOfStudy && <span className="ml-2 text-sm font-normal text-muted-foreground">({edu.fieldOfStudy})</span>}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDate(edu.startDate)} - {formatDate(edu.endDate || 'Present')}
                                        {edu.location && <span className="ml-2"> · {edu.location}</span>}
                                    </p>
                                    {edu.description && <p className="pt-1 text-sm text-muted-foreground">{edu.description}</p>}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        )}

        {experiences.length > 0 && (
            <div className="relative">
                <div 
                  className="absolute left-[15px] top-[9px] bottom-[9px] w-0.5 bg-primary/30"
                  aria-hidden="true"
                ></div>

                <div className="space-y-8"> 
                    {experiences.map((exp) => {
                        const duration = calculateDuration(exp.startDate, exp.endDate);
                        
                        return (
                            <motion.div
                            key={exp.id}
                            className={`relative pl-8 md:pl-12`}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            >
                                <span className="absolute left-[8px] top-[9px] z-10 h-4 w-4 rounded-full bg-primary border-2 border-background"></span>
                                <div className="flex flex-col md:flex-row md:gap-6 md:items-start">
                                    {exp.companyLogoUrl && (
                                        <div className="mb-3 md:mb-0">
                                            <div className="relative h-16 w-28 flex-shrink-0 overflow-hidden">
                                                <Image src={exp.companyLogoUrl} alt={`${exp.company} logo`} fill className="object-contain" sizes="112px" />
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex-grow space-y-3">
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                                                {exp.company}
                                                {exp.role && <span className="ml-2 text-base font-normal text-secondary-foreground"> · {exp.role}</span>}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {formatDate(exp.startDate)} - {formatDate(exp.endDate || 'Present')}
                                                {duration && <span className="ml-2"> · {duration}</span>}
                                            </p>
                                            {exp.location && <p className="text-sm text-muted-foreground/80">{exp.location}</p>}
                                        </div>
                                        {exp.introduction && <p className="text-sm text-muted-foreground">{exp.introduction}</p>}
                                        {exp.contributions && exp.contributions.length > 0 && (
                                            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                                                {exp.contributions.map((contrib: string, i: number) => <li key={i}>{contrib}</li>)}
                                            </ul>
                                        )}
                                        {exp.technologies && exp.technologies.length > 0 && (
                                            <div className="flex items-center gap-2 text-sm text-secondary-foreground">
                                                <FaGem className="h-3.5 w-3.5 flex-shrink-0 text-primary/80" />
                                                <span>{exp.technologies.join(', ')}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        )}

        {activityList.length > 0 && (
          <motion.div 
            className=""
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
           >
            <h3 className="mb-8 text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {activitiesTitle}
            </h3>
            <div className="space-y-2">
              {activityList.map((activity) => (
                <div key={activity.id} className="text-sm">
                  <span className="font-medium text-muted-foreground tabular-nums mr-2">{activity.date}</span>
                  <span className="font-medium text-secondary-foreground">
                    {activity.title}
                    {activity.details && <span className="ml-1.5 font-normal text-muted-foreground">{activity.details}</span>}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </motion.section>
  )
}
