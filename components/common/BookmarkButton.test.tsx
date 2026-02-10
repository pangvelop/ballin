import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookmarkButton from './BookmarkButton'
import type { Bookmark } from '@/lib/bookmarks'

const bookmark: Bookmark = {
  href: '/rules/violations/traveling',
  title: '트래블링',
  type: 'rule',
}

beforeEach(() => {
  localStorage.clear()
})

describe('BookmarkButton', () => {
  it('초기 상태에서 "북마크" 텍스트를 표시한다', () => {
    render(<BookmarkButton bookmark={bookmark} />)
    expect(screen.getByText('북마크')).toBeInTheDocument()
  })

  it('클릭하면 "저장됨"으로 변경된다', async () => {
    const user = userEvent.setup()
    render(<BookmarkButton bookmark={bookmark} />)

    await user.click(screen.getByRole('button'))
    expect(screen.getByText('저장됨')).toBeInTheDocument()
  })

  it('다시 클릭하면 "북마크"로 돌아온다', async () => {
    const user = userEvent.setup()
    render(<BookmarkButton bookmark={bookmark} />)

    await user.click(screen.getByRole('button'))
    expect(screen.getByText('저장됨')).toBeInTheDocument()

    await user.click(screen.getByRole('button'))
    expect(screen.getByText('북마크')).toBeInTheDocument()
  })

  it('aria-label이 적절하게 변경된다', async () => {
    const user = userEvent.setup()
    render(<BookmarkButton bookmark={bookmark} />)

    expect(screen.getByLabelText('북마크 추가')).toBeInTheDocument()
    await user.click(screen.getByRole('button'))
    expect(screen.getByLabelText('북마크 해제')).toBeInTheDocument()
  })
})
