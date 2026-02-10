import { describe, it, expect, vi, beforeEach } from 'vitest'

const mdxContent = `---
title: "트래블링 (Traveling)"
category: "violations"
difficulty: "beginner"
summary: "공을 가진 상태에서 허용된 스텝 수를 초과하여 이동하는 반칙"
tags: ["바이올레이션", "드리블"]
relatedRules: ["double-dribble"]
fiba:
  description: "FIBA 기준 트래블링 규정"
  keyPoints:
    - "피벗풋 이동 시 바이올레이션"
nba:
  description: "NBA 기준 트래블링 규정"
  keyPoints:
    - "게더 스텝 후 2보까지 허용"
---

트래블링에 대한 상세 설명입니다.
`

const termsJson = JSON.stringify([
  {
    term: '트래블링',
    definition: '공을 가지고 허용된 스텝 수를 초과하여 이동하는 반칙',
    english: 'Traveling',
    category: '바이올레이션',
  },
  {
    term: '더블드리블',
    definition: '드리블을 멈춘 후 다시 드리블하는 반칙',
    english: 'Double Dribble',
    category: '바이올레이션',
  },
])

const existsSyncMock = vi.fn<(p: string) => boolean>()
const readdirSyncMock = vi.fn<(dir: string) => string[]>()
const statSyncMock = vi.fn()
const readFileSyncMock = vi.fn<(p: string, enc: string) => string>()

vi.mock('fs', () => ({
  default: {
    existsSync: (...args: unknown[]) => existsSyncMock(...(args as [string])),
    readdirSync: (...args: unknown[]) => readdirSyncMock(...(args as [string])),
    statSync: (...args: unknown[]) => statSyncMock(...args),
    readFileSync: (...args: unknown[]) => readFileSyncMock(...(args as [string, string])),
  },
  existsSync: (...args: unknown[]) => existsSyncMock(...(args as [string])),
  readdirSync: (...args: unknown[]) => readdirSyncMock(...(args as [string])),
  statSync: (...args: unknown[]) => statSyncMock(...args),
  readFileSync: (...args: unknown[]) => readFileSyncMock(...(args as [string, string])),
}))

import { getAllRules, getRuleBySlug, getAllGlossaryTerms } from './content'

function setupDefaultMocks() {
  existsSyncMock.mockImplementation((p: string) => {
    if (p.includes('content/rules') && p.endsWith('violations')) return true
    if (p.includes('content/rules') && !p.endsWith('.mdx')) return true
    if (p.endsWith('traveling.mdx')) return true
    if (p.endsWith('terms.json')) return true
    return false
  })

  readdirSyncMock.mockImplementation((dir: string) => {
    if (dir.endsWith('content/rules')) return ['violations']
    if (dir.endsWith('violations')) return ['traveling.mdx']
    return []
  })

  statSyncMock.mockReturnValue({ isDirectory: () => true })

  readFileSyncMock.mockImplementation((p: string) => {
    if (p.endsWith('.mdx')) return mdxContent
    if (p.endsWith('terms.json')) return termsJson
    return ''
  })
}

describe('content.ts', () => {
  beforeEach(() => {
    existsSyncMock.mockReset()
    readdirSyncMock.mockReset()
    statSyncMock.mockReset()
    readFileSyncMock.mockReset()
    setupDefaultMocks()
  })

  describe('getAllRules', () => {
    it('MDX 파일을 파싱하여 룰 목록을 반환한다', () => {
      const rules = getAllRules()
      expect(rules).toHaveLength(1)
      expect(rules[0]!.title).toBe('트래블링 (Traveling)')
      expect(rules[0]!.slug).toBe('traveling')
      expect(rules[0]!.category).toBe('violations')
    })

    it('룰 디렉토리가 없으면 빈 배열을 반환한다', () => {
      existsSyncMock.mockReturnValue(false)
      const rules = getAllRules()
      expect(rules).toEqual([])
    })
  })

  describe('getRuleBySlug', () => {
    it('존재하는 룰을 반환한다', () => {
      const rule = getRuleBySlug('violations', 'traveling')
      expect(rule).not.toBeNull()
      expect(rule!.title).toBe('트래블링 (Traveling)')
    })

    it('존재하지 않는 룰이면 null을 반환한다', () => {
      existsSyncMock.mockReturnValue(false)
      const rule = getRuleBySlug('violations', 'non-existent')
      expect(rule).toBeNull()
    })
  })

  describe('getAllGlossaryTerms', () => {
    it('용어사전 JSON을 파싱하여 반환한다', () => {
      const terms = getAllGlossaryTerms()
      expect(terms).toHaveLength(2)
      expect(terms[0]!.term).toBe('트래블링')
    })

    it('파일이 없으면 빈 배열을 반환한다', () => {
      existsSyncMock.mockReturnValue(false)
      const terms = getAllGlossaryTerms()
      expect(terms).toEqual([])
    })
  })
})
