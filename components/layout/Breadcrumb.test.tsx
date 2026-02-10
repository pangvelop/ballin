import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Breadcrumb from './Breadcrumb'

describe('Breadcrumb', () => {
  it('"홈" 링크가 항상 표시된다', () => {
    render(<Breadcrumb items={[]} />)
    const homeLink = screen.getByText('홈')
    expect(homeLink.closest('a')).toHaveAttribute('href', '/')
  })

  it('중간 항목들을 링크로 렌더링한다', () => {
    render(
      <Breadcrumb
        items={[
          { label: '룰북', href: '/rules' },
          { label: '바이올레이션', href: '/rules/violations' },
          { label: '트래블링' },
        ]}
      />
    )
    const rulesLink = screen.getByText('룰북')
    expect(rulesLink.closest('a')).toHaveAttribute('href', '/rules')
  })

  it('마지막 항목은 링크가 아닌 텍스트로 표시한다', () => {
    render(
      <Breadcrumb
        items={[
          { label: '룰북', href: '/rules' },
          { label: '트래블링' },
        ]}
      />
    )
    const lastItem = screen.getByText('트래블링')
    expect(lastItem.closest('a')).toBeNull()
  })

  it('구분자 ">"를 표시한다', () => {
    render(<Breadcrumb items={[{ label: '룰북', href: '/rules' }]} />)
    expect(screen.getByText('>')).toBeInTheDocument()
  })
})
