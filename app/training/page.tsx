import type { Metadata } from 'next'
import Link from 'next/link'
import { TRAINING_CATEGORIES } from '@/lib/categories'

export const metadata: Metadata = {
  title: '연습법',
  description: '개인 스킬부터 팀 전술, 체력 훈련까지. 단계별 연습법을 확인하세요.',
}

export default function TrainingPage() {
  const categories = Object.values(TRAINING_CATEGORIES)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">연습법</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        개인 스킬부터 팀 전술, 체력 훈련까지. 단계별 연습법을 확인하세요.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/training/${category.slug}`}
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
