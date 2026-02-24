# 코드 스타일

## Formatting

- Prettier 사용
- semicolons: 없음 (`semi: false`)
- quotes: 작은따옴표 (`singleQuote: true`)
- print width: 100
- trailing commas: es5

## Imports

- path alias `@/*`는 `src/*` (tsconfig.json#paths) — 단, App Router 구조상 `app/`, `components/`, `lib/` 등이 루트에 있으면 적절히 설정
- 그룹 순서: 외부 라이브러리 → 내부 (`@/...`) → 상대 (`./...`)
- 타입 전용: `import type { ... }` 사용

## Naming

- React 컴포넌트: `PascalCase` (예: `RuleCompare.tsx`)
- 파일/폴더: `kebab-case` (예: `five-on-five/`, `content.ts`)
- 함수/변수: `camelCase`
- 상수: `SCREAMING_SNAKE_CASE`
- MDX 콘텐츠 파일: `kebab-case.mdx` (예: `traveling.mdx`)

## Types & Safety

- TypeScript strict mode
- `any` 타입 사용 금지
- 타입 단언 (`as any`, `@ts-ignore`) 사용 금지
- `unknown` + narrowing 패턴 사용
