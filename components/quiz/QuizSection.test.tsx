import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuizSection from './QuizSection'
import type { Quiz } from '@/lib/types'

vi.mock('@/lib/quiz-progress', () => ({
  getQuizProgress: vi.fn(() => null),
  saveQuizProgress: vi.fn(),
}))

const quiz: Quiz = {
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: '첫 번째 문제',
      options: ['A', 'B', 'C', 'D'],
      answer: 0,
      explanation: '정답은 A입니다.',
    },
    {
      id: 'q2',
      type: 'true-false',
      question: '두 번째 문제',
      answer: true,
      explanation: '맞습니다.',
    },
  ],
}

describe('QuizSection', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('퀴즈 제목을 표시한다', () => {
    render(<QuizSection quiz={quiz} slug="traveling" />)
    expect(screen.getByText('퀴즈로 확인하기')).toBeInTheDocument()
  })

  it('첫 번째 문제를 표시한다', () => {
    render(<QuizSection quiz={quiz} slug="traveling" />)
    expect(screen.getByText('첫 번째 문제')).toBeInTheDocument()
  })

  it('문제를 풀고 다음 문제로 이동한다', async () => {
    const user = userEvent.setup()
    render(<QuizSection quiz={quiz} slug="traveling" />)

    // 첫 번째 문제 답변
    await user.click(screen.getByRole('button', { name: 'A' }))
    // 다음 버튼 클릭
    await user.click(screen.getByRole('button', { name: '다음' }))

    // 두 번째 문제 표시
    expect(screen.getByText('두 번째 문제')).toBeInTheDocument()
  })

  it('마지막 문제 후 결과를 표시한다', async () => {
    const user = userEvent.setup()
    render(<QuizSection quiz={quiz} slug="traveling" />)

    // 첫 번째 문제
    await user.click(screen.getByRole('button', { name: 'A' }))
    await user.click(screen.getByRole('button', { name: '다음' }))

    // 두 번째 문제
    await user.click(screen.getByRole('button', { name: 'O' }))
    await user.click(screen.getByRole('button', { name: '결과 보기' }))

    // 결과 표시
    expect(screen.getByText('2 / 2')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
  })
})
