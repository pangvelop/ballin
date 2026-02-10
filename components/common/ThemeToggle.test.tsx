import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeToggle from './ThemeToggle'

const setThemeMock = vi.fn()

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: setThemeMock,
  }),
}))

describe('ThemeToggle', () => {
  it('테마 변경 버튼을 렌더링한다', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('클릭하면 setTheme를 호출한다', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    await user.click(screen.getByRole('button'))
    expect(setThemeMock).toHaveBeenCalledWith('dark')
  })

  it('적절한 aria-label이 있다', () => {
    render(<ThemeToggle />)
    expect(screen.getByLabelText(/모드로 전환|테마 변경/)).toBeInTheDocument()
  })
})
