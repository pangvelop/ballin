import Link from 'next/link'
import DifficultyBadge from '@/components/common/DifficultyBadge'
import type { TrainingData } from '@/lib/types'

interface DrillCardProps {
  drill: TrainingData
}

export default function DrillCard({ drill }: DrillCardProps) {
  return (
    <Link
      href={`/training/${drill.category}/${drill.slug}`}
      className="group block rounded-xl border border-gray-200 p-4 transition-all hover:border-brand-300 hover:shadow-md dark:border-gray-800 dark:hover:border-brand-700"
    >
      <div className="mb-2 flex items-center gap-2">
        <DifficultyBadge difficulty={drill.difficulty} />
        <span className="text-xs text-gray-500 dark:text-gray-500">{drill.duration}</span>
      </div>
      <h3 className="mb-1 text-lg font-semibold text-gray-900 group-hover:text-brand-500 dark:text-gray-100">
        {drill.title}
      </h3>
      <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
        {drill.summary}
      </p>
      {drill.equipment.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {drill.equipment.map((item) => (
            <span
              key={item}
              className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
