# CLAUDE.md

## 프로젝트 개요

**Ballin** — 농구 룰(FIBA/NBA)과 연습법을 체계적으로 정리한 콘텐츠 중심 웹앱.
모바일 퍼스트 설계. 저장소: https://github.com/pangvelop/ballin / 배포: https://ballin-three.vercel.app

## 기술 스택

Next.js 15 (App Router) + React 19 / TypeScript (strict) / Tailwind CSS / MDX 콘텐츠
Vitest + RTL (단위/컴포넌트) / Playwright (E2E) / Vercel 배포

## 핵심 명령어

```bash
npm run dev           # 개발 서버
npm run build         # 프로덕션 빌드 (SSG)
npm run lint          # ESLint
npm run typecheck     # TypeScript 타입 체크
npm test              # Vitest (1회)
npm run test:watch    # Vitest watch (TDD)
npm run test:e2e      # Playwright E2E
npm run validate      # lint + typecheck + test + build (PR 전 필수)
```

## 아키텍처 요약

- 콘텐츠: `content/` MDX 파일 → `lib/content.ts` 파싱 → SSG 정적 생성
- `output: 'export'` 사용 금지 (Vercel 호환 불가). API Route 없음.
- 클라이언트 상태: 검색, 북마크, 다크모드만

## 개발 방식

- 주석/커밋/문서 한국어, 코드/변수명 영어
- Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`)
- main 직접 push 금지 → `feature/`, `fix/` 브랜치 → PR → merge
- PR 전 `npm run validate` 통과 필수

## rules/ 파일 인덱스

| 파일 | 내용 |
|------|------|
| `rules/architecture.md` | 디렉토리 구조, 라우팅, SSG 상세 |
| `rules/features.md` | 기능 번호(F001-F043), URL 파라미터, 에러 처리, 검색/북마크/비교모드/다크모드 상세 |
| `rules/code-style.md` | Formatting, Imports, Naming, Types & Safety, 금지 사항 |
| `rules/mdx-content.md` | 프론트매터 스키마, 카테고리 slug 매핑 |
| `rules/components.md` | RuleCompare, DifficultyBadge, VideoEmbed, InfoBox, Breadcrumb, SEO |
| `rules/design-system.md` | 모바일 퍼스트, 다크모드, 북마크, 통합 검색 UI/UX |
| `rules/testing.md` | TDD 원칙, 테스트 레이어, 모킹 전략 |
| `rules/troubleshooting.md` | MDX 파싱, SSG, CLS, 접근성, Vercel 배포 등 8개 항목 |

## 참고 문서

- `docs/plans/2026-02-07-basketball-guide-design.md` — 설계 문서
- `docs/plans/2026-02-16-spec.md` — 기능 명세서
- `docs/plans/2026-02-24-phase3-design.md` — Phase 3 고도화 설계 (F040~F043 + B1~B3)
- `docs/prompt_plan.md` — 구현 계획 (진행률 추적)
