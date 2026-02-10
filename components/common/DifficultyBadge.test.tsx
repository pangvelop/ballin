import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DifficultyBadge from './DifficultyBadge'

describe('DifficultyBadge', () => {
  it('beginner 난이도를 "초급"으로 표시한다', () => {
    render(<DifficultyBadge difficulty="beginner" />)
    expect(screen.getByText('초급')).toBeInTheDocument()
  })

  it('intermediate 난이도를 "중급"으로 표시한다', () => {
    render(<DifficultyBadge difficulty="intermediate" />)
    expect(screen.getByText('중급')).toBeInTheDocument()
  })

  it('advanced 난이도를 "고급"으로 표시한다', () => {
    render(<DifficultyBadge difficulty="advanced" />)
    expect(screen.getByText('고급')).toBeInTheDocument()
  })
})
