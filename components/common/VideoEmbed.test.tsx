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

  it('.mp4 URL이면 video 태그로 렌더링한다', () => {
    render(<VideoEmbed url="/videos/layup-tutorial.mp4" title="MP4 영상" />)
    const video = screen.getByTitle('MP4 영상')
    expect(video.tagName).toBe('VIDEO')
    expect(video).toHaveAttribute('controls')
    expect(video).toHaveAttribute('preload', 'none')
    const source = video.querySelector('source')
    expect(source).toHaveAttribute('src', '/videos/layup-tutorial.mp4')
    expect(source).toHaveAttribute('type', 'video/mp4')
  })

  it('.webm URL이면 video 태그로 렌더링한다', () => {
    render(<VideoEmbed url="/videos/dribble-demo.webm" title="WebM 영상" />)
    const video = screen.getByTitle('WebM 영상')
    expect(video.tagName).toBe('VIDEO')
    const source = video.querySelector('source')
    expect(source).toHaveAttribute('src', '/videos/dribble-demo.webm')
    expect(source).toHaveAttribute('type', 'video/webm')
  })

  it('YouTube URL이면 기존 iframe으로 렌더링한다', () => {
    render(<VideoEmbed url="https://youtube.com/watch?v=dQw4w9WgXcQ" title="YouTube 영상" />)
    const iframe = screen.getByTitle('YouTube 영상')
    expect(iframe.tagName).toBe('IFRAME')
  })

  it('poster prop이 있으면 video에 poster 속성을 설정한다', () => {
    render(
      <VideoEmbed
        url="/videos/layup-tutorial.mp4"
        title="포스터 테스트"
        poster="/images/layup-poster.jpg"
      />
    )
    const video = screen.getByTitle('포스터 테스트')
    expect(video).toHaveAttribute('poster', '/images/layup-poster.jpg')
  })
})
