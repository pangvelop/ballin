import type { Metadata } from 'next'
import Breadcrumb from '@/components/layout/Breadcrumb'
import GlossarySearch from '@/components/glossary/GlossarySearch'
import { getAllGlossaryTerms } from '@/lib/content'

export const metadata: Metadata = {
  title: '용어사전',
  description: '농구 용어를 한눈에 확인하세요. 한국어, 영어 검색 모두 지원합니다.',
}

export default function GlossaryPage() {
  const terms = getAllGlossaryTerms()

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumb items={[{ label: '용어사전' }]} />

      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
        용어사전
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        농구 용어를 검색하고 카테고리별로 필터링하세요.
      </p>

      <GlossarySearch terms={terms} />
    </div>
  )
}
