import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import RelatedContent from './RelatedContent'

describe('RelatedContent', () => {
  const items = [
    { slug: 'traveling', title: '트래블링', href: '/rules/violations/traveling' },
    { slug: 'double-dribble', title: '더블드리블', href: '/rules/violations/double-dribble' },
  ]

  it('라벨을 표시한다', () => {
    render(<RelatedContent items={items} label="관련 규칙" />)
    expect(screen.getByText('관련 규칙')).toBeInTheDocument()
  })

  it('관련 항목들을 링크로 렌더링한다', () => {
    render(<RelatedContent items={items} label="관련 규칙" />)
    const link = screen.getByText('트래블링')
    expect(link.closest('a')).toHaveAttribute('href', '/rules/violations/traveling')
  })

  it('빈 배열이면 아무것도 렌더링하지 않는다', () => {
    const { container } = render(<RelatedContent items={[]} label="관련 규칙" />)
    expect(container.innerHTML).toBe('')
  })
})
