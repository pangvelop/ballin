# 컴포넌트 규칙

## FIBA/NBA 비교 (RuleCompare)

- **기본 모드**: FIBA / NBA 탭 전환. 초보자용으로 한쪽만 표시.
- **비교 모드**: 상단 토글로 나란히 비교. 차이점 하이라이트 (FIBA 고유=파란색, NBA 고유=빨간색, 공통=기본 스타일).
- 탭 상태는 URL query (`?league=fiba` 또는 `?league=nba`)로 관리하여 공유 가능

## 난이도 배지 (DifficultyBadge)

- `beginner` = 초급
- `intermediate` = 중급
- `advanced` = 고급

## VideoEmbed

- YouTube iframe + MP4/WebM 네이티브 `<video>` 지원
- YouTube: `loading="lazy"` 필수, 반응형 16:9 비율 유지
- MP4/WebM: `preload="none"`, `controls`, `poster` prop 지원
- URL 확장자(`.mp4`, `.webm`)로 자동 감지 → MIME 타입 매핑

## InfoBox

- 용도 1: **자주 헷갈리는 포인트** (룰 페이지)
- 용도 2: **흔한 실수 & 교정법** (연습법 페이지)
- 시각적으로 구분되는 강조 박스 스타일

## HeroSearchTrigger

- 홈 히어로 영역의 검색 트리거 버튼 (`'use client'`)
- 검색 입력 필드처럼 보이지만 실제로는 버튼 (read-only)
- 클릭 시 `Cmd+K` KeyboardEvent 디스패치 → 기존 SearchBar 모달 오픈

## 퀴즈 시스템 (Quiz)

- **QuizSection**: 퀴즈 전체 오케스트레이터 (`'use client'`)
  - `quiz: Quiz`, `slug: string` props
  - 순차 질문 표시 → 답변 추적 → 완료 시 점수 표시
  - `localStorage` 진행률 저장 (`ballin-quiz-{slug}`)
  - 이전 진행률 있으면 자동 로드
- **QuizQuestion**: 개별 문제 렌더링
  - `multiple-choice`: 4지선다 (A/B/C/D)
  - `true-false`: O/X 버튼
  - 정답 초록색 하이라이트, 오답 빨간색 + 해설 표시
- **QuizResult**: 결과 표시 + 다시 풀기 버튼
  - 점수/총점, 퍼센트, 재시도 콜백

## Breadcrumb

- 모든 하위 페이지에 표시
- 형식: `홈 > 룰북 > 파울 > 테크니컬 파울`
- 현재 페이지는 비활성 텍스트, 나머지는 링크

## SEO

- 모든 페이지에 적절한 `<title>`과 `<meta description>` 필수
- Next.js `metadata` export 또는 `generateMetadata` 사용
- MDX 프론트매터의 `title`과 `summary`를 메타데이터에 활용
- Open Graph 이미지: `app/opengraph-image.tsx`에서 `ImageResponse`로 빌드 타임 생성
- Apple 터치 아이콘: `app/apple-icon.tsx`에서 동일 방식
- `metadataBase: new URL('https://ballin-three.vercel.app')` — OG 이미지 절대 URL용
