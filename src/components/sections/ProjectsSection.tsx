'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getAllProjects } from '@/lib/content'
import type { Project } from '@/types/content'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaApple, FaGooglePlay } from 'react-icons/fa'
import { SiVelog } from 'react-icons/si'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      const updateMatch = () => setMatches(media.matches);
      updateMatch();
      media.addEventListener('change', updateMatch);
      return () => media.removeEventListener('change', updateMatch);
    }
  }, [query]);

  return matches;
}

const getTextDetailsVariants = (isMobile: boolean) => ({
  hidden: { opacity: 0, maxHeight: 0, transition: { duration: isMobile ? 0.3 : 0.15 } },
  visible: { opacity: 1, maxHeight: '1000px', transition: { duration: isMobile ? 0.4 : 0.2 } },
  exit: { opacity: 0, maxHeight: 0, transition: { duration: isMobile ? 0.3 : 0.3, ease: isMobile ? "easeInOut" : [0.4, 0, 0.2, 1] } },
});

const getCarouselVariants = (isMobile: boolean) => ({
  hidden: { opacity: 0, transition: { duration: isMobile ? 0.2 : 0.15 } },
  visible: { opacity: 1, transition: { duration: isMobile ? 0.3 : 0.2, delay: isMobile ? 0 : 0.4 } },
});

const mobileExpandedImageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

interface CustomBadgeProps {
  children: React.ReactNode;
  className?: string;
  borderColorClass?: string;
}

function CustomBadge({ children, className = '', borderColorClass = 'border-transparent' }: CustomBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border ${borderColorClass} ${className}`.trim()}
    >
      {children}
    </span>
  );
}

const sectionTitle = 'Projects';

const projectCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const titleContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut", delay: 0.1 }
  },
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 1,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 1,
  }),
};

export function ProjectsSection() {
  const projects: Project[] = getAllProjects();
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const [carouselIndices, setCarouselIndices] = useState<Record<string, number>>({});
  const [swipeAnimationDirection, setSwipeAnimationDirection] = useState<Record<string, number>>({});
  const isMobile = useMediaQuery('(max-width: 767px)');

  const wheelTimeoutRef = useRef<Record<string, ReturnType<typeof setTimeout> | null>>({});

  const isDraggingRef = useRef(false);

  const toggleExpand = (projectId: string) => {
    setExpandedProjects(prev => ({ ...prev, [projectId]: !prev[projectId] }));
    if (!(expandedProjects[projectId])) {
        setCarouselIndices(prev => ({ ...prev, [projectId]: 1 }));
        setSwipeAnimationDirection(prev => ({ ...prev, [projectId]: 0 }));
    }
  };

  const handleCarouselNav = useCallback((projectId: string, direction: 'prev' | 'next', imageCount: number) => {
    setSwipeAnimationDirection(prev => ({ ...prev, [projectId]: direction === 'next' ? 1 : -1 }));
    setCarouselIndices(prev => {
      const currentIdx = prev[projectId] || 1;
      let nextIdx: number;
      if (direction === 'next') {
        nextIdx = currentIdx === imageCount - 1 ? 1 : currentIdx + 1;
      } else {
        nextIdx = currentIdx === 1 ? imageCount - 1 : currentIdx - 1;
      }
      return { ...prev, [projectId]: nextIdx };
    });
  }, [setCarouselIndices, setSwipeAnimationDirection]);

  useEffect(() => {
    const timeoutsAtEffectRun = wheelTimeoutRef.current; 
    return () => {
      Object.values(timeoutsAtEffectRun).forEach(timeoutId => { 
        if (timeoutId) clearTimeout(timeoutId);
      });
    };
  }, []);

  return (
    <section
      id="projects"
      className='w-full bg-background px-4 py-16 md:px-6 md:py-24 lg:py-32'
    >
      <div className="container mx-auto max-w-6xl space-y-16 md:space-y-20">
        <motion.div
          className="mb-12 text-center md:mb-16"
          variants={titleContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="inline-block relative pb-5.5">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-5xl">
              {sectionTitle}
            </h2>
            <div className="absolute bottom-0 left-0 w-full h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-400"></div>
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {projects.map((project) => {
            const isExpanded = expandedProjects[project.id] || false;
            const hasImages = project.images && project.images.length > 0;
            const currentCarouselIndex = carouselIndices[project.id] || 1;
            const layoutId = `project-image-${project.id}`;

            const textVariants = getTextDetailsVariants(isMobile);
            const carouselAnimVariants = getCarouselVariants(isMobile);

            return (
              <motion.div
                layout="position"
                key={project.id}
                variants={projectCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                onClick={() => {
                  if (!isDraggingRef.current) {
                    toggleExpand(project.id);
                  }
                  isDraggingRef.current = false;
                }}
                className={`relative w-full max-w-5xl rounded-lg border border-border bg-card transition-colors hover:border-primary overflow-hidden cursor-pointer ${
                  isExpanded
                    ? `grid grid-cols-1 md:grid-cols-2 items-center gap-0 md:gap-8 p-6 md:p-8`
                    : 'flex flex-col md:flex-row p-6 md:p-8 md:gap-0'
                }`}
              >
                <div 
                  className={`flex flex-col gap-4 ${isExpanded ? 'md:col-span-1 md:self-start' : 'w-full md:w-[50%] md:pr-8'}`}
                >
                  <div> 
                      <h3 className="text-xl font-semibold text-foreground sm:text-2xl">{project.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{project.period}</p>
                      {project.statusTags && project.statusTags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                              {project.statusTags.map((tag) => (
                                  <CustomBadge 
                                    key={tag} 
                                    className="rounded-full bg-secondary text-secondary-foreground px-3"
                                    borderColorClass="border-transparent"
                                  >
                                    {tag}
                                  </CustomBadge>
                              ))}
                          </div>
                      )}
                  </div>
                  {(project.githubUrl  || project.appStoreUrl || project.playStoreUrl || project.liveUrl || project.velogUrl) && (
                       <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                           {project.githubUrl && (<Link href={project.githubUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"><FaGithub className="h-4 w-4" /> GitHub</Link>)}
                           {project.appStoreUrl && (<Link href={project.appStoreUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"><FaApple className="h-4 w-4" /> App Store</Link>)}
                           {project.playStoreUrl && (<Link href={project.playStoreUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"><FaGooglePlay className="h-4 w-4" /> Play Store</Link>)}
                           {project.liveUrl && (<Link href={project.liveUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"><FaExternalLinkAlt className="h-4 w-4" /> Live Demo</Link>)}
                           {project.velogUrl && (<Link href={project.velogUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"><SiVelog className="h-4 w-4" /> Velog</Link>)}
                       </div>
                   )}

                  <button
                    onClick={(e) => { e.stopPropagation(); toggleExpand(project.id); }}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:w-auto md:self-start"
                    aria-expanded={isExpanded}
                    aria-controls={`project-details-${project.id}`}
                  >
                    {isExpanded ? '간략히 보기' : '자세히 보기'}
                    {isExpanded ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="details-text"
                        id={`project-details-${project.id}`}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden space-y-4"
                      >
                        {project.introduction && (
                          <div className="border-l-4 border-primary/80 pl-4">
                            <h4 className="text-md mb-1 font-semibold text-foreground">소개</h4>
                            <p className="text-sm text-muted-foreground">{project.introduction}</p>
                          </div>
                        )}
                        {(project.teamInfo || project.myRole) && (
                           <div className="border-l-4 border-primary/80 pl-4">
                             <h4 className="text-md mb-1 font-semibold text-foreground">팀 및 역할</h4>
                             {project.teamInfo && <p className="text-sm text-muted-foreground">{project.teamInfo}</p>}
                             {project.myRole && <p className="text-sm text-muted-foreground mt-1">{project.myRole}</p>}
                           </div>
                        )}
                        {project.keyFeatures && project.keyFeatures.length > 0 && (
                           <div className="border-l-4 border-primary/80 pl-4">
                             <h4 className="text-md mb-1 font-semibold text-foreground">주요 기능</h4>
                             <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                               {project.keyFeatures.map((feature, index) => <li key={index}>{feature}</li>)}
                             </ul>
                           </div>
                        )}
                        {project.technologies && project.technologies.length > 0 && (
                           <div className="border-l-4 border-primary/80 pl-4">
                             <h4 className="text-md mb-1 font-semibold text-foreground">사용 기술</h4>
                             <div className="flex flex-wrap gap-1.5">
                               {project.technologies.map((tech) => (
                                <CustomBadge 
                                  key={tech} 
                                  className="bg-secondary text-secondary-foreground"
                                  borderColorClass="border-border"
                                >
                                  {tech}
                                </CustomBadge>
                              ))}
                             </div>
                           </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className={`relative ${ 
                  isExpanded 
                    ? (isMobile ? 'w-full mt-4' : 'md:col-span-1 flex flex-col justify-center mt-4 md:mb-4 md:mt-4')
                    : (isMobile ? 'w-full aspect-video mt-6' : 'w-full aspect-video mt-4 md:mt-0 md:w-[50%] md:absolute md:top-0 md:right-0 md:h-full')
                }`}
                  onClick={(e) => {
                    if (isExpanded) {
                      e.stopPropagation();
                    }
                  }}
                > 
                    {isMobile ? (
                        <AnimatePresence mode="wait" initial={false}>
                            {!isExpanded && hasImages && (
                                <div
                                    key="mobile-thumbnail-static"
                                    className="relative w-full aspect-video overflow-hidden rounded-lg isolate"
                                >
                                    <Image
                                        src={project.images![0]}
                                        alt={`${project.title} thumbnail`}
                                        fill
                                        className="object-cover"
                                        priority 
                                        sizes="100vw"
                                    />
                                </div>
                            )}
                            {isExpanded && (
                                <motion.div
                                    key="mobile-expanded-animated"
                                    variants={mobileExpandedImageVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="flex flex-col mt-2"
                                >
                                    {hasImages && (
                                      <div 
                                        onClick={(e) => e.stopPropagation()}
                                        className="relative aspect-video w-full overflow-hidden rounded-lg border border-border"
                                      >
                                        <Image
                                          src={project.images![0]}
                                          alt={`${project.title} image 1`}
                                          fill
                                          className="object-cover rounded-lg"
                                          sizes="100vw"
                                          priority
                                        />
                                      </div>
                                    )}
                                    {project.images && project.images.length > 1 && (
                                        <div
                                          className={`relative aspect-video w-full overflow-hidden rounded-lg mt-4 border border-border isolate`}
                                        >
                                          <AnimatePresence initial={false} custom={swipeAnimationDirection[project.id] || 0}>
                                             <motion.div
                                                key={currentCarouselIndex}
                                                custom={swipeAnimationDirection[project.id] || 0}
                                                variants={slideVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{
                                                  x: { type: "tween", duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                                                  opacity: { duration: 0.3 },
                                                  scale: { duration: 0.2 }
                                                }}
                                                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                                                style={{ zIndex: 2 }}
                                                onDragStart={() => { isDraggingRef.current = true; }}
                                                drag="x"
                                                dragConstraints={{ left: 0, right: 0 }}
                                                dragElastic={0.15}
                                                onDragEnd={(e, { offset, velocity }) => {
                                                  isDraggingRef.current = false;
                                                  e.stopPropagation();
                                                  const swipeDistanceThreshold = 50;
                                                  const swipeVelocityThreshold = 300;

                                                  const swipe = Math.abs(offset.x);
                                                  const velocityVal = Math.abs(velocity.x);

                                                  if (swipe > swipeDistanceThreshold) {
                                                      handleCarouselNav(project.id, offset.x > 0 ? 'prev' : 'next', project.images!.length);
                                                  } else if (velocityVal > swipeVelocityThreshold) {
                                                      handleCarouselNav(project.id, velocity.x > 0 ? 'prev' : 'next', project.images!.length);
                                                  }
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                             >
                                                <Image draggable="false" src={project.images![currentCarouselIndex]} alt={`${project.title} image ${currentCarouselIndex + 1}`} fill className="object-cover rounded-lg" sizes="100vw" />
                                             </motion.div>
                                          </AnimatePresence>
                                          {project.images.length > 2 && (
                                            <>
                                               <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white z-10 pointer-events-none">{currentCarouselIndex} / {project.images!.length - 1}</div>
                                            </>
                                          )}
                                        </div>
                                    )}
                                    {!hasImages && ( 
                                        <div className="w-full h-20 bg-muted rounded-lg mt-4 flex items-center justify-center text-sm text-muted-foreground">
                                            (No images available)
                                        </div>
                                    )}
                                </motion.div>
                            )}
                            {!isExpanded && !hasImages && (
                                <div key="mobile-no-image-placeholder" />
                            )}
                        </AnimatePresence>
                    ) : (
                        <>
                          <AnimatePresence initial={false} mode="wait">
                            {hasImages ? (
                              <motion.div
                                key={isExpanded ? "expanded-image-0" : "thumbnail"} 
                                layoutId={layoutId} 
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                className={`overflow-hidden ${ 
                                  isExpanded 
                                    ? 'relative aspect-video w-full rounded-lg border border-border' 
                                    : 'relative w-full h-full rounded-lg md:absolute md:inset-0 md:rounded-none md:border-l md:border-border'
                                }`}
                                onClick={isExpanded ? (e) => e.stopPropagation() : undefined}
                              >
                                <Image
                                  src={project.images![0]}
                                  alt={isExpanded ? `${project.title} image 1` : `${project.title} thumbnail`}
                                  fill
                                  className={'object-cover'}
                                  priority 
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </motion.div>
                             ) : (
                               isExpanded && (
                                  <div key="placeholder-no-image-desktop" className="md:col-span-1 mt-6 md:mt-4 flex items-center justify-center text-sm text-muted-foreground h-40 bg-muted rounded-lg">
                                    (No images available)
                                  </div>
                               )
                             )
                            }
                          </AnimatePresence>
                          <AnimatePresence initial={false}>
                            {isExpanded && project.images && project.images.length > 1 && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                              >
                                <motion.div
                                  key="carousel-desktop-wrapper"
                                  variants={carouselAnimVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="hidden"
                                  className={`relative aspect-video w-full overflow-hidden rounded-lg mt-4 border border-border isolate`}
                                >
                                  <AnimatePresence initial={false} custom={swipeAnimationDirection[project.id] || 0}>
                                     <motion.div
                                        key={currentCarouselIndex}
                                        custom={swipeAnimationDirection[project.id] || 0}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                          x: { type: "tween", duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                                          opacity: { duration: 0.3 },
                                          scale: { duration: 0.2 }
                                        }}
                                        className="absolute inset-0 cursor-grab active:cursor-grabbing"
                                        style={{ zIndex: 2 }}
                                        onDragStart={() => { isDraggingRef.current = true; }}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        dragElastic={0.15}
                                        onDragEnd={(e, { offset, velocity }) => {
                                          isDraggingRef.current = false;
                                          e.stopPropagation();
                                          const swipeDistanceThreshold = 50;
                                          const swipeVelocityThreshold = 300;

                                          const swipe = Math.abs(offset.x);
                                          const velocityVal = Math.abs(velocity.x);

                                          if (swipe > swipeDistanceThreshold) {
                                              handleCarouselNav(project.id, offset.x > 0 ? 'prev' : 'next', project.images!.length);
                                          } else if (velocityVal > swipeVelocityThreshold) {
                                              handleCarouselNav(project.id, velocity.x > 0 ? 'prev' : 'next', project.images!.length);
                                          }
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Image draggable="false" src={project.images![currentCarouselIndex]} alt={`${project.title} image ${currentCarouselIndex + 1}`} fill className="object-cover rounded-lg" sizes="(max-width: 768px) 100vw, 50vw" />
                                     </motion.div>
                                  </AnimatePresence>
                                  {project.images.length > 2 && (
                                    <>
                                       <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white z-10 pointer-events-none">{currentCarouselIndex} / {project.images!.length - 1}</div>
                                    </>
                                  )}
                                </motion.div>
                              </div>
                            )}
                          </AnimatePresence>
                        </>
                    )}                    
                </div>

              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}