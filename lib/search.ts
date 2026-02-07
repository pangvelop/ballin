import type { RuleData, TrainingData, GlossaryTerm } from './types'

// 통합 검색 결과 타입
export type SearchResultType = 'rule' | 'training' | 'glossary'

export interface SearchResult {
  type: SearchResultType
  title: string
  description: string
  href: string
  category?: string
  tags?: string[]
}

// 룰 → 검색 결과 변환
function ruleToSearchResult(rule: RuleData): SearchResult {
  return {
    type: 'rule',
    title: rule.title,
    description: rule.summary,
    href: `/rules/${rule.category}/${rule.slug}`,
    category: rule.category,
    tags: rule.tags,
  }
}

// 연습법 → 검색 결과 변환
function trainingToSearchResult(training: TrainingData): SearchResult {
  return {
    type: 'training',
    title: training.title,
    description: training.summary,
    href: `/training/${training.category}/${training.slug}`,
    category: training.category,
    tags: training.tags,
  }
}

// 용어 → 검색 결과 변환
function glossaryToSearchResult(term: GlossaryTerm): SearchResult {
  return {
    type: 'glossary',
    title: term.term,
    description: term.definition,
    href: '/glossary',
    category: term.category,
    tags: term.english ? [term.english] : [],
  }
}

// 검색 인덱스 생성 (빌드 시 서버에서 호출)
export function buildSearchIndex(
  rules: RuleData[],
  trainings: TrainingData[],
  glossaryTerms: GlossaryTerm[]
): SearchResult[] {
  return [
    ...rules.map(ruleToSearchResult),
    ...trainings.map(trainingToSearchResult),
    ...glossaryTerms.map(glossaryToSearchResult),
  ]
}

// 클라이언트 사이드 검색 필터링
export function searchItems(items: SearchResult[], query: string): SearchResult[] {
  if (!query.trim()) return []

  const lowerQuery = query.toLowerCase().trim()

  return items.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(lowerQuery)
    const descMatch = item.description.toLowerCase().includes(lowerQuery)
    const tagMatch = item.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) ?? false

    return titleMatch || descMatch || tagMatch
  })
}
