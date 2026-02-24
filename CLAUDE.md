# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**Ballin** — 농구 룰(FIBA/NBA)과 연습법을 체계적으로 정리한 콘텐츠 중심 웹앱.
입문자~중급자가 코트에서 스마트폰으로 바로 참고할 수 있도록 모바일 퍼스트 설계.
- **저장소:** https://github.com/pangvelop/ballin
- **배포:** Vercel (https://ballin-three.vercel.app)

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

## 아키텍처 요약

- 모든 콘텐츠는 `content/` 디렉토리의 MDX 파일로 관리
- 프론트매터에 메타데이터 (title, category, difficulty, tags 등)
- `lib/content.ts`에서 파싱하여 페이지에 주입
- SSG로 빌드 시점에 모든 페이지 정적 생성 (`generateStaticParams()`)
- `output: 'export'` 사용하지 않음 (Vercel 호환 불가)
- API Route 없음. 서버 사이드 로직 없음.
- 클라이언트 사이드 상태: 검색, 북마크, 다크모드 토글만

→ 디렉토리 구조, 라우팅 구조 상세: `rules/architecture.md`

## 규칙

### 개발 방식

- **언어**: 주석/커밋/문서 한국어, 코드/변수명 영어
- **커밋**: Conventional Commits (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`)
- **브랜치**: main 직접 push 금지. `feature/기능명`, `fix/버그명` 브랜치 → PR → merge
- **검증**: PR 전 반드시 `npm run validate` 통과 (lint + typecheck + test + build)

### rules/ 파일 인덱스

| 파일 | 내용 |
|------|------|
| `rules/architecture.md` | 디렉토리 구조, 라우팅 구조, SSG 상세 |
| `rules/features.md` | 기능 번호 목록(F001-F043), URL 파라미터, 에러 처리, 검색/북마크/비교모드/다크모드 상세 |
| `rules/code-style.md` | Formatting, Imports, Naming, Types & Safety |
| `rules/mdx-content.md` | 룰/연습법 프론트매터 스키마, 카테고리 slug 매핑 |
| `rules/components.md` | RuleCompare, DifficultyBadge, VideoEmbed, InfoBox, Breadcrumb, SEO |
| `rules/design-system.md` | 모바일 퍼스트, 다크모드, 북마크, 통합 검색 UI/UX 원칙 |
| `rules/testing.md` | TDD 원칙, 테스트 레이어, 모킹 전략, 테스트 작성 규칙 |
| `rules/troubleshooting.md` | MDX 파싱, SSG, CLS, 접근성, Vercel 배포 등 8개 항목 |

## 금지 사항

- `any` 타입 사용
- `console.log` 커밋 (개발 중 사용 후 반드시 제거)
- `@ts-ignore`, `@ts-expect-error` 사용
- MDX 프론트매터 필수 필드 누락
- 난이도 값 오타 (`beginner`, `intermediate`, `advanced`만 허용)
- 인라인 스타일 사용 (Tailwind 클래스만)
- 이미지 `alt` 텍스트 누락
- `generateStaticParams` 누락 (동적 라우트에서 반드시 구현)

## 참고 문서

- `docs/plans/2026-02-07-basketball-guide-design.md` — 전체 설계 문서 (왜, 방향)
- `docs/plans/2026-02-16-spec.md` — 기능 명세서 아카이브 (P3 개발 시 상세화 예정)
- `docs/prompt_plan.md` — Task 기반 구현 계획 (진행률 추적)
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
