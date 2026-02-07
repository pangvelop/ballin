# START_GUIDE.md — Claude Code 세션 프롬프트 가이드

> 각 Phase/Milestone 시작 시 아래 프롬프트를 Claude Code에 복사-붙여넣기하여 사용.
> `@파일명`은 Claude Code의 컨텍스트 참조 문법.

---

## 매일 작업 시작 템플릿

```
/clear

@CLAUDE.md @docs/prompt_plan.md 읽어줘.

어제 [완료한 Task 번호] 완료했어.
오늘은 [다음 Task 번호] 진행할게.

ultrathink로 먼저 계획 세우고 시작해줘.
```

## 작업 종료 템플릿

```
/handoff

오늘 완료한 것:
- Task X.X: [설명]
- Task X.X: [설명]

남은 이슈:
- [있다면 기록]
```

---

## Phase 1: 프로젝트 셋업 & 핵심 인프라

### Milestone 1.1: 프로젝트 초기화 (Task 1.1~1.6)

```
@CLAUDE.md 읽어줘.

Phase 1, Milestone 1.1 진행: 프로젝트 초기화.

Task 순서:
1. Task 1.1: Next.js 15 프로젝트 생성 (App Router, TypeScript, src/ 없이 루트 구조)
2. Task 1.2: Tailwind CSS 설정 (darkMode: 'class', 농구 테마 컬러 팔레트)
3. Task 1.3: ESLint + Prettier 설정 (CLAUDE.md 코드 스타일 규칙 따르기)
4. Task 1.4: tsconfig.json strict mode + path alias
5. Task 1.5: 디렉토리 구조 생성 (CLAUDE.md 아키텍처 섹션 참조)
6. Task 1.6: .gitignore 설정

완료 후 `npm run dev`로 정상 작동 확인해줘.
```

### Milestone 1.2: MDX 콘텐츠 시스템 (Task 1.7~1.10)

```
@CLAUDE.md 읽어줘.

Phase 1, Milestone 1.2 진행: MDX 콘텐츠 시스템 구축.

Task 순서:
1. Task 1.7: MDX 파서 라이브러리 설치 및 설정
   - next-mdx-remote 또는 적합한 라이브러리 선택
   - 프론트매터 YAML 파싱 지원 필수
2. Task 1.8: lib/content.ts 구현
   - getAllRules(), getRuleBySlug(category, slug)
   - getAllTraining(), getTrainingBySlug(category, slug)
   - getAllRoutines(), getRoutineBySlug(slug)
   - getAllGlossaryTerms()
3. Task 1.9: TypeScript 타입 정의
   - RuleFrontmatter, TrainingFrontmatter, RoutineFrontmatter, GlossaryTerm
   - CLAUDE.md의 프론트매터 스키마 참조
4. Task 1.10: 샘플 MDX 파일 3개 작성
   - content/rules/violations/traveling.mdx
   - content/rules/fouls/personal-foul.mdx
   - content/training/individual-skills/crossover-dribble.mdx

샘플 MDX로 파싱이 정상 작동하는지 테스트해줘.
```

### Milestone 1.3: 공통 레이아웃 (Task 1.11~1.15)

```
@CLAUDE.md 읽어줘.

Phase 1, Milestone 1.3 진행: 공통 레이아웃 컴포넌트.

Task 순서:
1. Task 1.11: app/layout.tsx (HTML 구조, 폰트, 기본 메타데이터)
2. Task 1.12: components/layout/Header.tsx
   - 로고, 네비게이션 (룰북/연습법/루틴/용어사전)
   - 검색바 자리 (기능은 Phase 3)
3. Task 1.13: components/layout/Footer.tsx
4. Task 1.14: components/layout/Breadcrumb.tsx
5. Task 1.15: 모바일 반응형 햄버거 메뉴

모바일 퍼스트로 설계. Tailwind만 사용. 인라인 스타일 금지.
```

---

## Phase 2: 룰북 섹션 (MVP 핵심)

### Milestone 2.1~2.2: 룰북 페이지 & 컴포넌트 (Task 2.1~2.8)

```
/clear

@CLAUDE.md @docs/prompt_plan.md 읽어줘.

Phase 2 진행: 룰북 섹션 구현.

Milestone 2.1 (페이지 구조):
1. Task 2.1: app/rules/page.tsx — 9개 카테고리 목록 (카드 그리드)
2. Task 2.2: app/rules/[category]/page.tsx — 카테고리별 룰 목록 + generateStaticParams
3. Task 2.3: app/rules/[category]/[slug]/page.tsx — 개별 룰 페이지 + generateStaticParams + generateMetadata

Milestone 2.2 (컴포넌트):
4. Task 2.4: components/rules/RuleCompare.tsx — FIBA/NBA 탭 전환 (URL query 기반)
5. Task 2.5: components/rules/RuleCard.tsx — 룰 목록 카드
6. Task 2.6: components/common/DifficultyBadge.tsx — 난이도 배지
7. Task 2.7: components/common/VideoEmbed.tsx — YouTube 임베드 (lazy, 16:9)
8. Task 2.8: components/common/InfoBox.tsx — 강조 박스

CLAUDE.md의 카테고리 slug 매핑과 컴포넌트 규칙을 반드시 따라줘.
기존 샘플 MDX(traveling.mdx, personal-foul.mdx)로 동작 확인.
```

### Milestone 2.3: 룰북 콘텐츠 (Task 2.9~2.17)

```
/clear

@CLAUDE.md @docs/prompt_plan.md 읽어줘.

Phase 2, Milestone 2.3 진행: 룰북 MDX 콘텐츠 작성.

카테고리별로 핵심 룰 2~3개씩 작성해줘.
CLAUDE.md의 룰 프론트매터 스키마를 반드시 따라야 해.

각 MDX 파일에 포함할 것:
- 프론트매터 (title, category, difficulty, summary, tags, relatedRules, videos, fiba, nba)
- 본문 (한 줄 요약, 상세 설명, 자주 헷갈리는 포인트)
- YouTube 영상은 실제 URL 대신 placeholder (https://youtube.com/watch?v=PLACEHOLDER)

Task 2.9~2.17 순서대로 진행.
각 카테고리 완료할 때마다 빌드 테스트해줘.
```

### Milestone 2.4: 홈페이지 (Task 2.18)

```
/clear

@CLAUDE.md 읽어줘.

Task 2.18 진행: 홈페이지 구현.

포함할 섹션:
1. 히어로 섹션 — 프로젝트 소개, "농구를 더 잘 알고 싶다면" 느낌
2. 추천 콘텐츠 카드 — 인기 룰 3~4개 (하드코딩 OK)
3. 빠른 바로가기 — 초보자 시작 가이드 링크
4. 검색바 자리 (UI만, 기능은 Phase 3)

모바일 퍼스트. 간결하고 깔끔하게.
```

---

## Phase 3: 연습법 & 용어사전 & 검색

### Milestone 3.1~3.3: 연습법 (Task 3.1~3.8)

```
/clear

@CLAUDE.md @docs/prompt_plan.md 읽어줘.

Phase 3 진행: 연습법 섹션.

Milestone 3.1 (페이지):
1. Task 3.1: app/training/page.tsx
2. Task 3.2: app/training/[category]/page.tsx
3. Task 3.3: app/training/[category]/[slug]/page.tsx

Milestone 3.2 (컴포넌트):
4. Task 3.4: components/training/DrillCard.tsx
5. Task 3.5: 개별 연습법 페이지 레이아웃

Milestone 3.3 (콘텐츠):
6. Task 3.6: individual-skills 콘텐츠 3~5개
7. Task 3.7: team-tactics 콘텐츠 2~3개
8. Task 3.8: fitness 콘텐츠 2~3개

룰북 패턴(Phase 2)을 참고하되, 연습법 프론트매터 스키마 사용.
```

### Milestone 3.4~3.5: 용어사전 & 검색 (Task 3.9~3.14)

```
/clear

@CLAUDE.md @docs/prompt_plan.md 읽어줘.

Phase 3 후반 진행: 용어사전 + 통합 검색.

Milestone 3.4 (용어사전):
1. Task 3.9: app/glossary/page.tsx
2. Task 3.10: components/glossary/GlossarySearch.tsx
3. Task 3.11: content/glossary/ 용어 데이터 30~50개

Milestone 3.5 (검색 & 필터):
4. Task 3.12: lib/search.ts — 검색 인덱스 (빌드 시 생성)
5. Task 3.13: components/common/SearchBar.tsx — 헤더 검색바
6. Task 3.14: components/common/FilterBar.tsx — 난이도 필터

검색은 서버 없이 클라이언트 사이드. 디바운스 적용.
```

---

## Phase 4: 사용성 강화

### Milestone 4.1~4.4 (Task 4.1~4.9)

```
/clear

@CLAUDE.md @docs/prompt_plan.md 읽어줘.

Phase 4 진행: 사용성 강화.

순서:
1. Task 4.1: RuleCompare 비교 모드 확장 (토글, 나란히 표시, 차이점 하이라이트)
2. Task 4.2~4.5: 추천 루틴 섹션 (페이지 + RoutineView 컴포넌트 + 콘텐츠)
3. Task 4.6~4.8: 북마크 (localStorage, BookmarkButton, 홈 바로가기)
4. Task 4.9: 다크모드 (next-themes, Tailwind dark:, 토글)

각 Milestone 완료마다 빌드 확인.
```

---

## Phase 5: 배포 & 최적화

### Milestone 5.1~5.3 (Task 5.1~5.12)

```
/clear

@CLAUDE.md @docs/prompt_plan.md 읽어줘.

Phase 5 진행: 배포 준비.

순서:
1. Task 5.1~5.5: SEO & 성능 (메타데이터 검증, sitemap, robots, 이미지 최적화, Lighthouse 90+)
2. Task 5.6~5.7: CI/CD (GitHub Actions, Vercel 배포)
3. Task 5.8~5.12: 콘텐츠 완성 (룰/연습법 보충, 용어사전 50+, 영상 큐레이션, 교차 링크)

배포 전 최종 체크:
- npm run lint && npm run typecheck && npm run build 통과
- 모든 동적 라우트 generateStaticParams 확인
- 모바일 반응형 전체 페이지 확인
```

---

## 디버깅 가이드

```
# 단순 버그 — 에러 메시지 포함
think 이 에러 해결해줘: [에러 메시지]

# 복잡한 버그 — 컨텍스트 초기화 후 집중
/clear
think hard
[상황 설명 + 에러 메시지 + 시도한 것]

# 아키텍처 문제 — 전체 구조 재검토
/clear
@CLAUDE.md 읽어줘.
ultrathink
[문제 설명]
```
