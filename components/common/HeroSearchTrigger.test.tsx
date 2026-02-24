import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HeroSearchTrigger from './HeroSearchTrigger'

describe('HeroSearchTrigger', () => {
  it('검색 플레이스홀더 텍스트를 표시한다', () => {
    render(<HeroSearchTrigger />)
    expect(screen.getByRole('button')).toHaveTextContent('룰, 연습법, 용어 검색...')
  })

  it('⌘K 단축키 힌트를 표시한다', () => {
    render(<HeroSearchTrigger />)
    expect(screen.getByText('⌘K')).toBeInTheDocument()
  })

  it('클릭 시 Cmd+K 키보드 이벤트를 디스패치한다', async () => {
    const user = userEvent.setup()
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent')
    render(<HeroSearchTrigger />)

    await user.click(screen.getByRole('button'))

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ key: 'k', metaKey: true })
    )
    dispatchSpy.mockRestore()
  })
})
