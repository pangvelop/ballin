# AGENTS.md

Ballin 프로젝트의 AI 코딩 어시스턴트용 빠른 참조 가이드.
상세 컨텍스트는 `CLAUDE.md` 참조.

## 핵심 명령어

```bash
npm run dev              # 개발 서버
npm run build            # 프로덕션 빌드 (SSG)
npm run lint             # ESLint
npm run typecheck        # TypeScript 타입 체크
npm test                 # Vitest 단위 테스트
npm run test:e2e         # Playwright E2E
```

## PR 전 필수 실행

```bash
npm run lint && npm run typecheck && npm run build
```

## 코드 스타일

- TypeScript strict mode, `any` 금지
- Prettier: `semi: false`, `singleQuote: true`, `printWidth: 100`
- 커밋: Conventional Commits (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`)
- 브랜치: `feature/xxx`, `fix/xxx` → PR → main
- 언어: 주석/커밋/문서 한국어, 코드/변수명 영어

## 디렉토리 규칙

| 경로 | 용도 |
|------|------|
| `app/` | Next.js App Router 페이지 |
| `content/` | MDX 콘텐츠 파일 (룰, 연습법, 루틴, 용어) |
| `components/` | React 컴포넌트 |
| `lib/` | 유틸리티 (MDX 파싱, 검색, 북마크) |

## 금지 사항

- `any`, `@ts-ignore`, `@ts-expect-error`
- `console.log` 커밋
- 인라인 스타일 (Tailwind만)
- MDX 프론트매터 필수 필드 누락
- 동적 라우트에 `generateStaticParams` 누락

## 에이전트 워크플로우

1. 작업 시작 시 `@CLAUDE.md @docs/prompt_plan.md` 참조
2. Task 번호 기반으로 작업 (예: "Task 1.3 진행")
3. 새 Task 시작 시 `/clear`로 컨텍스트 초기화
4. 작업 종료 시 `/handoff`로 상태 기록
