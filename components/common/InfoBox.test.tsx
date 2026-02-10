import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import InfoBox from './InfoBox'

describe('InfoBox', () => {
  it('tip variant에 기본 제목 "자주 헷갈리는 포인트"를 표시한다', () => {
    render(<InfoBox>내용</InfoBox>)
    expect(screen.getByText('자주 헷갈리는 포인트')).toBeInTheDocument()
  })

  it('warning variant에 기본 제목 "주의"를 표시한다', () => {
    render(<InfoBox variant="warning">내용</InfoBox>)
    expect(screen.getByText('주의')).toBeInTheDocument()
  })

  it('mistake variant에 기본 제목 "흔한 실수"를 표시한다', () => {
    render(<InfoBox variant="mistake">내용</InfoBox>)
    expect(screen.getByText('흔한 실수')).toBeInTheDocument()
  })

  it('커스텀 제목을 표시한다', () => {
    render(<InfoBox title="커스텀 제목">내용</InfoBox>)
    expect(screen.getByText('커스텀 제목')).toBeInTheDocument()
  })

  it('children을 렌더링한다', () => {
    render(<InfoBox>테스트 내용입니다</InfoBox>)
    expect(screen.getByText('테스트 내용입니다')).toBeInTheDocument()
  })
})
