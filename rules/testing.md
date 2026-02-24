# TDD 가이드라인

## 원칙

- **Red-Green-Refactor**: 실패하는 테스트 먼저 작성 → 최소 코드로 통과 → 리팩토링
- 모든 새 코드(기능, 버그 수정)에 테스트 필수
- 커버리지 목표: **80% 이상** (statements, branches, functions, lines)

## 테스트 레이어

| 레이어 | 도구 | 파일 위치 | 네이밍 |
|--------|------|-----------|--------|
| 단위 테스트 | Vitest | `lib/*.test.ts` (코로케이트) | `*.test.ts` |
| 컴포넌트 테스트 | Vitest + RTL | `components/**/*.test.tsx` (코로케이트) | `*.test.tsx` |
| E2E 테스트 | Playwright | `e2e/*.spec.ts` | `*.spec.ts` |

## 모킹 전략

| 대상 | 방법 |
|------|------|
| `fs` 모듈 (content.ts) | `vi.mock('fs')` + 팩토리 함수로 existsSync/readdirSync/readFileSync 모킹 |
| `localStorage` | happy-dom 내장 (beforeEach에서 `localStorage.clear()`) |
| `next/link` | 전역 모킹 (vitest.setup.ts) → `<a>` 태그로 대체 |
| `next/navigation` | 전역 모킹 (vitest.setup.ts) → useRouter, useSearchParams, usePathname |
| `next-themes` | 전역 모킹 (vitest.setup.ts) → useTheme, 개별 테스트에서 override 가능 |

## 테스트 작성 규칙

- 테스트 설명은 한국어, `~한다` 체 사용 (예: `'북마크를 추가한다'`)
- `userEvent` 우선 사용 (`fireEvent` 대신)
- 역할(role)/텍스트(text) 기반 쿼리 우선 (테스트 ID 지양)
- 중복 텍스트 발생 시 `getByRole('button', { name: '...' })` 사용

## TDD 워크플로우

```bash
npm run test:watch       # 1. watch 모드 시작
# 2. 실패하는 테스트 작성 (Red)
# 3. 최소 코드로 통과 (Green)
# 4. 리팩토링 (Refactor)
npm run validate         # 5. PR 전 전체 검증
```
