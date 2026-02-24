import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RuleCompare from './RuleCompare'
import type { LeagueInfo } from '@/lib/types'

const replaceMock = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: replaceMock,
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/rules/violations/traveling',
}))

const fiba: LeagueInfo = {
  description: 'FIBA 기준 트래블링 규정',
  keyPoints: ['피벗풋 이동 시 바이올레이션', '게더 스텝 제한적'],
}

const nba: LeagueInfo = {
  description: 'NBA 기준 트래블링 규정',
  keyPoints: ['게더 스텝 후 2보까지 허용', '유로 스텝 합법'],
}

describe('RuleCompare', () => {
  it('기본 탭 모드에서 FIBA/NBA 탭 버튼을 표시한다', () => {
    render(<RuleCompare fiba={fiba} nba={nba} />)
    expect(screen.getByRole('button', { name: 'FIBA' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'NBA' })).toBeInTheDocument()
  })

  it('기본적으로 FIBA 내용을 표시한다', () => {
    render(<RuleCompare fiba={fiba} nba={nba} />)
    expect(screen.getByText('FIBA 기준 트래블링 규정')).toBeInTheDocument()
  })

  it('NBA 탭을 클릭하면 NBA 내용을 표시한다', async () => {
    const user = userEvent.setup()
    render(<RuleCompare fiba={fiba} nba={nba} />)

    // NBA 버튼 클릭 (탭 버튼)
    const nbaButtons = screen.getAllByText('NBA')
    await user.click(nbaButtons[0]!)

    expect(replaceMock).toHaveBeenCalled()
  })

  it('비교 모드 토글을 클릭하면 양쪽 모두 표시한다', async () => {
    const user = userEvent.setup()
    render(<RuleCompare fiba={fiba} nba={nba} />)

    await user.click(screen.getByRole('switch'))
    expect(screen.getByText('FIBA 기준 트래블링 규정')).toBeInTheDocument()
    expect(screen.getByText('NBA 기준 트래블링 규정')).toBeInTheDocument()
  })

  it('핵심 포인트를 표시한다', () => {
    render(<RuleCompare fiba={fiba} nba={nba} />)
    expect(screen.getByText('피벗풋 이동 시 바이올레이션')).toBeInTheDocument()
  })

  describe('차이점 하이라이트 (B1)', () => {
    const fibaWithCommon: LeagueInfo = {
      description: 'FIBA 규정',
      keyPoints: ['공통 포인트', 'FIBA 고유 포인트'],
    }

    const nbaWithCommon: LeagueInfo = {
      description: 'NBA 규정',
      keyPoints: ['공통 포인트', 'NBA 고유 포인트'],
    }

    it('비교 모드에서 공통 포인트는 하이라이트 없이 표시한다', async () => {
      const user = userEvent.setup()
      render(<RuleCompare fiba={fibaWithCommon} nba={nbaWithCommon} />)

      await user.click(screen.getByRole('switch'))
      const commonPoints = screen.getAllByText('공통 포인트')
      // 공통 포인트는 파란/빨간 하이라이트 클래스가 없어야 함
      for (const el of commonPoints) {
        expect(el.closest('li')).not.toHaveClass('bg-blue-50')
        expect(el.closest('li')).not.toHaveClass('bg-red-50')
      }
    })

    it('비교 모드에서 FIBA 고유 포인트에 파란색 하이라이트를 표시한다', async () => {
      const user = userEvent.setup()
      render(<RuleCompare fiba={fibaWithCommon} nba={nbaWithCommon} />)

      await user.click(screen.getByRole('switch'))
      const fibaOnly = screen.getByText('FIBA 고유 포인트')
      expect(fibaOnly.closest('li')).toHaveClass('bg-blue-50')
      expect(fibaOnly.closest('li')).toHaveClass('border-l-2')
      expect(fibaOnly.closest('li')).toHaveClass('border-blue-400')
    })

    it('비교 모드에서 NBA 고유 포인트에 빨간색 하이라이트를 표시한다', async () => {
      const user = userEvent.setup()
      render(<RuleCompare fiba={fibaWithCommon} nba={nbaWithCommon} />)

      await user.click(screen.getByRole('switch'))
      const nbaOnly = screen.getByText('NBA 고유 포인트')
      expect(nbaOnly.closest('li')).toHaveClass('bg-red-50')
      expect(nbaOnly.closest('li')).toHaveClass('border-l-2')
      expect(nbaOnly.closest('li')).toHaveClass('border-red-400')
    })

    it('탭 모드에서는 하이라이트가 없다', () => {
      render(<RuleCompare fiba={fibaWithCommon} nba={nbaWithCommon} />)
      // 탭 모드 (기본) — FIBA만 보이고 하이라이트 없음
      const fibaOnly = screen.getByText('FIBA 고유 포인트')
      expect(fibaOnly.closest('li')).not.toHaveClass('bg-blue-50')
    })
  })
})
