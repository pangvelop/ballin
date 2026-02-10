import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import React from 'react'

// 매 테스트 후 DOM 정리
afterEach(() => {
  cleanup()
})

// next/link 모킹
vi.mock('next/link', () => ({
  default: (props: Record<string, unknown>) =>
    React.createElement('a', { href: props.href as string }, props.children as React.ReactNode),
}))

// next/navigation 모킹
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// next-themes 모킹
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
  }),
}))
