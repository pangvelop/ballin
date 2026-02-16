# prompt_plan.md — Ballin 구현 계획

> **작성일:** 2026-02-07
> **마지막 동기화:** 2026-02-16
> **진행률:** 67/68 완료 (98.5%)

---

## Phase 1: 프로젝트 셋업 & 핵심 인프라 ✅

### Milestone 1.1: 프로젝트 초기화

- [x] **Task 1.1** — Next.js 15 프로젝트 생성 (App Router, TypeScript)
- [x] **Task 1.2** — Tailwind CSS 설정 (darkMode: 'class', 커스텀 컬러 팔레트)
- [x] **Task 1.3** — ESLint + Prettier 설정 (semi: false, singleQuote: true)
- [x] **Task 1.4** — tsconfig.json strict mode + path alias (`@/*`)
- [x] **Task 1.5** — 디렉토리 구조 생성 (`app/`, `content/`, `components/`, `lib/`)
- [x] **Task 1.6** — .gitignore, .prettierrc, .eslintrc 설정

### Milestone 1.2: MDX 콘텐츠 시스템

- [x] **Task 1.7** — MDX 파서 라이브러리 설치 및 설정 (next-mdx-remote 또는 contentlayer)
- [x] **Task 1.8** — `lib/content.ts` 구현 — MDX 파일 읽기/파싱 유틸리티
  - `getAllRules()`: content/rules/ 하위 모든 MDX 파일의 프론트매터 반환
  - `getRuleBySlug(category, slug)`: 특정 룰 MDX 파일 파싱 (프론트매터 + 본문)
  - `getAllTraining()`, `getTrainingBySlug()`: 연습법 동일 패턴
  - `getAllRoutines()`, `getRoutineBySlug()`: 루틴 동일 패턴
  - `getAllGlossaryTerms()`: 용어사전 데이터
- [x] **Task 1.9** — MDX 프론트매터 TypeScript 타입 정의
  - `RuleFrontmatter`, `TrainingFrontmatter`, `RoutineFrontmatter`, `GlossaryTerm`
- [x] **Task 1.10** — 샘플 MDX 콘텐츠 2~3개 작성 (테스트용)
  - `content/rules/violations/traveling.mdx`
  - `content/rules/fouls/personal-foul.mdx`
  - `content/training/individual-skills/crossover-dribble.mdx`

### Milestone 1.3: 공통 레이아웃

- [x] **Task 1.11** — `app/layout.tsx` — 루트 레이아웃 (HTML 구조, 폰트, 메타데이터)
- [x] **Task 1.12** — `components/layout/Header.tsx` — 헤더 (로고, 네비게이션, 검색바 자리)
- [x] **Task 1.13** — `components/layout/Footer.tsx` — 푸터 (사이트 정보, 링크)
- [x] **Task 1.14** — `components/layout/Breadcrumb.tsx` — 빵크럼 네비게이션
- [x] **Task 1.15** — 모바일 반응형 네비게이션 (햄버거 메뉴)

**의존성:** Task 1.7~1.10 완료 후 Phase 2 진행 가능

---

## Phase 2: 룰북 섹션 (MVP 핵심) ✅

### Milestone 2.1: 룰북 페이지 구조

- [x] **Task 2.1** — `app/rules/page.tsx` — 룰 카테고리 9개 목록 페이지
  - 카드 그리드 레이아웃 (카테고리명, 아이콘, 간단 설명)
- [x] **Task 2.2** — `app/rules/[category]/page.tsx` — 카테고리별 룰 목록
  - `generateStaticParams` 구현 (9개 카테고리)
  - 난이도 배지 표시
- [x] **Task 2.3** — `app/rules/[category]/[slug]/page.tsx` — 개별 룰 상세 페이지
  - `generateStaticParams` 구현 (모든 룰 파일)
  - `generateMetadata` 구현 (SEO)

### Milestone 2.2: 룰 전용 컴포넌트

- [x] **Task 2.4** — `components/rules/RuleCompare.tsx` — FIBA/NBA 탭 전환
  - 탭 UI (FIBA | NBA)
  - URL query 기반 상태 관리 (`?league=fiba`)
  - 비교 모드는 Phase 3에서 추가 (여기서는 탭만)
- [x] **Task 2.5** — `components/rules/RuleCard.tsx` — 룰 목록 카드
  - 제목, 한 줄 요약, 난이도 배지, 카테고리 태그
- [x] **Task 2.6** — `components/common/DifficultyBadge.tsx` — 난이도 표시 (🟢🟡🔴)
- [x] **Task 2.7** — `components/common/VideoEmbed.tsx` — YouTube 임베드
  - loading="lazy", 반응형 16:9
- [x] **Task 2.8** — `components/common/InfoBox.tsx` — 강조 박스 (헷갈리는 포인트)

### Milestone 2.3: 룰북 콘텐츠 작성 (Phase별 우선순위)

> MVP에서는 카테고리당 2~3개 핵심 룰만 작성. 나머지는 이후 점진적 추가.

- [x] **Task 2.9** — `content/rules/game-basics/` — 기본 규칙 콘텐츠 (5개)
  - court-and-lines.mdx (코트 규격 & 라인 명칭)
  - scoring-system.mdx (점수 체계)
  - player-composition.mdx (선수 구성 & 교체)
- [x] **Task 2.10** — `content/rules/five-on-five/` — 5대5 룰 콘텐츠 (4개)
- [x] **Task 2.11** — `content/rules/three-on-three/` — 3대3 룰 콘텐츠 (3개)
- [x] **Task 2.12** — `content/rules/violations/` — 바이올레이션 콘텐츠 (8개)
  - traveling.mdx, double-dribble.mdx, shot-clock.mdx, goaltending.mdx
- [x] **Task 2.13** — `content/rules/fouls/` — 파울 콘텐츠 (5개)
  - personal-foul.mdx, team-foul-bonus.mdx, technical-foul.mdx, flagrant-foul.mdx
- [x] **Task 2.14** — `content/rules/positions/` — 포지션 콘텐츠 (3개, 초급/중급/고급 3단계 구성)
- [x] **Task 2.15** — `content/rules/tactics-rules/` — 전술 관련 룰 (3개)
- [x] **Task 2.16** — `content/rules/sportsmanship/` — 스포츠맨십 (3개)
- [x] **Task 2.17** — `content/rules/special-situations/` — 특수 상황 (3개)

### Milestone 2.4: 홈페이지

- [x] **Task 2.18** — `app/page.tsx` — 홈페이지 구현
  - 프로젝트 소개 섹션
  - 추천 콘텐츠 카드 (인기 룰 3~4개)
  - 빠른 바로가기 (초보자 시작 가이드)
  - 검색바 자리 (기능은 Phase 2에서)

**의존성:** Phase 2 완료 = MVP 배포 가능 상태

---

## Phase 3: 연습법 & 용어사전 & 검색 ✅

### Milestone 3.1: 연습법 페이지 구조

- [x] **Task 3.1** — `app/training/page.tsx` — 연습법 카테고리 3개 목록
- [x] **Task 3.2** — `app/training/[category]/page.tsx` — 카테고리별 연습법 목록
- [x] **Task 3.3** — `app/training/[category]/[slug]/page.tsx` — 개별 연습법 페이지

### Milestone 3.2: 연습법 컴포넌트

- [x] **Task 3.4** — `components/training/DrillCard.tsx` — 연습법 카드
  - 제목, 난이도, 소요 시간, 필요 장비
- [x] **Task 3.5** — 개별 연습법 페이지 레이아웃
  - 단계별 설명, 영상, 흔한 실수 (InfoBox 재활용)

### Milestone 3.3: 연습법 콘텐츠 작성

- [x] **Task 3.6** — `content/training/individual-skills/` — 개인 스킬 (10개)
  - ball-handling/crossover-dribble.mdx
  - shooting/shooting-form.mdx
  - defense/slide-step.mdx
- [x] **Task 3.7** — `content/training/team-tactics/` — 팀 전술 (5개)
  - pick-and-roll.mdx, man-to-man-defense.mdx
- [x] **Task 3.8** — `content/training/fitness/` — 체력 (4개)
  - court-running.mdx, agility-drills.mdx

### Milestone 3.4: 용어사전

- [x] **Task 3.9** — `app/glossary/page.tsx` — 용어사전 페이지
  - 가나다/A-Z 정렬
  - 검색 + 필터
- [x] **Task 3.10** — `components/glossary/GlossarySearch.tsx` — 용어 검색 컴포넌트
- [x] **Task 3.11** — `content/glossary/` — 용어 데이터 (99개 용어)

### Milestone 3.5: 통합 검색 & 난이도 필터

- [x] **Task 3.12** — `lib/search.ts` — 검색 인덱스 구축
  - 빌드 시 MDX 프론트매터 기반 인덱스 생성
  - 룰/연습법/용어 통합 검색
- [x] **Task 3.13** — `components/common/SearchBar.tsx` — 헤더 검색바 구현
  - 타이핑 시 실시간 필터링 (디바운스)
  - 검색 결과 드롭다운 (카테고리별 그룹)
- [x] **Task 3.14** — `components/common/FilterBar.tsx` — 난이도 필터
  - 초급/중급/고급 토글 버튼
  - 목록 페이지(rules, training)에 적용

---

## Phase 4: 사용성 강화 ✅

### Milestone 4.1: FIBA/NBA 비교 모드

- [x] **Task 4.1** — `RuleCompare.tsx` 확장 — 비교 모드 추가
  - 상단 토글 스위치 (탭 모드 ↔ 비교 모드)
  - 나란히 표시 (데스크톱: 좌우, 모바일: 상하)
  - 차이점 하이라이트

### Milestone 4.2: 추천 루틴

- [x] **Task 4.2** — `app/routines/page.tsx` — 루틴 목록 페이지
- [x] **Task 4.3** — `app/routines/[slug]/page.tsx` — 개별 루틴 페이지
- [x] **Task 4.4** — `components/training/RoutineView.tsx` — 루틴 조합 뷰
  - 포함된 드릴 목록, 순서, 세트 수, 쉬는 시간
  - 각 드릴 클릭 시 연습법 페이지로 이동
- [x] **Task 4.5** — `content/routines/` — 루틴 콘텐츠 (8개)
  - shooting-30min.mdx, ball-handling-20min.mdx, pregame-warmup-15min.mdx

### Milestone 4.3: 북마크

- [x] **Task 4.6** — `lib/bookmarks.ts` — localStorage 기반 북마크 관리
  - addBookmark, removeBookmark, getBookmarks, isBookmarked
- [x] **Task 4.7** — `components/common/BookmarkButton.tsx` — 북마크 토글 버튼
  - 룰/연습법/루틴 페이지에 배치
- [x] **Task 4.8** — 홈페이지에 북마크 콘텐츠 바로가기 섹션 추가

### Milestone 4.4: 다크모드

- [x] **Task 4.9** — 다크모드 구현 (next-themes 또는 커스텀)
  - Tailwind `dark:` 클래스 전체 적용
  - localStorage에 테마 저장
  - 헤더에 토글 스위치

---

## Phase 5: 배포 & 최적화 (3개 미완료)

### Milestone 5.1: SEO & 성능

- [x] **Task 5.1** — 전체 페이지 `generateMetadata` 검증
  - title, description, openGraph
- [x] **Task 5.2** — `sitemap.xml` 자동 생성 (`app/sitemap.ts`)
- [x] **Task 5.3** — `robots.txt` 설정 (`app/robots.ts`)
- [x] **Task 5.4** — 이미지 최적화 — SVG 파비콘, OG 이미지, Apple 터치 아이콘 (ImageResponse + force-static)
- [x] **Task 5.5** — Lighthouse 전 페이지 90+ 달성 (CLS 수정, 접근성 개선)

### Milestone 5.2: CI/CD

- [x] **Task 5.6** — GitHub Actions CI 설정
  - Lint → TypeCheck → Build
  - PR 트리거
- [ ] **Task 5.7** — Vercel 배포 설정 (main 브랜치 자동 배포)

### Milestone 5.3: 콘텐츠 완성

- [x] **Task 5.8** — 룰북 콘텐츠 보충 (카테고리당 최소 3개) — 37개 룰
- [x] **Task 5.9** — 연습법 콘텐츠 보충 (카테고리당 최소 3개) — 19개 연습법
- [x] **Task 5.10** — 용어사전 50개 이상 확보 — 99개 용어
- [x] **Task 5.11** — YouTube 영상 링크 큐레이션 (룰/연습법별 1~2개)
- [x] **Task 5.12** — 전체 콘텐츠 교차 링크 검증 (relatedRules, relatedDrills)

---

## 병렬 개발 가이드

동시 작업 가능한 Task 그룹:

| 그룹 | Task | 설명 |
|------|------|------|
| **A (셋업)** | 1.1~1.6 | 프로젝트 초기화, 빌드 도구 |
| **B (콘텐츠 시스템)** | 1.7~1.10 | MDX 파서, 타입, 샘플 데이터 |
| **C (레이아웃)** | 1.11~1.15 | Header, Footer, Breadcrumb |
| **D (룰 콘텐츠)** | 2.9~2.17 | MDX 파일 작성 (B 완료 후) |
| **E (연습법 콘텐츠)** | 3.6~3.8 | MDX 파일 작성 (B 완료 후) |

- 그룹 A → B → C 순서로 진행 (의존성)
- 그룹 D, E는 B 완료 후 독립적으로 병렬 가능
- Git Worktree로 동시 작업: `git worktree add ../bg-content feature/content`

---

## Task 총계

| Phase | Task 수 | 완료 | 핵심 산출물 |
|-------|---------|------|-------------|
| Phase 1 | 15 | 15 ✅ | 프로젝트 뼈대, MDX 시스템, 레이아웃 |
| Phase 2 | 18 | 18 ✅ | 룰북 페이지 + 콘텐츠, 홈페이지 (= MVP) |
| Phase 3 | 14 | 14 ✅ | 연습법, 용어사전, 검색, 필터 |
| Phase 4 | 9 | 9 ✅ | 비교 모드, 루틴, 북마크, 다크모드 |
| Phase 5 | 12 | 11 | SEO, CI/CD, 콘텐츠 완성 |
| **합계** | **68** | **67** | **98.5% 완료** |

### 남은 Task (1개)

| Task | 설명 | 비고 |
|------|------|------|
| 5.7 | Vercel 배포 설정 | Vercel 프리뷰 배포 실패 이슈 해결 필요 |

### 콘텐츠 현황

| 콘텐츠 타입 | 개수 |
|------------|------|
| 룰북 | 37개 (9개 카테고리) |
| 연습법 | 19개 (3개 카테고리) |
| 루틴 | 8개 |
| 용어사전 | 99개 |
| **합계** | **163개** |

### 테스트 현황

| 테스트 타입 | 개수 |
|------------|------|
| 단위/컴포넌트 (Vitest) | 127개 |
| E2E (Playwright) | 28개 |
| **합계** | **155개** |
