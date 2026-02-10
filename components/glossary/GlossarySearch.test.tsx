import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GlossarySearch from './GlossarySearch'
import { MOCK_TERMS } from '@/__tests__/fixtures/glossary'

describe('GlossarySearch', () => {
  it('모든 용어를 표시한다', () => {
    render(<GlossarySearch terms={MOCK_TERMS} />)
    expect(screen.getByText('트래블링')).toBeInTheDocument()
    expect(screen.getByText('더블드리블')).toBeInTheDocument()
    expect(screen.getByText('픽앤롤')).toBeInTheDocument()
  })

  it('용어 수를 표시한다', () => {
    render(<GlossarySearch terms={MOCK_TERMS} />)
    expect(screen.getByText('3개 용어')).toBeInTheDocument()
  })

  it('검색어로 필터링한다', async () => {
    const user = userEvent.setup()
    render(<GlossarySearch terms={MOCK_TERMS} />)

    await user.type(screen.getByPlaceholderText('용어 검색...'), '트래블링')

    expect(screen.getByText('트래블링')).toBeInTheDocument()
    expect(screen.queryByText('픽앤롤')).not.toBeInTheDocument()
    expect(screen.getByText('1개 용어')).toBeInTheDocument()
  })

  it('카테고리로 필터링한다', async () => {
    const user = userEvent.setup()
    render(<GlossarySearch terms={MOCK_TERMS} />)

    await user.selectOptions(screen.getByRole('combobox'), '전술')

    expect(screen.getByText('픽앤롤')).toBeInTheDocument()
    expect(screen.queryByText('트래블링')).not.toBeInTheDocument()
    expect(screen.getByText('1개 용어')).toBeInTheDocument()
  })

  it('매칭 결과가 없으면 안내 메시지를 표시한다', async () => {
    const user = userEvent.setup()
    render(<GlossarySearch terms={MOCK_TERMS} />)

    await user.type(screen.getByPlaceholderText('용어 검색...'), '없는용어xyz')

    expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument()
  })

  it('영어 이름을 표시한다', () => {
    render(<GlossarySearch terms={MOCK_TERMS} />)
    expect(screen.getByText('Traveling')).toBeInTheDocument()
    expect(screen.getByText('Pick and Roll')).toBeInTheDocument()
  })
})
