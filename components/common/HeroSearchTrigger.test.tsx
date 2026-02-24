import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HeroSearchTrigger from './HeroSearchTrigger'

describe('HeroSearchTrigger', () => {
  it('검색 트리거 버튼을 렌더링한다', () => {
    render(<HeroSearchTrigger />)
    expect(
      screen.getByRole('button', { name: /룰, 연습법, 용어 검색/ })
    ).toBeInTheDocument()
  })

  it('클릭 시 Cmd+K keydown 이벤트를 dispatch한다', async () => {
    const user = userEvent.setup()
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent')

    render(<HeroSearchTrigger />)

    await user.click(
      screen.getByRole('button', { name: /룰, 연습법, 용어 검색/ })
    )

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'keydown',
        key: 'k',
        metaKey: true,
      })
    )

    dispatchSpy.mockRestore()
  })
})
