import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Ballin — 농구 룰 & 연습법 가이드',
    template: '%s | Ballin',
  },
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
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
