# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**Ballin** — 농구 룰(FIBA/NBA)과 연습법을 체계적으로 정리한 콘텐츠 중심 웹앱.
입문자~중급자가 코트에서 스마트폰으로 바로 참고할 수 있도록 모바일 퍼스트 설계.
- **저장소:** https://github.com/pangvelop/ballin
- **배포:** Vercel (추후 설정)

## 기술 스택

| 레이어 | 기술 |
|--------|------|
| **Framework** | Next.js 15 (App Router) + React 19 |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS |
| **Content** | MDX (마크다운 + JSX) |
| **Testing** | Vitest + React Testing Library (단위/컴포넌트), Playwright (E2E) |
| **Deploy** | Vercel |

## 핵심 명령어

```bash
# 개발
npm run dev              # 개발 서버 (localhost:3000)
npm run build            # 프로덕션 빌드 (SSG)
npm run lint             # ESLint 실행
npm run typecheck        # TypeScript 타입 체크

# 테스트
npm test                 # Vitest 단위 + 컴포넌트 테스트 (1회 실행)
npm run test:watch       # Vitest watch 모드 (TDD 개발 시 사용)
npm run test:coverage    # 커버리지 포함 테스트 (80% 임계값)
npm run test:e2e         # 빌드 후 Playwright E2E 테스트

# 전체 검증
npm run validate         # lint + typecheck + test + build (PR 전 필수)
```

---

## 아키텍처

### 디렉토리 구조

```
ballin/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # 루트 레이아웃 (Header, Footer)
│   ├── page.tsx                # 홈페이지
│   ├── rules/                  # 룰북 섹션
│   │   ├── page.tsx            # 9개 카테고리 목록
│   │   └── [category]/
│   │       ├── page.tsx        # 카테고리별 룰 목록
│   │       └── [slug]/
│   │           └── page.tsx    # 개별 룰 페이지 (FIBA/NBA 탭)
│   ├── training/               # 연습법 섹션
│   │   ├── page.tsx            # 3개 대분류 목록
│   │   └── [category]/
│   │       ├── page.tsx        # 카테고리별 연습법 목록
│   │       └── [slug]/
│   │           └── page.tsx    # 개별 연습법 페이지
│   ├── routines/               # 추천 루틴 섹션
│   │   ├── page.tsx            # 루틴 목록
│   │   └── [slug]/
│   │       └── page.tsx        # 개별 루틴 페이지
│   └── glossary/               # 용어사전
│       └── page.tsx
├── content/                    # MDX 콘텐츠 파일 (핵심!)
│   ├── rules/
│   │   ├── game-basics/        # 기본 규칙
│   │   ├── five-on-five/       # 5대5 룰
│   │   ├── three-on-three/     # 3대3 룰
│   │   ├── violations/         # 바이올레이션
│   │   ├── fouls/              # 파울
│   │   ├── positions/          # 포지션별 역할 & 규칙
│   │   ├── tactics-rules/      # 공격/수비 전술 관련 룰
│   │   ├── sportsmanship/      # 경기 매너 & 스포츠맨십
│   │   └── special-situations/ # 특수 상황
│   ├── training/
│   │   ├── individual-skills/  # 개인 스킬
│   │   ├── team-tactics/       # 팀 전술 & 플레이
│   │   └── fitness/            # 체력 & 컨디셔닝
│   ├── routines/               # 추천 연습 루틴
│   └── glossary/               # 용어사전 데이터
├── components/
│   ├── layout/                 # Header, Footer, Breadcrumb
│   ├── rules/                  # RuleCompare, RuleCard
│   ├── training/               # DrillCard, RoutineView
│   ├── common/                 # VideoEmbed, DifficultyBadge, SearchBar, FilterBar, InfoBox, BookmarkButton
│   └── glossary/               # GlossarySearch
├── lib/
│   ├── content.ts              # MDX 파싱 유틸리티 (getAllRules, getRuleBySlug 등)
│   ├── search.ts               # 클라이언트 사이드 검색 인덱스
│   └── bookmarks.ts            # localStorage 북마크 관리
├── __tests__/
│   └── fixtures/               # 테스트 픽스처 (모킹 데이터, MDX 샘플)
├── e2e/                        # Playwright E2E 테스트 (*.spec.ts)
├── styles/
│   └── globals.css
├── public/
│   └── images/                 # 코트 다이어그램, 아이콘
├── vitest.config.ts            # Vitest 설정
├── vitest.setup.ts             # 테스트 글로벌 설정 (RTL, 모킹)
├── playwright.config.ts        # Playwright E2E 설정
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

### 라우팅 구조

```
/                           → 홈 (소개, 검색, 추천 콘텐츠)
/rules                      → 룰북 카테고리 9개 목록
/rules/[category]           → 해당 카테고리 룰 목록
/rules/[category]/[slug]    → 개별 룰 페이지 (FIBA/NBA 탭 + 비교)
/training                   → 연습법 카테고리 3개 목록
/training/[category]        → 해당 카테고리 연습법 목록
/training/[category]/[slug] → 개별 연습법 페이지
/routines                   → 추천 루틴 목록
/routines/[slug]            → 개별 루틴 페이지
/glossary                   → 용어사전 (검색 + 필터)
```

### 콘텐츠 관리 (MDX)

- 모든 콘텐츠는 `content/` 디렉토리의 MDX 파일로 관리
- 프론트매터에 메타데이터 (title, category, difficulty, tags 등)
- `lib/content.ts`에서 파싱하여 페이지에 주입
- SSG로 빌드 시점에 모든 페이지 정적 생성

### SSG (Static Site Generation)

- 이 사이트는 **완전 정적 사이트**. 모든 페이지가 빌드 시 생성됨.
- `generateStaticParams()`로 MDX 파일 기반 동적 라우트 사전 생성
- API Route 없음. 서버 사이드 로직 없음.
- 클라이언트 사이드 상태: 검색, 북마크, 다크모드 토글만

---

## 규칙

### 개발 방식

- **언어**: 주석/커밋/문서 한국어, 코드/변수명 영어
- **커밋**: Conventional Commits (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`)
- **브랜치**: main 직접 push 금지. `feature/기능명`, `fix/버그명` 브랜치 → PR → merge
- **검증**: PR 전 반드시 `npm run validate` 통과 (lint + typecheck + test + build)

### 코드 스타일

#### Formatting

- Prettier 사용
- semicolons: 없음 (`semi: false`)
- quotes: 작은따옴표 (`singleQuote: true`)
- print width: 100
- trailing commas: es5

#### Imports

- path alias `@/*`는 `src/*` (tsconfig.json#paths) — 단, App Router 구조상 `app/`, `components/`, `lib/` 등이 루트에 있으면 적절히 설정
- 그룹 순서: 외부 라이브러리 → 내부 (`@/...`) → 상대 (`./...`)
- 타입 전용: `import type { ... }` 사용

#### Naming

- React 컴포넌트: `PascalCase` (예: `RuleCompare.tsx`)
- 파일/폴더: `kebab-case` (예: `five-on-five/`, `content.ts`)
- 함수/변수: `camelCase`
- 상수: `SCREAMING_SNAKE_CASE`
- MDX 콘텐츠 파일: `kebab-case.mdx` (예: `traveling.mdx`)

#### Types & Safety

- TypeScript strict mode
- `any` 타입 사용 금지
- 타입 단언 (`as any`, `@ts-ignore`) 사용 금지
- `unknown` + narrowing 패턴 사용

### MDX 콘텐츠 규칙

#### 룰 페이지 프론트매터 (필수 필드)

```yaml
---
title: "트래블링 (Traveling)"
category: "violations"                 # 9개 카테고리 중 하나
difficulty: "beginner"                 # beginner | intermediate | advanced
summary: "공을 가진 상태에서 허용된 스텝 수를 초과하여 이동하는 반칙"
tags: ["바이올레이션", "드리블"]
relatedRules: ["double-dribble"]       # 관련 룰 slug 배열
videos:
  - url: "https://youtube.com/watch?v=xxx"
    title: "영상 제목"
    source: "NBA Official"
fiba:
  description: "FIBA 기준 설명..."
  keyPoints: ["포인트1", "포인트2"]
nba:
  description: "NBA 기준 설명..."
  keyPoints: ["포인트1", "포인트2"]
---
```

#### 연습법 페이지 프론트매터 (필수 필드)

```yaml
---
title: "크로스오버 드리블 기초"
category: "individual-skills"          # individual-skills | team-tactics | fitness
subcategory: "ball-handling"
difficulty: "beginner"
duration: "15분"
equipment: ["농구공 1개"]
summary: "한 줄 설명"
tags: ["볼핸들링", "드리블"]
videos:
  - url: "https://youtube.com/watch?v=xxx"
    title: "영상 제목"
commonMistakes:
  - "흔한 실수 1"
  - "흔한 실수 2"
relatedDrills: ["behind-the-back"]
---
```

#### 카테고리 slug 매핑

| 룰북 카테고리 | slug |
|---------------|------|
| 기본 규칙 | `game-basics` |
| 5대5 룰 | `five-on-five` |
| 3대3 룰 | `three-on-three` |
| 바이올레이션 | `violations` |
| 파울 | `fouls` |
| 포지션별 역할 & 규칙 | `positions` |
| 공격/수비 전술 관련 룰 | `tactics-rules` |
| 경기 매너 & 스포츠맨십 | `sportsmanship` |
| 특수 상황 | `special-situations` |

| 연습법 카테고리 | slug |
|----------------|------|
| 개인 스킬 | `individual-skills` |
| 팀 전술 & 플레이 | `team-tactics` |
| 체력 & 컨디셔닝 | `fitness` |

### 컴포넌트 규칙

#### FIBA/NBA 비교 (RuleCompare)

- **기본 모드**: FIBA / NBA 탭 전환. 초보자용으로 한쪽만 표시.
- **비교 모드**: 상단 토글로 나란히 비교. 차이점 하이라이트.
- 탭 상태는 URL query (`?league=fiba` 또는 `?league=nba`)로 관리하여 공유 가능

#### 난이도 배지 (DifficultyBadge)

- 🟢 `beginner` = 초급
- 🟡 `intermediate` = 중급
- 🔴 `advanced` = 고급

#### VideoEmbed

- YouTube 임베드 전용 (초기 전략)
- `loading="lazy"` 필수
- 반응형 16:9 비율 유지

#### InfoBox

- 용도 1: **자주 헷갈리는 포인트** (룰 페이지)
- 용도 2: **흔한 실수 & 교정법** (연습법 페이지)
- 시각적으로 구분되는 강조 박스 스타일

#### Breadcrumb

- 모든 하위 페이지에 표시
- 형식: `홈 > 룰북 > 파울 > 테크니컬 파울`
- 현재 페이지는 비활성 텍스트, 나머지는 링크

### SEO

- 모든 페이지에 적절한 `<title>`과 `<meta description>` 필수
- Next.js `metadata` export 또는 `generateMetadata` 사용
- MDX 프론트매터의 `title`과 `summary`를 메타데이터에 활용
- Open Graph 이미지: `app/opengraph-image.tsx`에서 `ImageResponse`로 빌드 타임 생성
- Apple 터치 아이콘: `app/apple-icon.tsx`에서 동일 방식
- `metadataBase: new URL('https://ballin-three.vercel.app')` — OG 이미지 절대 URL용

---

## UI/UX 원칙

### 모바일 퍼스트

- 코트에서 스마트폰으로 보는 사용자가 주 타겟
- 터치 타겟 최소 44px
- 좌우 패딩 충분히 확보

### 다크모드

- 실내 체육관 눈부심 방지
- `next-themes` 또는 Tailwind `dark:` 클래스 사용
- `localStorage`에 설정 저장

### 북마크

- 로그인 없이 `localStorage` 기반
- 룰 페이지, 연습법 페이지에서 북마크 버튼 제공
- 홈에서 북마크한 콘텐츠 바로가기

### 통합 검색

- 헤더 검색바에서 룰/연습법/용어 통합 검색
- 빌드 시 검색 인덱스 생성 (MDX 프론트매터 기반)
- 클라이언트 사이드 필터링 (서버 없음)

---

## TDD 가이드라인

### 원칙

- **Red-Green-Refactor**: 실패하는 테스트 먼저 작성 → 최소 코드로 통과 → 리팩토링
- 모든 새 코드(기능, 버그 수정)에 테스트 필수
- 커버리지 목표: **80% 이상** (statements, branches, functions, lines)

### 테스트 레이어

| 레이어 | 도구 | 파일 위치 | 네이밍 |
|--------|------|-----------|--------|
| 단위 테스트 | Vitest | `lib/*.test.ts` (코로케이트) | `*.test.ts` |
| 컴포넌트 테스트 | Vitest + RTL | `components/**/*.test.tsx` (코로케이트) | `*.test.tsx` |
| E2E 테스트 | Playwright | `e2e/*.spec.ts` | `*.spec.ts` |

### 모킹 전략

| 대상 | 방법 |
|------|------|
| `fs` 모듈 (content.ts) | `vi.mock('fs')` + 팩토리 함수로 existsSync/readdirSync/readFileSync 모킹 |
| `localStorage` | happy-dom 내장 (beforeEach에서 `localStorage.clear()`) |
| `next/link` | 전역 모킹 (vitest.setup.ts) → `<a>` 태그로 대체 |
| `next/navigation` | 전역 모킹 (vitest.setup.ts) → useRouter, useSearchParams, usePathname |
| `next-themes` | 전역 모킹 (vitest.setup.ts) → useTheme, 개별 테스트에서 override 가능 |

### 테스트 작성 규칙

- 테스트 설명은 한국어, `~한다` 체 사용 (예: `'북마크를 추가한다'`)
- `userEvent` 우선 사용 (`fireEvent` 대신)
- 역할(role)/텍스트(text) 기반 쿼리 우선 (테스트 ID 지양)
- 중복 텍스트 발생 시 `getByRole('button', { name: '...' })` 사용

### TDD 워크플로우

```bash
npm run test:watch       # 1. watch 모드 시작
# 2. 실패하는 테스트 작성 (Red)
# 3. 최소 코드로 통과 (Green)
# 4. 리팩토링 (Refactor)
npm run validate         # 5. PR 전 전체 검증
```

---

## 금지 사항

- `any` 타입 사용
- `console.log` 커밋 (개발 중 사용 후 반드시 제거)
- `@ts-ignore`, `@ts-expect-error` 사용
- MDX 프론트매터 필수 필드 누락
- 난이도 값 오타 (`beginner`, `intermediate`, `advanced`만 허용)
- 인라인 스타일 사용 (Tailwind 클래스만)
- 이미지 `alt` 텍스트 누락
- `generateStaticParams` 누락 (동적 라우트에서 반드시 구현)

---

## 트러블슈팅

### MDX 파싱 에러

**증상**: 빌드 시 MDX 파일 파싱 실패

**원인**: 프론트매터 YAML 형식 오류 (들여쓰기, 따옴표 누락)

**해결**: 프론트매터의 문자열 값은 반드시 쌍따옴표로 감싸기. 콜론(`:`)이 포함된 값은 특히 주의.

### generateStaticParams 빌드 실패

**증상**: `Error: Page "/rules/[category]/[slug]" is missing generateStaticParams`

**원인**: 동적 라우트에 `generateStaticParams` 미구현

**해결**: MDX 파일 목록을 순회하여 모든 가능한 params 반환

```typescript
export async function generateStaticParams() {
  const rules = getAllRules()
  return rules.map((rule) => ({
    category: rule.category,
    slug: rule.slug,
  }))
}
```

### ImageResponse에서 runtime = 'edge' 사용 불가

**증상**: `app/opengraph-image.tsx` 또는 `app/apple-icon.tsx`에서 `export const runtime = 'edge'` 사용 시 빌드 에러

**원인**: `output: 'export'` (정적 사이트) 모드에서 `runtime = 'edge'`와 `force-static`이 충돌

**해결**: `runtime = 'edge'` 제거하고 `export const dynamic = 'force-static'`만 사용. 두 파일 모두 빌드 타임에 정적(○) 생성됨.

### Tailwind 다크모드 미적용

**증상**: `dark:` 클래스가 동작하지 않음

**원인**: `tailwind.config.ts`에 `darkMode: 'class'` 미설정

**해결**: `tailwind.config.ts`에 `darkMode: 'class'` 추가, `<html>` 태그에 `dark` 클래스 토글

---

## 참고 문서

- `docs/plans/2026-02-07-basketball-guide-design.md` — 전체 설계 문서
- `docs/prompt_plan.md` — Task 기반 구현 계획
- **저장소:** https://github.com/pangvelop/ballin

## Git 브랜치 전략

```
main (프로덕션)
  ↑ PR
feature/xxx, fix/xxx
```

- 브랜치 명명: `feature/기능명`, `fix/버그명`, `docs/문서명`, `chore/작업명`
- main 직접 push 금지
- PR 전 `npm run validate` 통과 필수 (lint + typecheck + test + build)
