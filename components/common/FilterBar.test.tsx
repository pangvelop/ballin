import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterBar from './FilterBar'

describe('FilterBar', () => {
  it('4개 필터 버튼을 렌더링한다', () => {
    render(<FilterBar selected="" onChange={vi.fn()} />)
    expect(screen.getByText('전체')).toBeInTheDocument()
    expect(screen.getByText('초급')).toBeInTheDocument()
    expect(screen.getByText('중급')).toBeInTheDocument()
    expect(screen.getByText('고급')).toBeInTheDocument()
  })

  it('버튼 클릭 시 onChange를 호출한다', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FilterBar selected="" onChange={onChange} />)

    await user.click(screen.getByText('초급'))
    expect(onChange).toHaveBeenCalledWith('beginner')
  })

  it('"전체" 클릭 시 빈 문자열로 호출한다', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FilterBar selected="beginner" onChange={onChange} />)

    await user.click(screen.getByText('전체'))
    expect(onChange).toHaveBeenCalledWith('')
  })
})
