import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/layout/Breadcrumb'
import DrillListWithFilter from '@/components/training/DrillListWithFilter'
import { TRAINING_CATEGORIES } from '@/lib/categories'
import { getTrainingByCategory } from '@/lib/content'
import type { TrainingCategory } from '@/lib/types'

interface Props {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return Object.keys(TRAINING_CATEGORIES).map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const meta = TRAINING_CATEGORIES[category as TrainingCategory]
  if (!meta) return {}

  return {
    title: meta.name,
    description: meta.description,
  }
}

export default async function TrainingCategoryPage({ params }: Props) {
  const { category } = await params
  const meta = TRAINING_CATEGORIES[category as TrainingCategory]
  if (!meta) notFound()

  const drills = getTrainingByCategory(category as TrainingCategory)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Breadcrumb
        items={[
          { label: '연습법', href: '/training' },
          { label: meta.name },
        ]}
      />

      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
        {meta.name}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">{meta.description}</p>

      {drills.length > 0 ? (
        <DrillListWithFilter drills={drills} />
      ) : (
        <p className="text-gray-500 dark:text-gray-500">
          아직 등록된 콘텐츠가 없습니다. 곧 추가됩니다.
        </p>
      )}
    </div>
  )
}
