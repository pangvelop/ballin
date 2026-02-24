# 트러블슈팅

## MDX 파싱 에러

**증상**: 빌드 시 MDX 파일 파싱 실패

**원인**: 프론트매터 YAML 형식 오류 (들여쓰기, 따옴표 누락)

**해결**: 프론트매터의 문자열 값은 반드시 쌍따옴표로 감싸기. 콜론(`:`)이 포함된 값은 특히 주의.

## generateStaticParams 빌드 실패

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

## ImageResponse에서 runtime = 'edge' 사용 불가

**증상**: `app/opengraph-image.tsx` 또는 `app/apple-icon.tsx`에서 `export const runtime = 'edge'` 사용 시 빌드 에러

**원인**: `output: 'export'` (정적 사이트) 모드에서 `runtime = 'edge'`와 `force-static`이 충돌

**해결**: `runtime = 'edge'` 제거하고 `export const dynamic = 'force-static'`만 사용. 두 파일 모두 빌드 타임에 정적 생성됨.

## Suspense fallback={null}로 인한 CLS

**증상**: Lighthouse CLS(Cumulative Layout Shift) 점수 저하 (0.325)

**원인**: `useSearchParams()` 등을 사용하는 클라이언트 컴포넌트를 `<Suspense fallback={null}>`로 감싸면, hydration 시 컴포넌트가 나타나면서 아래 콘텐츠가 밀림

**해결**: `fallback`에 실제 컴포넌트와 유사한 높이의 스켈레톤 UI 제공. 탭/버튼 형태를 정적으로 렌더링하여 레이아웃 예약.

## 색상 대비 부족 (접근성)

**증상**: Lighthouse Accessibility 점수 저하, `text-gray-500` 대비 부족 경고

**원인**: `text-gray-500`(#6B7280)이 `bg-gray-100`(#F3F4F6) 위에서 WCAG AA 기준 미달. `text-xs` 등 작은 텍스트에서 특히 문제.

**해결**: `text-gray-600 dark:text-gray-400` 사용. 보조 텍스트에도 충분한 대비 확보.

## Vercel 배포 시 `output: 'export'` 사용 금지

**증상**: `Error: The file "/vercel/path0/out/routes-manifest.json" couldn't be found`

**원인**: Vercel의 `@vercel/next` 빌더는 `.next/` 디렉토리 구조를 기대함. `output: 'export'`는 `out/` 디렉토리에 순수 HTML을 생성하여 호환 불가.

**해결**: `next.config.ts`에서 `output: 'export'` 제거. Vercel은 기본 Next.js SSR/SSG 모드로 배포. `generateStaticParams()`가 있으면 빌드 시 정적 생성됨.

## next-mdx-remote CVE 취약점

**증상**: Vercel 빌드 성공 후 배포 차단 — `Vulnerable version of next-mdx-remote detected`

**원인**: next-mdx-remote v5.0.0에 CVE-2026-0969 취약점. Vercel이 배포 차단.

**해결**: `npm install next-mdx-remote@6`. RSC 임포트(`next-mdx-remote/rsc`) 사용 시 코드 변경 불필요.

## Tailwind 다크모드 미적용

**증상**: `dark:` 클래스가 동작하지 않음

**원인**: `tailwind.config.ts`에 `darkMode: 'class'` 미설정

**해결**: `tailwind.config.ts`에 `darkMode: 'class'` 추가, `<html>` 태그에 `dark` 클래스 토글
