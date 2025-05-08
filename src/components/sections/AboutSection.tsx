'use client'

import { motion, useInView } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { useRef, useState, useEffect } from 'react'

const aboutContent = {
  paragraph1:
    '가치를 생각하는 열정 있는 개발자입니다.',
  paragraph2:
    '다양한 플랫폼 생태계에 대한 깊은 관심을 바탕으로,',
  paragraph3:
    '사람들의 일상에 가치를 더할 수 있는 어플리케이션을',
  paragraph4:
    '만들어가는 과정에서 큰 보람을 느끼고 있습니다.',
}

const typingSpeed = 50;
const p1TypingDuration = aboutContent.paragraph1.length * typingSpeed / 1000;
const fadeInDelayOffset = 0.6;

export function AboutSection() {
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.3 });

  const [p1Sequence, setP1Sequence] = useState<Array<string | number>>([]);
  const [startFadeIn, setStartFadeIn] = useState(false);

  useEffect(() => {
    let fadeInTimer: NodeJS.Timeout;
    if (isInView) {
      setP1Sequence([aboutContent.paragraph1]);
      
      const totalDelayMs = (p1TypingDuration + fadeInDelayOffset) * 1000;
      
      fadeInTimer = setTimeout(() => {
        setStartFadeIn(true);
      }, totalDelayMs);
    }
    return () => clearTimeout(fadeInTimer);
  }, [isInView]);

  return (
    <section
      id="about"
      className='w-full bg-background px-4 py-16 md:px-6 md:py-24 lg:py-32 mb-32'
    >
      <div ref={contentRef} className="container mx-auto max-w-3xl space-y-1 text-center">
        <p className="text-base xs:text-2xl sm:text-2xl md:text-2xl font-semibold text-foreground mb-6">
          {p1Sequence.length > 0 && (
            <TypeAnimation
              sequence={p1Sequence}
              wrapper="span"
              speed={typingSpeed}
              repeat={0}
              cursor={true}
            />
          )}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={startFadeIn ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm xs:text-xl sm:text-lg md:text-lg text-muted-foreground">
            {aboutContent.paragraph2}
          </p>
          <p className="text-sm xs:text-xl sm:text-lg md:text-lg text-muted-foreground">
            {aboutContent.paragraph3}
          </p>
          <p className="text-sm xs:text-xl sm:text-lg md:text-lg text-muted-foreground">
            {aboutContent.paragraph4}
          </p>
        </motion.div>
      </div>
    </section>
  )
} 