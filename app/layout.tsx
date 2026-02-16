import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ThemeProvider from '@/components/common/ThemeProvider'
import { getAllRules, getAllTraining, getAllGlossaryTerms } from '@/lib/content'
import { buildSearchIndex } from '@/lib/search'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://ballin-three.vercel.app'),
  title: {
    default: 'Ballin — 농구 룰 & 연습법 가이드',
    template: '%s | Ballin',
  },
  description:
    '농구 룰(FIBA/NBA)과 연습법을 체계적으로 정리한 모바일 퍼스트 웹앱. 코트에서 바로 참고하세요.',
  openGraph: {
    siteName: 'Ballin',
    locale: 'ko_KR',
    type: 'website',
  },
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
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-white"
          >
            본문으로 건너뛰기
          </a>
          <Header searchIndex={searchIndex} />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
