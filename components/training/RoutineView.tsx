import Link from 'next/link'
import DifficultyBadge from '@/components/common/DifficultyBadge'
import type { TrainingData } from '@/lib/types'

interface RoutineViewProps {
  drills: TrainingData[]
}

export default function RoutineView({ drills }: RoutineViewProps) {
  return (
    <div className="mb-8 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
      <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
        포함된 드릴
      </h2>
      <div className="space-y-2">
        {drills.map((drill, i) => (
          <Link
            key={drill.slug}
            href={`/training/${drill.category}/${drill.slug}`}
            className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-600 dark:bg-brand-900 dark:text-brand-400">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                {drill.title}
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-500">
                {drill.duration} · {drill.equipment.join(', ')}
              </p>
            </div>
            <DifficultyBadge difficulty={drill.difficulty} />
          </Link>
        ))}
      </div>
    </div>
  )
}
