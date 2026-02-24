import { describe, it, expect, beforeEach } from 'vitest'
import { getQuizProgress, saveQuizProgress, getAllQuizProgress } from './quiz-progress'
import type { QuizProgress } from './types'

describe('quiz-progress', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  const progress: QuizProgress = {
    slug: 'traveling',
    score: 3,
    total: 4,
    completedAt: '2026-02-24T12:00:00.000Z',
    answers: [0, 1, 2, 0],
  }

  it('진행률을 저장하고 조회한다', () => {
    saveQuizProgress(progress)
    const result = getQuizProgress('traveling')
    expect(result).toEqual(progress)
  })

  it('없는 slug를 조회하면 null을 반환한다', () => {
    expect(getQuizProgress('nonexistent')).toBeNull()
  })

  it('전체 진행률을 조회한다', () => {
    const progress2: QuizProgress = {
      slug: 'double-dribble',
      score: 2,
      total: 3,
      completedAt: '2026-02-24T13:00:00.000Z',
      answers: [1, 0, 1],
    }
    saveQuizProgress(progress)
    saveQuizProgress(progress2)

    const all = getAllQuizProgress()
    expect(all).toHaveLength(2)
    expect(all).toContainEqual(progress)
    expect(all).toContainEqual(progress2)
  })

  it('같은 slug로 다시 저장하면 덮어쓴다', () => {
    saveQuizProgress(progress)
    const updated: QuizProgress = { ...progress, score: 4 }
    saveQuizProgress(updated)

    const result = getQuizProgress('traveling')
    expect(result?.score).toBe(4)
  })
})
