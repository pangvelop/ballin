# 아키텍처

## 디렉토리 구조

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

## 라우팅 구조

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

## SSG (Static Site Generation)

- 모든 페이지가 빌드 시 정적 생성됨 (`generateStaticParams()` + Vercel 네이티브 Next.js 빌더)
- `output: 'export'` 사용하지 않음 (Vercel `@vercel/next` 빌더와 호환 불가)
- API Route 없음. 서버 사이드 로직 없음.
- 클라이언트 사이드 상태: 검색, 북마크, 다크모드 토글만
