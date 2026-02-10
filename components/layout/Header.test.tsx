import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './Header'

describe('Header', () => {
  it('로고 "Ballin"을 표시한다', () => {
    render(<Header searchIndex={[]} />)
    expect(screen.getByText('Ballin')).toBeInTheDocument()
  })

  it('로고가 홈으로 링크한다', () => {
    render(<Header searchIndex={[]} />)
    const logo = screen.getByText('Ballin')
    expect(logo.closest('a')).toHaveAttribute('href', '/')
  })

  it('네비게이션 링크들을 표시한다', () => {
    render(<Header searchIndex={[]} />)
    expect(screen.getAllByText('룰북').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('연습법').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('루틴').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('용어사전').length).toBeGreaterThanOrEqual(1)
  })

  it('모바일 메뉴 버튼이 있다', () => {
    render(<Header searchIndex={[]} />)
    expect(screen.getByLabelText('메뉴 열기')).toBeInTheDocument()
  })

  it('모바일 메뉴 토글이 동작한다', async () => {
    const user = userEvent.setup()
    render(<Header searchIndex={[]} />)

    await user.click(screen.getByLabelText('메뉴 열기'))
    expect(screen.getByLabelText('메뉴 닫기')).toBeInTheDocument()
  })
})
