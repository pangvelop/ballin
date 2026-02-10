import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import RuleCard from './RuleCard'
import { MOCK_RULES } from '@/__tests__/fixtures/rules'

describe('RuleCard', () => {
  const rule = MOCK_RULES[0]!

  it('룰 제목을 표시한다', () => {
    render(<RuleCard rule={rule} />)
    expect(screen.getByText('트래블링 (Traveling)')).toBeInTheDocument()
  })

  it('룰 요약을 표시한다', () => {
    render(<RuleCard rule={rule} />)
    expect(screen.getByText(rule.summary)).toBeInTheDocument()
  })

  it('난이도 배지를 표시한다', () => {
    render(<RuleCard rule={rule} />)
    expect(screen.getByText('초급')).toBeInTheDocument()
  })

  it('올바른 href로 링크한다', () => {
    render(<RuleCard rule={rule} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/rules/violations/traveling')
  })

  it('태그를 표시한다 (최대 3개)', () => {
    render(<RuleCard rule={rule} />)
    expect(screen.getByText('바이올레이션')).toBeInTheDocument()
    expect(screen.getByText('드리블')).toBeInTheDocument()
  })
})
