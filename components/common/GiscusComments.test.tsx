import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// next-themes 모킹
const mockUseTheme = vi.fn()
vi.mock('next-themes', () => ({
  useTheme: () => mockUseTheme(),
}))

// @giscus/react 모킹
vi.mock('@giscus/react', () => ({
  default: (props: Record<string, string>) => (
    <div data-testid="giscus" data-theme={props.theme} data-lang={props.lang} />
  ),
}))

import GiscusComments from './GiscusComments'

describe('GiscusComments', () => {
  it('라이트 모드에서 light 테마를 전달한다', () => {
    mockUseTheme.mockReturnValue({ resolvedTheme: 'light' })
    render(<GiscusComments />)

    const giscus = screen.getByTestId('giscus')
    expect(giscus).toHaveAttribute('data-theme', 'light')
  })

  it('다크 모드에서 dark 테마를 전달한다', () => {
    mockUseTheme.mockReturnValue({ resolvedTheme: 'dark' })
    render(<GiscusComments />)

    const giscus = screen.getByTestId('giscus')
    expect(giscus).toHaveAttribute('data-theme', 'dark')
  })

  it('한국어 lang을 전달한다', () => {
    mockUseTheme.mockReturnValue({ resolvedTheme: 'light' })
    render(<GiscusComments />)

    const giscus = screen.getByTestId('giscus')
    expect(giscus).toHaveAttribute('data-lang', 'ko')
  })
})
