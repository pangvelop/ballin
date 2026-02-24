import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuizQuestion from './QuizQuestion'
import type { QuizQuestion as QuizQuestionType } from '@/lib/types'

const mcQuestion: QuizQuestionType = {
  id: 'q1',
  type: 'multiple-choice',
  question: '트래블링은 몇 스텝 초과 시 반칙인가?',
  options: ['1스텝', '2스텝', '3스텝', '4스텝'],
  answer: 1,
  explanation: '2스텝을 초과하면 트래블링입니다.',
}

const tfQuestion: QuizQuestionType = {
  id: 'q2',
  type: 'true-false',
  question: 'NBA에서 유로 스텝은 합법이다.',
  answer: true,
  explanation: 'NBA 규정상 유로 스텝은 허용됩니다.',
}

describe('QuizQuestion', () => {
  it('객관식 문제를 렌더링한다', () => {
    render(<QuizQuestion question={mcQuestion} onAnswer={vi.fn()} answered={false} />)
    expect(screen.getByText('트래블링은 몇 스텝 초과 시 반칙인가?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '1스텝' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '2스텝' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '3스텝' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '4스텝' })).toBeInTheDocument()
  })

  it('O/X 문제를 렌더링한다', () => {
    render(<QuizQuestion question={tfQuestion} onAnswer={vi.fn()} answered={false} />)
    expect(screen.getByText('NBA에서 유로 스텝은 합법이다.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'O' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'X' })).toBeInTheDocument()
  })

  it('정답 선택 시 해설을 표시한다', async () => {
    const user = userEvent.setup()
    const onAnswer = vi.fn()
    const { rerender } = render(
      <QuizQuestion question={mcQuestion} onAnswer={onAnswer} answered={false} />
    )

    await user.click(screen.getByRole('button', { name: '2스텝' }))
    expect(onAnswer).toHaveBeenCalledWith(1)

    rerender(<QuizQuestion question={mcQuestion} onAnswer={onAnswer} answered={true} selectedAnswer={1} />)
    expect(screen.getByText('2스텝을 초과하면 트래블링입니다.')).toBeInTheDocument()
  })

  it('오답 선택 시 정답을 표시한다', async () => {
    const user = userEvent.setup()
    const onAnswer = vi.fn()
    const { rerender } = render(
      <QuizQuestion question={mcQuestion} onAnswer={onAnswer} answered={false} />
    )

    await user.click(screen.getByRole('button', { name: '1스텝' }))
    expect(onAnswer).toHaveBeenCalledWith(0)

    rerender(<QuizQuestion question={mcQuestion} onAnswer={onAnswer} answered={true} selectedAnswer={0} />)
    expect(screen.getByText('2스텝을 초과하면 트래블링입니다.')).toBeInTheDocument()
  })
})
