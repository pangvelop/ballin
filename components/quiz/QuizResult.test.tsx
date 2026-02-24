import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuizResult from './QuizResult'

describe('QuizResult', () => {
  it('정답률을 표시한다', () => {
    render(<QuizResult score={3} total={4} onRetry={vi.fn()} />)
    expect(screen.getByText('3 / 4')).toBeInTheDocument()
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('다시 풀기 버튼을 표시한다', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    render(<QuizResult score={2} total={3} onRetry={onRetry} />)

    await user.click(screen.getByRole('button', { name: '다시 풀기' }))
    expect(onRetry).toHaveBeenCalled()
  })

  it('만점이면 100%를 표시한다', () => {
    render(<QuizResult score={4} total={4} onRetry={vi.fn()} />)
    expect(screen.getByText('100%')).toBeInTheDocument()
  })
})
