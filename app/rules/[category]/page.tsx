import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/layout/Breadcrumb'
import RuleListWithFilter from '@/components/rules/RuleListWithFilter'
import { RULE_CATEGORIES } from '@/lib/categories'
import { getRulesByCategory } from '@/lib/content'
import type { RuleCategory } from '@/lib/types'

interface Props {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return Object.keys(RULE_CATEGORIES).map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const meta = RULE_CATEGORIES[category as RuleCategory]
  if (!meta) return {}

  return {
    title: meta.name,
    description: meta.description,
  }
}

export default async function RuleCategoryPage({ params }: Props) {
  const { category } = await params
  const meta = RULE_CATEGORIES[category as RuleCategory]
  if (!meta) notFound()

  const rules = getRulesByCategory(category as RuleCategory)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Breadcrumb
        items={[
          { label: '룰북', href: '/rules' },
          { label: meta.name },
        ]}
      />

      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
        {meta.name}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">{meta.description}</p>

      {rules.length > 0 ? (
        <RuleListWithFilter rules={rules} />
      ) : (
        <p className="text-gray-500 dark:text-gray-500">
          아직 등록된 콘텐츠가 없습니다. 곧 추가됩니다.
        </p>
      )}
    </div>
  )
}
