import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import OfflinePage from './page'

describe('OfflinePage', () => {
  it('오프라인 상태 안내 메시지를 표시한다', () => {
    render(<OfflinePage />)

    expect(
      screen.getByRole('heading', { name: /오프라인/i }),
    ).toBeInTheDocument()
  })

  it('인터넷 연결 확인 안내 텍스트를 포함한다', () => {
    render(<OfflinePage />)

    expect(screen.getByText(/인터넷 연결/i)).toBeInTheDocument()
  })

  it('홈으로 이동하는 링크를 포함한다', () => {
    render(<OfflinePage />)

    const link = screen.getByRole('link', { name: /홈/i })
    expect(link).toHaveAttribute('href', '/')
  })
})
