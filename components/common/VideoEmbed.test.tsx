import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import VideoEmbed from './VideoEmbed'

describe('VideoEmbed', () => {
  it('youtube.com/watch?v= URL에서 영상을 임베드한다', () => {
    render(<VideoEmbed url="https://youtube.com/watch?v=dQw4w9WgXcQ" title="테스트 영상" />)
    const iframe = screen.getByTitle('테스트 영상')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ')
  })

  it('youtu.be/ 단축 URL을 지원한다', () => {
    render(<VideoEmbed url="https://youtu.be/dQw4w9WgXcQ" title="단축 URL" />)
    const iframe = screen.getByTitle('단축 URL')
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ')
  })

  it('youtube.com/embed/ URL을 지원한다', () => {
    render(<VideoEmbed url="https://youtube.com/embed/dQw4w9WgXcQ" title="임베드 URL" />)
    const iframe = screen.getByTitle('임베드 URL')
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ')
  })

  it('유효하지 않은 URL이면 아무것도 렌더링하지 않는다', () => {
    const { container } = render(<VideoEmbed url="https://invalid.com" title="잘못된 URL" />)
    expect(container.innerHTML).toBe('')
  })

  it('iframe에 loading="lazy" 속성이 있다', () => {
    render(<VideoEmbed url="https://youtube.com/watch?v=dQw4w9WgXcQ" title="lazy 테스트" />)
    const iframe = screen.getByTitle('lazy 테스트')
    expect(iframe).toHaveAttribute('loading', 'lazy')
  })
})
