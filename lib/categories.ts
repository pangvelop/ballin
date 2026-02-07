import type { RuleCategory, TrainingCategory } from './types'

export interface CategoryMeta {
  slug: string
  name: string
  description: string
}

export const RULE_CATEGORIES: Record<RuleCategory, CategoryMeta> = {
  'game-basics': {
    slug: 'game-basics',
    name: '기본 규칙',
    description: '농구 경기의 기본적인 규칙과 진행 방식',
  },
  'five-on-five': {
    slug: 'five-on-five',
    name: '5대5 룰',
    description: '정식 5대5 경기의 규칙과 진행',
  },
  'three-on-three': {
    slug: 'three-on-three',
    name: '3대3 룰',
    description: '3x3 농구의 규칙과 진행 (FIBA 공식)',
  },
  violations: {
    slug: 'violations',
    name: '바이올레이션',
    description: '트래블링, 더블드리블 등 공 소유 관련 반칙',
  },
  fouls: {
    slug: 'fouls',
    name: '파울',
    description: '퍼스널 파울, 테크니컬 파울 등 신체 접촉 반칙',
  },
  positions: {
    slug: 'positions',
    name: '포지션별 역할 & 규칙',
    description: '가드, 포워드, 센터 등 포지션별 역할과 관련 규칙',
  },
  'tactics-rules': {
    slug: 'tactics-rules',
    name: '공격/수비 전술 관련 룰',
    description: '존 디펜스, 일리걸 디펜스 등 전술 관련 규칙',
  },
  sportsmanship: {
    slug: 'sportsmanship',
    name: '경기 매너 & 스포츠맨십',
    description: '경기 예절, 스포츠맨십, 페어플레이',
  },
  'special-situations': {
    slug: 'special-situations',
    name: '특수 상황',
    description: '오버타임, 동점 처리, 항의 절차 등',
  },
}

export const TRAINING_CATEGORIES: Record<TrainingCategory, CategoryMeta> = {
  'individual-skills': {
    slug: 'individual-skills',
    name: '개인 스킬',
    description: '드리블, 슈팅, 패스, 수비 등 개인 기술 연습',
  },
  'team-tactics': {
    slug: 'team-tactics',
    name: '팀 전술 & 플레이',
    description: '픽앤롤, 팀 수비 등 팀 전술 연습',
  },
  fitness: {
    slug: 'fitness',
    name: '체력 & 컨디셔닝',
    description: '코트 러닝, 민첩성, 체력 강화 훈련',
  },
}
