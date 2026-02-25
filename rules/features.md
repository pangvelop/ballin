# 기능 레퍼런스

> 각 기능의 상세 명세는 `docs/plans/2026-02-16-spec.md` 참조.
> 아래는 기능 번호로 빠르게 참조하기 위한 요약 + CLAUDE.md에서만 관리하는 구체적 동작 명세.

## 기능 번호 목록

| 번호 | 기능 | Phase | 상태 |
|------|------|-------|------|
| F001 | 공통 레이아웃 (Header + Footer + Breadcrumb) | P0 | ✅ |
| F002 | 홈 페이지 | P0 | ✅ |
| F003 | 룰북 카테고리 목록 | P0 | ✅ |
| F004 | 카테고리별 룰 목록 | P0 | ✅ |
| F005 | 개별 룰 페이지 (MDX 렌더링) | P0 | ✅ |
| F006 | FIBA/NBA 탭 전환 | P0 | ✅ |
| F007 | YouTube 영상 임베드 | P0 | ✅ |
| F008 | 난이도 뱃지 | P0 | ✅ |
| F009 | 관련 룰 링크 | P0 | ✅ |
| F010 | 모바일 반응형 | P0 | ✅ |
| F011 | MDX 콘텐츠 파싱 시스템 | P0 | ✅ |
| F012 | SEO | P0 | ✅ |
| F020 | 연습법 카테고리 목록 | P1 | ✅ |
| F021 | 카테고리별 연습법 목록 | P1 | ✅ |
| F022 | 개별 연습법 페이지 | P1 | ✅ |
| F023 | 용어사전 페이지 | P1 | ✅ |
| F024 | 용어사전 검색 | P1 | ✅ |
| F025 | 통합 검색 (Fuse.js) | P1 | ✅ |
| F026 | 난이도 필터 | P1 | ✅ |
| F027 | 강조 박스 (InfoBox) | P1 | ✅ |
| F030 | FIBA/NBA 비교 모드 | P2 | ✅ |
| F031 | 추천 루틴 목록 | P2 | ✅ |
| F032 | 개별 루틴 페이지 | P2 | ✅ |
| F033 | 북마크 | P2 | ✅ |
| F034 | 다크모드 | P2 | ✅ |
| F035 | 목차 자동 생성 | P2 | ✅ |
| F036 | 스크롤 진행 표시기 | P2 | ✅ |
| B1 | 비교 모드 차이점 하이라이트 | P3 | ✅ |
| B2 | 홈 추천 연습법 섹션 | P3 | ✅ |
| B3 | 히어로 검색바 | P3 | ✅ |
| F040 | 퀴즈 / 셀프 테스트 | P3 | ✅ |
| F041 | 커뮤니티 (댓글/피드백) | P3 | ✅ |
| F042 | PWA 지원 (오프라인 열람) | P3 | ✅ |
| F043 | 자체 영상 연동 (MP4/WebM) | P3 | ✅ |

## URL 쿼리 파라미터 설계

| 파라미터 | 사용 위치 | 값 | 설명 |
|----------|-----------|-----|------|
| `?league=fiba` | 개별 룰 페이지 | `fiba` \| `nba` \| `compare` | 탭 전환 상태. 기본값 `fiba`. `compare`는 비교 모드(F030) |
| `?difficulty=beginner` | 룰/연습법 목록 | `beginner` \| `intermediate` \| `advanced` | 난이도 필터(F026). 없으면 전체 |

## 에러 처리 규칙

| 상황 | 처리 |
|------|------|
| 존재하지 않는 카테고리/slug → URL 접근 | `notFound()` → 404 페이지 |
| 카테고리에 룰이 0개 | "아직 콘텐츠가 없습니다. 곧 추가됩니다!" 메시지 (404 아님) |
| MDX 프론트매터 필수 필드 누락 | 빌드 타임 에러 (Zod 스키마 검증) |
| `relatedRules`/`relatedDrills` slug가 실제 파일과 미매칭 | 해당 링크 숨김 + 콘솔 경고 (`console.warn`) |
| YouTube URL 형식 불일치 | 해당 영상 카드 숨김 |
| YouTube 썸네일 로드 실패 | 기본 플레이스홀더 이미지 |
| 북마크 로컬스토리지 접근 불가 (시크릿 모드) | 북마크 기능 숨김 |
| 난이도 필터 결과 0건 | "해당 난이도의 콘텐츠가 없습니다." 메시지 |
| 검색 결과 0건 | "검색 결과가 없습니다. 다른 키워드로 검색해보세요." |

## 통합 검색 상세 (F025)

```typescript
// Fuse.js 설정
const fuseOptions = {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "summary", weight: 0.3 },
    { name: "tags", weight: 0.2 },
    { name: "category", weight: 0.1 },
  ],
  threshold: 0.3,
  minMatchCharLength: 2,
  includeScore: true,
}

// 검색 인덱스: public/search-index.json (빌드 타임 생성)
// 입력 디바운스: 200ms
// 첫 검색 시 1회만 fetch (메모리 캐시)
// 모달 단축키: Ctrl+K / Cmd+K
// 최대 결과: 10개
// 키보드 탐색: 화살표 위/아래 + Enter
```

## 북마크 상세 (F033)

```typescript
// 로컬스토리지 key: "ballin-bookmarks"
interface BookmarkStore {
  version: 1
  items: BookmarkItem[]
}

interface BookmarkItem {
  type: "rule" | "drill" | "routine" | "glossary"
  slug: string          // "violations/traveling"
  title: string         // 오프라인 표시용
  addedAt: string       // ISO 8601
}

// 최대 100개. 초과 시 가장 오래된 항목 자동 삭제 + 알림.
// 시크릿 모드(localStorage 접근 불가): 기능 숨김.
```

## FIBA/NBA 비교 모드 상세 (F030)

```
- 토글 ON → FIBA/NBA 2컬럼 나란히 표시
- 차이점 하이라이트 로직:
  - keyPoints 문자열 완전 일치 기준으로 비교
  - 양쪽 모두 있는 항목 → 일반 표시
  - FIBA 고유 항목 → 파란색 하이라이트 (`bg-blue-50 dark:bg-blue-950 border-l-2 border-blue-400`)
  - NBA 고유 항목 → 빨간색 하이라이트 (`bg-red-50 dark:bg-red-950 border-l-2 border-red-400`)
- 모바일 (768px 이하): 위/아래 스택 (FIBA 위, NBA 아래)
- URL: ?league=compare
```

## 다크모드 상세 (F034)

```
- 로컬스토리지 key: "ballin-theme"
- 값: "light" | "dark" | "system" (기본값: "system")
- 토글 순환: system → light → dark → system
- 깜빡임 방지: <head> 인라인 스크립트로 초기 테마 적용
- CSS 변수:
  --bg-primary:   light=#FFFFFF,  dark=#1A1A2E
  --text-primary: light=#1A1A2E,  dark=#EAEAEA
  --accent:       light=#F97316,  dark=#FB923C
```

## 퀴즈 / 셀프 테스트 상세 (F040)

```
- 질문 타입: multiple-choice (4지선다) | true-false (O/X)
- 타입 안전: QuizQuestion discriminated union (type 필드 기반)
- 로컬스토리지 key: "ballin-quiz-{slug}"
- 저장 데이터: { slug, score, total, completedAt (ISO 8601), answers[] }
- 이전 진행률 자동 로드 (useEffect on mount)
- 배치 위치: 룰/연습법 상세 페이지 하단 (quiz frontmatter 있을 때만 렌더링)
- MDX 프론트매터에 quiz.questions[] 배열로 정의
```

## 커뮤니티 댓글 상세 (F041)

```
- Giscus (GitHub Discussions 기반) 댓글 위젯
- 매핑: pathname (URL 경로별 자동 Discussion 생성)
- 다크모드: resolvedTheme 기반 자동 연동
- 배치: 룰/연습법/루틴 상세 페이지 최하단
- CSP: vercel.json frame-src에 https://giscus.app 필수
- Hydration: mounted 가드로 SSR 시 skeleton → 클라이언트 mount 후 Giscus 렌더링
- 카테고리: General (GitHub Discussions 기본 제공)
```

## PWA 오프라인 지원 상세 (F042)

```
- @serwist/next v9.5.4 + serwist v9.5.4 (Next.js 15 호환)
- Service Worker: app/sw.ts → 빌드 시 public/sw.js 생성
- 개발 환경: disable: true (Turbopack 충돌 방지)
- 캐싱 전략:
  - 빌드 정적 자산 (JS/CSS): Precache (자동 주입)
  - HTML 페이지: NetworkFirst
  - 이미지/폰트: StaleWhileRevalidate
  - 네트워크 실패: /~offline 폴백 페이지
- 매니페스트: public/manifest.json (standalone, theme_color: #f97316)
- 아이콘: public/icons/ (192, 512, 512-maskable PNG)
- CSP: vercel.json worker-src 'self' 추가
- .gitignore: public/sw.js, public/sw.js.map 제외
```

## 용어사전 초성 추출 (F023)

```
- 한글: 유니코드 → 초성 추출 (ㄱ~ㅎ)
- 영문: 첫 글자 대문자 (A~Z)
- 숫자/특수문자: "#" 그룹
- 색인 바: 해당 초성에 용어 없으면 비활성 (회색)
- 검색: 클라이언트 필터링 (includes), 디바운스 100ms
```

## 성능 목표

| 지표 | 목표 |
|------|------|
| Lighthouse Performance | 90+ |
| LCP (Largest Contentful Paint) | < 2.5초 |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| 첫 로드 JS 번들 | < 100KB (gzipped) |
