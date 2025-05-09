import type { IconType } from 'react-icons'
import { FaEnvelope, FaGithub, FaLinkedin, FaRegCopy } from 'react-icons/fa'
import { SiVelog } from 'react-icons/si'

interface ContactLinkItem {
  name: string
  href: string
  IconComponent: IconType
  ariaLabel: string
  displayUrl?: string
  username?: string
}

export const contactData: ContactLinkItem[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/yongjun0702',
    IconComponent: FaGithub,
    ariaLabel: 'Visit my GitHub profile',
    displayUrl: 'github.com/yongjun0702',
    username: 'yongjun0702',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yongjun0702',
    IconComponent: FaLinkedin,
    ariaLabel: 'Visit my LinkedIn profile',
    displayUrl: 'linkedin.com/in/yongjun0702',
  },
  {
    name: 'Velog',
    href: 'https://velog.io/@yongjun0702',
    IconComponent: SiVelog,
    ariaLabel: 'Visit my Velog profile',
    displayUrl: 'velog.io/@yongjun0702',
    username: '@yongjun0702',
  },
  {
    name: 'Gmail',
    href: 'mailto:jo46453851@gmail.com',
    IconComponent: FaEnvelope,
    ariaLabel: 'Send me an email',
    displayUrl: 'jo46453851@gmail.com',
  },
]

export { FaRegCopy } 