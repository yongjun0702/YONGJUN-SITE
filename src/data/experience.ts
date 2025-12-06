import type { Experience } from '@/types/content';

export const experienceData: Experience[] = [
  {
    id: 'exp-1',
    company: '한국철도기술연구원 (Korea Railroad Research Institute)',
    role: '계약직',
    startDate: '2025-02',
    endDate: '2025-05',
    location: '대한민국 경기',
    introduction: '정부출연 연구기관 | 철도교통AX본부 철도AI융합연구실',
    contributions: [
      'GTFS 기반 대중교통 최적 경로 탐색 알고리즘(RAPTOR) 구현 및 최적화 연구',
      '대중교통 접근성 분석 플랫폼 (등시선도 시각화 및 최적 경로 탐색) 구축',
      '<철도산업 디지털 및 친환경 분야 핵심기술 개발>(과제코드: PK2503D2) 연구 참여'
    ],
    technologies: ['Python', 'JavaScript', 'FastAPI', 'Docker', 'AWS', 'Flask', 'Github Actions', 'CI/CD'],
    companyLogoUrl: '/images/logos/krri.png',
  },
  {
    id: 'exp-2',
    company: 'AIIA (IT 플랫폼 탐구·개발 동아리)',
    role: 'Flutter Unit Official Crew',
    startDate: '2024-01',
    endDate: '2025-03',
    location: '대한민국 경기',
    introduction: '교내 IT 플랫폼 탐구·개발 동아리',
    contributions: [
      'Flutter를 활용한 IOS/안드로이드 크로스 플랫폼 애플리케이션 개발',
      '정기적인 스터디와 세션 발표를 통한 기술 습득',
      '디자이너와의 협업을 위한 와이어프레임 제작',
      '애플리케이션 출시 및 유지보수 경험'
    ],
    technologies: ['Flutter', 'Dart', 'Figma', 'Firebase', 'Git', 'GitHub'],
    companyLogoUrl: '/images/logos/aiia.png',
  },
]; 