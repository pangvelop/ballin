import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import BookmarkSection from './BookmarkSection'

beforeEach(() => {
  localStorage.clear()
})

describe('BookmarkSection', () => {
  it('북마크가 없으면 아무것도 렌더링하지 않는다', () => {
    const { container } = render(<BookmarkSection />)
    expect(container.innerHTML).toBe('')
  })

  it('북마크가 있으면 "내 북마크" 제목을 표시한다', () => {
    localStorage.setItem(
      'ballin-bookmarks',
      JSON.stringify([{ href: '/rules/violations/traveling', title: '트래블링', type: 'rule' }])
    )
    render(<BookmarkSection />)
    expect(screen.getByText('내 북마크')).toBeInTheDocument()
  })

  it('북마크 목록을 링크로 렌더링한다', () => {
    localStorage.setItem(
      'ballin-bookmarks',
      JSON.stringify([{ href: '/rules/violations/traveling', title: '트래블링', type: 'rule' }])
    )
    render(<BookmarkSection />)
    const link = screen.getByText('트래블링')
    expect(link.closest('a')).toHaveAttribute('href', '/rules/violations/traveling')
  })

  it('타입 라벨을 표시한다', () => {
    localStorage.setItem(
      'ballin-bookmarks',
      JSON.stringify([
        { href: '/rules/violations/traveling', title: '트래블링', type: 'rule' },
        { href: '/training/individual-skills/crossover', title: '크로스오버', type: 'training' },
      ])
    )
    render(<BookmarkSection />)
    expect(screen.getByText('룰')).toBeInTheDocument()
    expect(screen.getByText('연습법')).toBeInTheDocument()
  })
})
