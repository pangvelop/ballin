import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RuleListWithFilter from './RuleListWithFilter'
import { MOCK_RULES } from '@/__tests__/fixtures/rules'

describe('RuleListWithFilter', () => {
  it('모든 룰을 표시한다', () => {
    render(<RuleListWithFilter rules={MOCK_RULES} />)
    expect(screen.getByText('트래블링 (Traveling)')).toBeInTheDocument()
    expect(screen.getByText('더블드리블 (Double Dribble)')).toBeInTheDocument()
    expect(screen.getByText('퍼스널 파울 (Personal Foul)')).toBeInTheDocument()
  })

  it('초급 필터를 적용하면 초급만 표시한다', async () => {
    const user = userEvent.setup()
    render(<RuleListWithFilter rules={MOCK_RULES} />)

    await user.click(screen.getByRole('button', { name: '초급' }))

    expect(screen.getByText('트래블링 (Traveling)')).toBeInTheDocument()
    expect(screen.getByText('더블드리블 (Double Dribble)')).toBeInTheDocument()
    expect(screen.queryByText('퍼스널 파울 (Personal Foul)')).not.toBeInTheDocument()
  })

  it('중급 필터를 적용하면 중급만 표시한다', async () => {
    const user = userEvent.setup()
    render(<RuleListWithFilter rules={MOCK_RULES} />)

    await user.click(screen.getByRole('button', { name: '중급' }))

    expect(screen.queryByText('트래블링 (Traveling)')).not.toBeInTheDocument()
    expect(screen.getByText('퍼스널 파울 (Personal Foul)')).toBeInTheDocument()
  })

  it('매칭 결과가 없으면 안내 메시지를 표시한다', async () => {
    const user = userEvent.setup()
    render(<RuleListWithFilter rules={MOCK_RULES} />)

    await user.click(screen.getByRole('button', { name: '고급' }))
    expect(screen.getByText('해당 난이도의 콘텐츠가 없습니다.')).toBeInTheDocument()
  })
})
