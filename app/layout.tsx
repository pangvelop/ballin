import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ballin — 농구 룰 & 연습법 가이드',
  description:
    '농구 룰(FIBA/NBA)과 연습법을 체계적으로 정리한 모바일 퍼스트 웹앱. 코트에서 바로 참고하세요.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
