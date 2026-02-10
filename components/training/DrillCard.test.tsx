import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DrillCard from './DrillCard'
import { MOCK_DRILLS } from '@/__tests__/fixtures/training'

describe('DrillCard', () => {
  const drill = MOCK_DRILLS[0]!

  it('연습법 제목을 표시한다', () => {
    render(<DrillCard drill={drill} />)
    expect(screen.getByText('크로스오버 드리블 기초')).toBeInTheDocument()
  })

  it('연습법 요약을 표시한다', () => {
    render(<DrillCard drill={drill} />)
    expect(screen.getByText(drill.summary)).toBeInTheDocument()
  })

  it('소요시간을 표시한다', () => {
    render(<DrillCard drill={drill} />)
    expect(screen.getByText('15분')).toBeInTheDocument()
  })

  it('난이도 배지를 표시한다', () => {
    render(<DrillCard drill={drill} />)
    expect(screen.getByText('초급')).toBeInTheDocument()
  })

  it('올바른 href로 링크한다', () => {
    render(<DrillCard drill={drill} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/training/individual-skills/crossover-basic')
  })

  it('장비 목록을 표시한다', () => {
    render(<DrillCard drill={drill} />)
    expect(screen.getByText('농구공 1개')).toBeInTheDocument()
  })
})
