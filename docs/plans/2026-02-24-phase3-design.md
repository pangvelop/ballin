# Ballin — Phase 3 고도화 설계 문서

> **작성일:** 2026-02-24
> **프로젝트명:** Ballin (농구 룰 & 연습법 가이드)
> **상태:** 설계 확정
> **참고:** [설계 문서](./2026-02-07-basketball-guide-design.md) | [기능 명세서](./2026-02-16-spec.md)

---

## 1. 현황 요약

Phase 0~2(F001~F036) 36개 기능 완료 + Phase 3(F040~F041) 진행 중.

| 항목 | 수치 |
|------|------|
| 콘텐츠 | 163개 (룰 36 + 연습법 20 + 루틴 8 + 용어 99) |
| 테스트 | 184개 (Vitest 156 + E2E 28) |
| 구현 완료 | 76/78 태스크 (97%) |

### 남은 작업

Phase 3 고도화 기능 중 F042~F043 = **2개 기능 남음**.

---

## 2. 구현 우선순위

| 순서 | ID | 기능 | 난이도 | Sprint | 근거 |
|------|----|------|--------|--------|------|
| 1 | B1 | RuleCompare 차이점 하이라이트 | 낮음 | 1 | 기존 컴포넌트 수정만, 설계 명세 미충족 해소 |
| 2 | B2 | 홈 페이지 추천 드릴 섹션 | 낮음 | 1 | 추천 룰과 동일 패턴 복제 |
| 3 | B3 | 홈 페이지 히어로 검색바 | 낮음 | 1 | 기존 SearchBar의 Cmd+K 트리거 재활용 |
| 4 | F043 | 자체 영상 연동 (MP4) | 낮음 | 2 | VideoEmbed 확장, 패키지 추가 불필요 |
| 5 | F040 | 퀴즈 / 셀프 테스트 | 중간 | 3 | 새 컴포넌트 3개 + MDX 프론트매터 확장 |
| 6 | F041 | 커뮤니티 (Giscus 댓글) | 낮음 | 4 | 외부 서비스, GitHub Discussions 설정 필요 |
| 7 | F042 | PWA 오프라인 지원 | 높음 | 5 | next.config 수정, SW 전략, 빌드 영향 큼 |

---

## 3. Sprint 1: 설계 갭 해소 (B1 + B2 + B3)

### 3.1 B1: RuleCompare 차이점 하이라이트

**현재**: 비교 모드에서 FIBA/NBA를 나란히 표시만 함 (차이점 구분 없음)
**목표**: keyPoints 비교 시 고유 포인트를 색상으로 강조

**수정 파일**:
- `components/rules/RuleCompare.tsx` (129줄) — 비교 함수 + 하이라이트 렌더링 추가
- `components/rules/RuleCompare.test.tsx` — 하이라이트 테스트 4개 추가

**타입 설계**:

```typescript
// RuleCompare.tsx 내부에 추가
interface ComparedKeyPoint {
  text: string
  status: 'common' | 'fiba-only' | 'nba-only'
}

function compareKeyPoints(
  fibaPoints: readonly string[],
  nbaPoints: readonly string[]
): { fibaCompared: ComparedKeyPoint[]; nbaCompared: ComparedKeyPoint[] }
```

**구현 상세**:
- `LeagueContent`에 `comparedPoints?: ComparedKeyPoint[]` prop 추가
- 비교 모드(`?league=compare`)일 때만 `compareKeyPoints()` 호출하여 결과 전달
- 공통 포인트: 기본 스타일 유지
- FIBA 고유: `bg-blue-50 dark:bg-blue-950 border-l-2 border-blue-400`
- NBA 고유: `bg-red-50 dark:bg-red-950 border-l-2 border-red-400`

> **spec.md 변경 사항**: 기존 spec.md(라인 479)는 "노란 배경" 단일 색상으로 명시했으나, 리그별 고유 포인트를 구분하기 위해 FIBA=파란색/NBA=빨간색으로 변경한다. 단일 색상으로는 어느 리그의 고유 포인트인지 식별할 수 없기 때문이다. 구현 시 spec.md도 동기화할 것.

**테스트 케이스** (4개):
1. 공통 포인트는 하이라이트 없음
2. FIBA 고유 포인트에 파란색 하이라이트
3. NBA 고유 포인트에 빨간색 하이라이트
4. 비교 모드가 아닐 때 하이라이트 없음

### 3.2 B2: 홈 페이지 추천 드릴 섹션

**현재**: 추천 룰 4개만 표시
**목표**: 추천 드릴(연습법) 4개 섹션 추가

**수정 파일**:
- `app/page.tsx` (91줄) — `getAllTraining` import + 추천 드릴 섹션 JSX 추가

**설계**: 기존 `featuredRules` 패턴과 동일하게 추천 슬러그를 명시적으로 지정.

```typescript
// 추천 드릴 슬러그 하드코딩 (파일 순서 의존 방지)
const recommendedDrillSlugs = [
  'crossover-dribble',
  'layup-finish',
  'free-throw-routine',
  'defensive-slide',
]
const allTraining = getAllTraining()
const featuredDrills = allTraining.filter(t =>
  recommendedDrillSlugs.includes(t.slug)
)
```

> **설계 근거**: `slice(0, 4)` 방식은 파일시스템 순회 순서에 의존하여 환경별로 결과가 달라질 수 있다. 기존 `featuredRules`와 동일하게 슬러그를 명시적으로 지정한다. 추천 목록은 콘텐츠 추가 시 수동 업데이트한다.

- 추천 룰 섹션 바로 아래에 "추천 연습법" 그리드 배치
- 각 카드에 `DifficultyBadge` + `duration` 표시
- 카드 클릭 시 `/training/[category]/[slug]`으로 이동

### 3.3 B3: 홈 페이지 히어로 검색바

**현재**: Header에만 검색 아이콘 버튼 (Cmd+K)
**목표**: 히어로 영역에 클릭 가능한 큰 검색 입력 UI

**수정/신규 파일**:
- `components/common/HeroSearchTrigger.tsx` — 검색 트리거 클라이언트 컴포넌트 (신규)
- `app/page.tsx` — 히어로 섹션에 HeroSearchTrigger 배치

**설계**:

```tsx
// HeroSearchTrigger.tsx
'use client'

export default function HeroSearchTrigger() {
  const handleClick = () => {
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', metaKey: true })
    )
  }

  return (
    <button
      onClick={handleClick}
      className="w-full max-w-md rounded-xl border px-4 py-3 text-left text-gray-400"
    >
      룰, 연습법, 용어 검색... <kbd>⌘K</kbd>
    </button>
  )
}
```

- 입력 필드처럼 보이지만 실제로는 버튼 (read-only 트리거)
- 클릭 시 `Cmd+K` 이벤트 디스패치 → 기존 SearchBar 모달 오픈
- 새 컴포넌트 분리 이유: `'use client'` 디렉티브 필요 (page.tsx는 서버 컴포넌트)

---

## 4. Sprint 2: F043 — 자체 영상 연동 (MP4 지원)

**현재**: `VideoEmbed.tsx`가 YouTube URL만 처리, 비YouTube → `null` 반환
**목표**: `.mp4` / `.webm` URL도 HTML5 `<video>` 태그로 렌더링

**수정 파일**:
- `lib/types.ts` — `Video` 인터페이스에 `type?: 'youtube' | 'mp4'`, `poster?: string` 추가
- `components/common/VideoEmbed.tsx` (41줄) — MP4 감지 로직 + `<video>` 렌더링 분기
- `components/common/VideoEmbed.test.tsx` — MP4 관련 테스트 4개 추가

**타입 확장**:

```typescript
// lib/types.ts — Video 인터페이스 확장
interface Video {
  url: string
  title: string
  type?: 'youtube' | 'mp4' | 'webm'  // 추가
  poster?: string                     // 추가 (네이티브 비디오 썸네일)
}
```

**구현 로직**:

```typescript
// VideoEmbed.tsx 확장

// 네이티브 비디오 URL 감지 (MP4 + WebM)
function isNativeVideoUrl(url: string): boolean {
  return url.endsWith('.mp4') || url.endsWith('.webm')
}

// 확장자에 따른 MIME 타입 매핑
function getVideoMimeType(url: string): string {
  if (url.endsWith('.webm')) return 'video/webm'
  return 'video/mp4'
}

// YouTube이면 기존 iframe, 네이티브 비디오이면 <video>
// <video controls preload="none" poster={poster}>
//   <source src={url} type={getVideoMimeType(url)} />
// </video>
```

**MDX 프론트매터 예시**:

```yaml
videos:
  - url: "/videos/layup-tutorial.mp4"
    title: "레이업 튜토리얼"
    poster: "/images/layup-poster.jpg"
```

**테스트 케이스** (4개):
1. `.mp4` URL → `<video>` 태그 렌더링
2. `.webm` URL → `<video>` 태그 렌더링
3. YouTube URL → 기존 iframe 유지
4. poster prop 전달 시 `<video poster>` 속성 설정

---

## 5. Sprint 3: F040 — 퀴즈 / 셀프 테스트

**가장 큰 기능**. MDX 프론트매터 확장 + 새 컴포넌트 3개 + localStorage 진행률.

### 5.1 새 파일 (8개)

| 파일 | 역할 |
|------|------|
| `lib/quiz-progress.ts` | localStorage 퀴즈 진행률 CRUD |
| `lib/quiz-progress.test.ts` | 진행률 유틸 테스트 |
| `components/quiz/QuizSection.tsx` | 퀴즈 래퍼 (문제 순회, 결과 표시) |
| `components/quiz/QuizQuestion.tsx` | 개별 문제 (객관식 4지선다 + O/X) |
| `components/quiz/QuizResult.tsx` | 결과 요약 (정답률 + 다시 풀기) |
| `components/quiz/QuizSection.test.tsx` | QuizSection 테스트 |
| `components/quiz/QuizQuestion.test.tsx` | QuizQuestion 테스트 |
| `components/quiz/QuizResult.test.tsx` | QuizResult 테스트 |

### 5.2 수정 파일

- `lib/types.ts` — `Quiz`, `QuizQuestion` 타입 추가, `RuleFrontmatter.quiz?`, `TrainingFrontmatter.quiz?`
- `app/rules/[category]/[slug]/page.tsx` — QuizSection 렌더링 (페이지 하단)
- `app/training/[category]/[slug]/page.tsx` — QuizSection 렌더링
- `content/rules/violations/traveling.mdx` — 샘플 퀴즈 데이터 (시범)

### 5.3 타입 설계

```typescript
// Discriminated union으로 문제 유형별 타입 안전성 확보

interface MultipleChoiceQuestion {
  id: string
  type: 'multiple-choice'
  question: string
  options: [string, string, string, string]  // 4지선다 (고정 4개)
  answer: number                              // 정답 인덱스 (0-3)
  explanation: string
}

interface TrueFalseQuestion {
  id: string
  type: 'true-false'
  question: string
  answer: boolean        // true = O, false = X
  explanation: string
}

type QuizQuestion = MultipleChoiceQuestion | TrueFalseQuestion

interface Quiz {
  questions: QuizQuestion[]
}
```

> **설계 근거**: 단일 인터페이스 + `options?`는 `true-false` 유형에서 `answer: number`의 의미가 모호해진다 (0=참? 1=참?). Discriminated union으로 분리하면 타입 체커가 유형별 필드 접근을 강제한다.

### 5.4 진행률 저장 (quiz-progress.ts)

```typescript
interface QuizProgress {
  slug: string
  score: number
  total: number
  completedAt: string  // ISO 8601
  answers: number[]    // 선택한 인덱스 배열
}

function getQuizProgress(slug: string): QuizProgress | null
function saveQuizProgress(progress: QuizProgress): void
function getAllQuizProgress(): QuizProgress[]
```

- localStorage 키: `ballin-quiz-{slug}`
- 불변성 원칙: 새 객체로 저장, 기존 객체 수정 안 함

### 5.5 UI 흐름

1. 페이지 하단 "퀴즈로 확인하기" 섹션
2. 한 문제씩 표시 → 선택 → 정답 확인 + 해설 → 다음
3. 완료 후 결과 요약 (정답률, 소요 시간은 미포함)
4. localStorage에 즉시 저장, 재방문 시 이전 결과 표시 + "다시 풀기" 버튼

### 5.6 테스트 케이스 (예상 10+개)

- `quiz-progress.ts`: 저장/조회/전체 조회/없는 slug 조회
- `QuizQuestion`: 객관식 렌더링, O/X 렌더링, 정답 선택 시 해설 표시, 오답 시 정답 표시
- `QuizSection`: 문제 순회, 마지막 문제 후 결과 표시
- `QuizResult`: 정답률 표시, 다시 풀기 버튼

---

## 6. Sprint 4: F041 — 커뮤니티 (Giscus 댓글)

**접근**: API Route 없는 SSG이므로 Giscus (GitHub Discussions 기반) 활용.

### 6.1 사전 작업 (수동)

1. GitHub `pangvelop/ballin` 저장소에 Discussions 활성화
2. Giscus 앱 설치 (https://github.com/apps/giscus)
3. giscus.app에서 `repoId`, `categoryId` 확인

### 6.2 새 파일

- `components/common/GiscusComments.tsx` — Giscus 래퍼 (다크모드 연동)
- `components/common/GiscusComments.test.tsx`

### 6.3 수정 파일

- `package.json` — `@giscus/react` 추가
- `app/rules/[category]/[slug]/page.tsx` — 하단에 GiscusComments 추가
- `app/training/[category]/[slug]/page.tsx` — 동일
- `app/routines/[slug]/page.tsx` — 동일

### 6.4 컴포넌트 설계

```tsx
'use client'
import { useState, useEffect } from 'react'
import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'

export default function GiscusComments() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-48 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
    )
  }

  return (
    <Giscus
      repo="pangvelop/ballin"
      repoId="R_kgDORKmzpA"
      category="General"
      categoryId="DIC_kwDORKmzpM4C3HLy"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      lang="ko"
    />
  )
}
```

- `mapping="pathname"` → URL 경로별 자동 Discussion 생성
- 다크모드 전환 시 Giscus 테마도 자동 전환
- `repoId`와 `categoryId`는 환경변수가 아닌 하드코딩 (공개 정보)
- `mounted` 가드: SSR/CSR hydration mismatch 방지 (useTheme은 클라이언트에서만 유효)
- **CSP 설정**: `vercel.json`에 `frame-src https://giscus.app` 추가 (iframe 차단 방지)

**테스트 케이스** (3개):
1. Giscus 컴포넌트가 렌더링되는지 확인 (`@giscus/react` 모킹)
2. 라이트 모드에서 `theme="light"` prop 전달 확인
3. 다크 모드에서 `theme="dark"` prop 전달 확인

---

## 7. Sprint 5: F042 — PWA 오프라인 지원

**가장 리스크가 큰 기능**. next.config 수정, Service Worker 전략, 빌드 영향.

### 7.1 사전 조사 필요 (PoC 필수)

- `@serwist/next`의 Next.js 15 + Vercel (non-export) 호환성 검증
- Service Worker가 Vercel에서 올바르게 서빙되는지 확인
- PoC 실패 시 대안: `workbox` 직접 설정 또는 기능 보류

### 7.2 새 파일

| 파일 | 역할 |
|------|------|
| `public/manifest.json` | PWA 매니페스트 |
| `public/icons/icon-192.png` | 앱 아이콘 (192x192) |
| `public/icons/icon-512.png` | 앱 아이콘 (512x512) |
| `public/icons/icon-512-maskable.png` | 마스커블 아이콘 |
| `app/sw.ts` | Service Worker 진입점 |
| `app/offline/page.tsx` | 오프라인 폴백 페이지 |

### 7.3 수정 파일

- `package.json` — `@serwist/next`, `serwist` 추가
- `next.config.ts` — `withSerwist()` 래핑
- `app/layout.tsx` — `<link rel="manifest">` + `<meta name="theme-color">` 추가

### 7.4 매니페스트 설계

```json
{
  "name": "Ballin - 농구 룰 & 연습법 가이드",
  "short_name": "Ballin",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#f97316",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-512-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

### 7.5 캐싱 전략

| 자원 유형 | 전략 | 설명 |
|-----------|------|------|
| 빌드 정적 자산 (JS/CSS) | Precache | 빌드 시 생성된 파일 자동 캐시 |
| HTML 페이지 | NetworkFirst | 네트워크 우선, 실패 시 캐시 |
| 이미지/폰트 | StaleWhileRevalidate | 캐시 우선, 백그라운드 업데이트 |
| 네트워크 실패 | Fallback | `/offline` 페이지 표시 |

### 7.6 리스크 목록

| 리스크 | 영향 | 대응 |
|--------|------|------|
| `@serwist/next` + Next.js 15 호환 미검증 | 빌드 실패 | 구현 전 PoC 필수 |
| SW 캐시 무효화 실패 | 오래된 콘텐츠 노출 | 버전 기반 캐시 관리 |
| Vercel SW 서빙 이슈 | PWA 미작동 | Vercel 문서 확인 후 진행 |
| 아이콘 에셋 부재 | 설치 불가 | 최소 아이콘 직접 생성 |

---

## 8. 전체 파일 변경 요약

### 8.1 새로 만들 파일 (최대 15개)

| 파일 | 기능 |
|------|------|
| `components/common/HeroSearchTrigger.tsx` | B3 |
| `components/common/HeroSearchTrigger.test.tsx` | B3 |
| `components/common/GiscusComments.tsx` | F041 |
| `components/common/GiscusComments.test.tsx` | F041 |
| `components/quiz/QuizSection.tsx` | F040 |
| `components/quiz/QuizQuestion.tsx` | F040 |
| `components/quiz/QuizResult.tsx` | F040 |
| `components/quiz/QuizSection.test.tsx` | F040 |
| `components/quiz/QuizQuestion.test.tsx` | F040 |
| `components/quiz/QuizResult.test.tsx` | F040 |
| `lib/quiz-progress.ts` | F040 |
| `lib/quiz-progress.test.ts` | F040 |
| `public/manifest.json` | F042 |
| `app/sw.ts` | F042 |
| `app/offline/page.tsx` | F042 |

### 8.2 수정할 파일 (최대 12개)

| 파일 | 기능 |
|------|------|
| `components/rules/RuleCompare.tsx` | B1 |
| `components/rules/RuleCompare.test.tsx` | B1 |
| `app/page.tsx` | B2, B3 |
| `components/common/VideoEmbed.tsx` | F043 |
| `components/common/VideoEmbed.test.tsx` | F043 |
| `lib/types.ts` | F040, F043 |
| `app/rules/[category]/[slug]/page.tsx` | F040, F041 |
| `app/training/[category]/[slug]/page.tsx` | F040, F041 |
| `app/routines/[slug]/page.tsx` | F041 |
| `app/layout.tsx` | F042 |
| `next.config.ts` | F042 |
| `package.json` | F041, F042 |

---

## 9. 검증 방법

### 9.1 자동 검증 (각 Sprint 후)

```bash
npm run validate    # lint + typecheck + test + build
npm run test:e2e    # Playwright E2E
```

### 9.2 기능별 수동 검증

| ID | 확인 방법 |
|----|-----------|
| B1 | `/rules/violations/traveling?league=compare` → 비교 모드에서 색상 하이라이트 확인 |
| B2 | `/` → 추천 연습법 섹션 존재 + 4개 카드 확인 |
| B3 | `/` → 히어로 검색바 클릭 → 검색 모달 오픈 확인 |
| F043 | MP4 URL이 있는 콘텐츠에서 `<video>` 태그 렌더링 확인 |
| F040 | 퀴즈가 있는 룰 페이지에서 문제 풀이 → 결과 확인 → 새로고침 후 진행률 유지 |
| F041 | 룰 상세 페이지 하단에 Giscus 댓글 위젯 로딩 확인 |
| F042 | DevTools > Application > Service Worker 등록 확인, 오프라인 전환 후 캐시된 페이지 열람 |
