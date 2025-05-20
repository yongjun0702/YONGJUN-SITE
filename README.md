# YONGJUN-SITE

Next.js와 Supabase를 활용한 개인 포트폴리오 및 블로그 웹사이트입니다.<br>
https://yongjun.site

## 🚀 주요 기능

### 블로그 기능
- 마크다운 기반 컨텐츠 작성 및 관리
- 태그 기반 포스트 필터링 및 검색
- 반응형 디자인 (PC/모바일)

### 관리자 기능
- 관리자 인증 및 로그인 시스템
- 블로그 포스트 작성, 수정, 삭제 기능
- 마크다운 에디터 내장

### 기타 기능
- 다크 모드 / 라이트 모드 지원
- SEO 최적화
- 애니메이션 효과

## 🛠️ 기술 스택

### 프론트엔드
- **Next.js 15**: App Router, Server Components 활용
- **TailwindCSS 4**: 스타일링 시스템
- **Framer Motion**: 애니메이션 효과
- **react-markdown**: 마크다운 렌더링
- **next-themes**: 다크/라이트 모드 구현

### 백엔드
- **Supabase**: 데이터베이스 및 인증 시스템
- **Next.js API Routes**: 서버리스 함수

### 배포
- **Vercel**: 웹사이트 호스팅

## 📂 프로젝트 구조

```
src/
├── app/             # 페이지 및 라우팅
│   ├── blog/        # 블로그 관련 페이지
│   ├── admin/       # 관리자 페이지
│   └── ...
├── components/      # 컴포넌트
├── lib/            # 유틸리티 및 헬퍼 함수
│   ├── supabase/   # Supabase 클라이언트 설정
│   └── ...
├── data/           # 정적 데이터
└── types/          # TypeScript 타입 정의
```

## 구동 화면
### 💻 PC 버전
<p align="center" style="display: flex; justify-content: center;">
  <img width="100%" alt="site" src="https://github.com/user-attachments/assets/bbed7397-ee9e-4e2f-88c8-e4bfa0373b9f" />
</p>

<br>

### 📱 모바일 버전
<p align="center" style="display: flex; justify-content: center;">
  <img width="100%" alt="site_02" src="https://github.com/user-attachments/assets/e26ce637-22d0-4a6d-b6cc-5d3390e17fd5" />
</p>
