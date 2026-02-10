import { describe, it, expect } from 'vitest'
import { buildSearchIndex, searchItems } from './search'
import type { SearchResult } from './search'
import { MOCK_RULES } from '@/__tests__/fixtures/rules'
import { MOCK_DRILLS } from '@/__tests__/fixtures/training'
import { MOCK_TERMS } from '@/__tests__/fixtures/glossary'

describe('buildSearchIndex', () => {
  it('룰, 연습법, 용어를 통합 검색 결과로 변환한다', () => {
    const index = buildSearchIndex(MOCK_RULES, MOCK_DRILLS, MOCK_TERMS)
    expect(index).toHaveLength(MOCK_RULES.length + MOCK_DRILLS.length + MOCK_TERMS.length)
  })

  it('룰 데이터를 올바른 형태로 변환한다', () => {
    const index = buildSearchIndex(MOCK_RULES, [], [])
    const rule = index[0]!
    expect(rule.type).toBe('rule')
    expect(rule.title).toBe('트래블링 (Traveling)')
    expect(rule.href).toBe('/rules/violations/traveling')
    expect(rule.tags).toContain('바이올레이션')
  })

  it('연습법 데이터를 올바른 형태로 변환한다', () => {
    const index = buildSearchIndex([], MOCK_DRILLS, [])
    const drill = index[0]!
    expect(drill.type).toBe('training')
    expect(drill.title).toBe('크로스오버 드리블 기초')
    expect(drill.href).toBe('/training/individual-skills/crossover-basic')
  })

  it('용어 데이터를 올바른 형태로 변환한다', () => {
    const index = buildSearchIndex([], [], MOCK_TERMS)
    const term = index[0]!
    expect(term.type).toBe('glossary')
    expect(term.title).toBe('트래블링')
    expect(term.href).toBe('/glossary')
    expect(term.tags).toContain('Traveling')
  })

  it('빈 입력이면 빈 배열을 반환한다', () => {
    const index = buildSearchIndex([], [], [])
    expect(index).toEqual([])
  })
})

describe('searchItems', () => {
  const searchIndex: SearchResult[] = buildSearchIndex(MOCK_RULES, MOCK_DRILLS, MOCK_TERMS)

  it('빈 쿼리이면 빈 배열을 반환한다', () => {
    expect(searchItems(searchIndex, '')).toEqual([])
    expect(searchItems(searchIndex, '   ')).toEqual([])
  })

  it('제목으로 검색할 수 있다', () => {
    const results = searchItems(searchIndex, '트래블링')
    expect(results.length).toBeGreaterThanOrEqual(1)
    expect(results.some((r) => r.title.includes('트래블링'))).toBe(true)
  })

  it('설명으로 검색할 수 있다', () => {
    const results = searchItems(searchIndex, '신체 접촉')
    expect(results.length).toBeGreaterThanOrEqual(1)
  })

  it('태그로 검색할 수 있다', () => {
    const results = searchItems(searchIndex, '볼핸들링')
    expect(results.length).toBeGreaterThanOrEqual(1)
  })

  it('대소문자를 구분하지 않는다', () => {
    const results = searchItems(searchIndex, 'traveling')
    expect(results.length).toBeGreaterThanOrEqual(1)
  })

  it('매칭되지 않으면 빈 배열을 반환한다', () => {
    const results = searchItems(searchIndex, '존재하지않는검색어xyz')
    expect(results).toEqual([])
  })

  it('쿼리 앞뒤 공백을 무시한다', () => {
    const trimmed = searchItems(searchIndex, '  트래블링  ')
    const normal = searchItems(searchIndex, '트래블링')
    expect(trimmed).toEqual(normal)
  })
})
