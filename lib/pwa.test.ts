import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('PWA manifest.json', () => {
  const manifestPath = join(process.cwd(), 'public', 'manifest.json')

  function readManifest() {
    const raw = readFileSync(manifestPath, 'utf-8')
    return JSON.parse(raw) as Record<string, unknown>
  }

  it('필수 필드가 모두 존재한다', () => {
    const manifest = readManifest()

    expect(manifest.name).toBeDefined()
    expect(manifest.short_name).toBeDefined()
    expect(manifest.start_url).toBeDefined()
    expect(manifest.display).toBeDefined()
    expect(manifest.icons).toBeDefined()
  })

  it('standalone 디스플레이 모드를 사용한다', () => {
    const manifest = readManifest()
    expect(manifest.display).toBe('standalone')
  })

  it('아이콘에 192x192와 512x512가 포함된다', () => {
    const manifest = readManifest()
    const icons = manifest.icons as Array<{ sizes: string }>

    const sizes = icons.map((icon) => icon.sizes)
    expect(sizes).toContain('192x192')
    expect(sizes).toContain('512x512')
  })

  it('마스커블 아이콘이 포함된다', () => {
    const manifest = readManifest()
    const icons = manifest.icons as Array<{ purpose?: string }>

    const hasMaskable = icons.some((icon) => icon.purpose === 'maskable')
    expect(hasMaskable).toBe(true)
  })

  it('theme_color가 브랜드 오렌지(#f97316)이다', () => {
    const manifest = readManifest()
    expect(manifest.theme_color).toBe('#f97316')
  })

  it('start_url이 루트(/)이다', () => {
    const manifest = readManifest()
    expect(manifest.start_url).toBe('/')
  })
})
