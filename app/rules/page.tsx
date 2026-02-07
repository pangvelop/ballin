import type { Metadata } from 'next'
import Link from 'next/link'
import { RULE_CATEGORIES } from '@/lib/categories'

export const metadata: Metadata = {
  title: '룰북',
  description: '농구 규칙을 카테고리별로 체계적으로 정리했습니다. FIBA와 NBA 규칙을 비교해보세요.',
}

export default function RulesPage() {
  const categories = Object.values(RULE_CATEGORIES)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">룰북</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        농구 규칙을 카테고리별로 확인하세요. FIBA와 NBA 규칙을 비교할 수 있습니다.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/rules/${category.slug}`}
            className="group rounded-xl border border-gray-200 p-5 transition-all hover:border-brand-300 hover:shadow-md dark:border-gray-800 dark:hover:border-brand-700"
          >
            <h2 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-brand-500 dark:text-gray-100">
              {category.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
