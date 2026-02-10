import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'
import { buildSearchIndex } from '@/lib/search'
import { MOCK_RULES } from '@/__tests__/fixtures/rules'
import { MOCK_DRILLS } from '@/__tests__/fixtures/training'
import { MOCK_TERMS } from '@/__tests__/fixtures/glossary'

const searchIndex = buildSearchIndex(MOCK_RULES, MOCK_DRILLS, MOCK_TERMS)

describe('SearchBar', () => {
  it('검색 트리거 버튼을 렌더링한다', () => {
    render(<SearchBar searchIndex={searchIndex} />)
    expect(screen.getByLabelText('검색 (Ctrl+K)')).toBeInTheDocument()
  })

  it('버튼 클릭으로 검색 오버레이를 연다', async () => {
    const user = userEvent.setup()
    render(<SearchBar searchIndex={searchIndex} />)

    await user.click(screen.getByLabelText('검색 (Ctrl+K)'))
    expect(screen.getByPlaceholderText('룰, 연습법, 용어 검색...')).toBeInTheDocument()
  })

  it('검색어를 입력하면 결과를 표시한다', async () => {
    const user = userEvent.setup()
    render(<SearchBar searchIndex={searchIndex} />)

    await user.click(screen.getByLabelText('검색 (Ctrl+K)'))
    await user.type(screen.getByPlaceholderText('룰, 연습법, 용어 검색...'), '트래블링')

    expect(screen.getByText('트래블링 (Traveling)')).toBeInTheDocument()
  })

  it('검색 결과가 없으면 안내 메시지를 표시한다', async () => {
    const user = userEvent.setup()
    render(<SearchBar searchIndex={searchIndex} />)

    await user.click(screen.getByLabelText('검색 (Ctrl+K)'))
    await user.type(screen.getByPlaceholderText('룰, 연습법, 용어 검색...'), '없는검색어xyz')

    expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument()
  })

  it('Escape 키로 오버레이를 닫는다', async () => {
    const user = userEvent.setup()
    render(<SearchBar searchIndex={searchIndex} />)

    await user.click(screen.getByLabelText('검색 (Ctrl+K)'))
    expect(screen.getByPlaceholderText('룰, 연습법, 용어 검색...')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByPlaceholderText('룰, 연습법, 용어 검색...')).not.toBeInTheDocument()
  })
})
