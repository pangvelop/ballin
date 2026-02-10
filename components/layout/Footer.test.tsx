import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('섹션 제목들을 표시한다', () => {
    render(<Footer />)
    expect(screen.getByText('룰북')).toBeInTheDocument()
    expect(screen.getByText('연습법')).toBeInTheDocument()
    expect(screen.getByText('더보기')).toBeInTheDocument()
  })

  it('룰북 섹션 링크를 포함한다', () => {
    render(<Footer />)
    const link = screen.getByText('기본 규칙')
    expect(link.closest('a')).toHaveAttribute('href', '/rules/game-basics')
  })

  it('연습법 섹션 링크를 포함한다', () => {
    render(<Footer />)
    const link = screen.getByText('개인 스킬')
    expect(link.closest('a')).toHaveAttribute('href', '/training/individual-skills')
  })

  it('더보기 섹션 링크를 포함한다', () => {
    render(<Footer />)
    const routineLink = screen.getByText('추천 루틴')
    expect(routineLink.closest('a')).toHaveAttribute('href', '/routines')
    const glossaryLink = screen.getByText('용어사전')
    expect(glossaryLink.closest('a')).toHaveAttribute('href', '/glossary')
  })

  it('저작권 텍스트를 표시한다', () => {
    render(<Footer />)
    expect(screen.getByText(/2026 Ballin/)).toBeInTheDocument()
  })
})
