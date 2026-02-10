import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DrillListWithFilter from './DrillListWithFilter'
import { MOCK_DRILLS } from '@/__tests__/fixtures/training'

describe('DrillListWithFilter', () => {
  it('모든 연습법을 표시한다', () => {
    render(<DrillListWithFilter drills={MOCK_DRILLS} />)
    expect(screen.getByText('크로스오버 드리블 기초')).toBeInTheDocument()
    expect(screen.getByText('픽앤롤 2인 훈련')).toBeInTheDocument()
  })

  it('초급 필터를 적용하면 초급만 표시한다', async () => {
    const user = userEvent.setup()
    render(<DrillListWithFilter drills={MOCK_DRILLS} />)

    await user.click(screen.getByRole('button', { name: '초급' }))

    expect(screen.getByText('크로스오버 드리블 기초')).toBeInTheDocument()
    expect(screen.queryByText('픽앤롤 2인 훈련')).not.toBeInTheDocument()
  })

  it('중급 필터를 적용하면 중급만 표시한다', async () => {
    const user = userEvent.setup()
    render(<DrillListWithFilter drills={MOCK_DRILLS} />)

    await user.click(screen.getByRole('button', { name: '중급' }))

    expect(screen.queryByText('크로스오버 드리블 기초')).not.toBeInTheDocument()
    expect(screen.getByText('픽앤롤 2인 훈련')).toBeInTheDocument()
  })

  it('매칭 결과가 없으면 안내 메시지를 표시한다', async () => {
    const user = userEvent.setup()
    render(<DrillListWithFilter drills={MOCK_DRILLS} />)

    await user.click(screen.getByRole('button', { name: '고급' }))
    expect(screen.getByText('해당 난이도의 콘텐츠가 없습니다.')).toBeInTheDocument()
  })
})
