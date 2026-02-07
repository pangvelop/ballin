import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ThemeProvider from '@/components/common/ThemeProvider'
import { getAllRules, getAllTraining, getAllGlossaryTerms } from '@/lib/content'
import { buildSearchIndex } from '@/lib/search'
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
  const rules = getAllRules()
  const trainings = getAllTraining()
  const glossaryTerms = getAllGlossaryTerms()
  const searchIndex = buildSearchIndex(rules, trainings, glossaryTerms)

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider>
          <Header searchIndex={searchIndex} />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
