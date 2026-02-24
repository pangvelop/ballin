// MDX 콘텐츠 공통 타입

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface Video {
  url: string
  title: string
  source?: string
  type?: 'youtube' | 'mp4' | 'webm'
  poster?: string
}

// 룰 카테고리 slug
export type RuleCategory =
  | 'game-basics'
  | 'five-on-five'
  | 'three-on-three'
  | 'violations'
  | 'fouls'
  | 'positions'
  | 'tactics-rules'
  | 'sportsmanship'
  | 'special-situations'

// 연습법 카테고리 slug
export type TrainingCategory = 'individual-skills' | 'team-tactics' | 'fitness'

// FIBA/NBA 리그별 정보
export interface LeagueInfo {
  description: string
  keyPoints: string[]
}

// 룰 프론트매터
export interface RuleFrontmatter {
  title: string
  category: RuleCategory
  difficulty: Difficulty
  summary: string
  tags: string[]
  relatedRules?: string[]
  videos?: Video[]
  fiba: LeagueInfo
  nba: LeagueInfo
}

// 룰 데이터 (프론트매터 + 메타)
export interface RuleData extends RuleFrontmatter {
  slug: string
  content: string
}

// 연습법 프론트매터
export interface TrainingFrontmatter {
  title: string
  category: TrainingCategory
  subcategory: string
  difficulty: Difficulty
  duration: string
  equipment: string[]
  summary: string
  tags: string[]
  videos?: Video[]
  commonMistakes?: string[]
  relatedDrills?: string[]
}

// 연습법 데이터 (프론트매터 + 메타)
export interface TrainingData extends TrainingFrontmatter {
  slug: string
  content: string
}

// 루틴 프론트매터
export interface RoutineFrontmatter {
  title: string
  difficulty: Difficulty
  duration: string
  summary: string
  tags: string[]
  drills: string[]
  videos?: Video[]
}

// 루틴 데이터 (프론트매터 + 메타)
export interface RoutineData extends RoutineFrontmatter {
  slug: string
  content: string
}

// 용어사전 항목
export interface GlossaryTerm {
  term: string
  definition: string
  english?: string
  category?: string
  relatedTerms?: string[]
}
