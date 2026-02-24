# MDX 콘텐츠 규칙

## 룰 페이지 프론트매터 (필수 필드)

```yaml
---
title: "트래블링 (Traveling)"
category: "violations"                 # 9개 카테고리 중 하나
difficulty: "beginner"                 # beginner | intermediate | advanced
summary: "공을 가진 상태에서 허용된 스텝 수를 초과하여 이동하는 반칙"
tags: ["바이올레이션", "드리블"]
relatedRules: ["double-dribble"]       # 관련 룰 slug 배열
videos:
  - url: "https://youtube.com/watch?v=xxx"
    title: "영상 제목"
    source: "NBA Official"
fiba:
  description: "FIBA 기준 설명..."
  keyPoints: ["포인트1", "포인트2"]
nba:
  description: "NBA 기준 설명..."
  keyPoints: ["포인트1", "포인트2"]
---
```

## 연습법 페이지 프론트매터 (필수 필드)

```yaml
---
title: "크로스오버 드리블 기초"
category: "individual-skills"          # individual-skills | team-tactics | fitness
subcategory: "ball-handling"
difficulty: "beginner"
duration: "15분"
equipment: ["농구공 1개"]
summary: "한 줄 설명"
tags: ["볼핸들링", "드리블"]
videos:
  - url: "https://youtube.com/watch?v=xxx"
    title: "영상 제목"
commonMistakes:
  - "흔한 실수 1"
  - "흔한 실수 2"
relatedDrills: ["behind-the-back"]
---
```

## 카테고리 slug 매핑

| 룰북 카테고리 | slug |
|---------------|------|
| 기본 규칙 | `game-basics` |
| 5대5 룰 | `five-on-five` |
| 3대3 룰 | `three-on-three` |
| 바이올레이션 | `violations` |
| 파울 | `fouls` |
| 포지션별 역할 & 규칙 | `positions` |
| 공격/수비 전술 관련 룰 | `tactics-rules` |
| 경기 매너 & 스포츠맨십 | `sportsmanship` |
| 특수 상황 | `special-situations` |

| 연습법 카테고리 | slug |
|----------------|------|
| 개인 스킬 | `individual-skills` |
| 팀 전술 & 플레이 | `team-tactics` |
| 체력 & 컨디셔닝 | `fitness` |
