import { describe, it, expect } from 'vitest'
import { RULE_CATEGORIES, TRAINING_CATEGORIES } from './categories'
import type { RuleCategory, TrainingCategory } from './types'

describe('RULE_CATEGORIES', () => {
  const EXPECTED_SLUGS: RuleCategory[] = [
    'game-basics',
    'five-on-five',
    'three-on-three',
    'violations',
    'fouls',
    'positions',
    'tactics-rules',
    'sportsmanship',
    'special-situations',
  ]

  it('9개 카테고리가 모두 정의되어 있다', () => {
    expect(Object.keys(RULE_CATEGORIES)).toHaveLength(9)
  })

  it.each(EXPECTED_SLUGS)('"%s" 카테고리가 존재한다', (slug) => {
    expect(RULE_CATEGORIES[slug]).toBeDefined()
  })

  it('각 카테고리에 slug, name, description이 있다', () => {
    for (const [key, meta] of Object.entries(RULE_CATEGORIES)) {
      expect(meta.slug).toBe(key)
      expect(meta.name).toBeTruthy()
      expect(meta.description).toBeTruthy()
    }
  })
})

describe('TRAINING_CATEGORIES', () => {
  const EXPECTED_SLUGS: TrainingCategory[] = [
    'individual-skills',
    'team-tactics',
    'fitness',
  ]

  it('3개 카테고리가 모두 정의되어 있다', () => {
    expect(Object.keys(TRAINING_CATEGORIES)).toHaveLength(3)
  })

  it.each(EXPECTED_SLUGS)('"%s" 카테고리가 존재한다', (slug) => {
    expect(TRAINING_CATEGORIES[slug]).toBeDefined()
  })

  it('각 카테고리에 slug, name, description이 있다', () => {
    for (const [key, meta] of Object.entries(TRAINING_CATEGORIES)) {
      expect(meta.slug).toBe(key)
      expect(meta.name).toBeTruthy()
      expect(meta.description).toBeTruthy()
    }
  })
})
