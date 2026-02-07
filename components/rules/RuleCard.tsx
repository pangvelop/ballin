import Link from 'next/link'
import DifficultyBadge from '@/components/common/DifficultyBadge'
import type { RuleData } from '@/lib/types'

interface RuleCardProps {
  rule: RuleData
}

export default function RuleCard({ rule }: RuleCardProps) {
  return (
    <Link
      href={`/rules/${rule.category}/${rule.slug}`}
      className="group block rounded-xl border border-gray-200 p-4 transition-all hover:border-brand-300 hover:shadow-md dark:border-gray-800 dark:hover:border-brand-700"
    >
      <div className="mb-2 flex items-center gap-2">
        <DifficultyBadge difficulty={rule.difficulty} />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-gray-900 group-hover:text-brand-500 dark:text-gray-100">
        {rule.title}
      </h3>
      <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
        {rule.summary}
      </p>
      {rule.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {rule.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
