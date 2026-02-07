import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import DifficultyBadge from '@/components/common/DifficultyBadge'
import { getAllRoutines } from '@/lib/content'

export const metadata: Metadata = {
  title: '추천 루틴',
  description: '목적과 시간에 맞는 농구 연습 루틴을 찾아보세요.',
}

export default function RoutinesPage() {
  const routines = getAllRoutines()

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Breadcrumb items={[{ label: '루틴' }]} />

      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">추천 루틴</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        목적과 시간에 맞는 연습 루틴을 선택하세요.
      </p>

      {routines.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {routines.map((routine) => (
            <Link
              key={routine.slug}
              href={`/routines/${routine.slug}`}
              className="group rounded-xl border border-gray-200 p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/50 dark:border-gray-800 dark:hover:border-brand-700 dark:hover:bg-brand-950/20"
            >
              <div className="mb-2 flex items-center gap-2">
                <DifficultyBadge difficulty={routine.difficulty} />
                <span className="text-xs text-gray-500 dark:text-gray-500">{routine.duration}</span>
              </div>
              <h2 className="mb-1 text-lg font-semibold text-gray-900 group-hover:text-brand-600 dark:text-gray-100 dark:group-hover:text-brand-400">
                {routine.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{routine.summary}</p>
              {routine.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {routine.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-500">
          아직 등록된 루틴이 없습니다. 곧 추가됩니다.
        </p>
      )}
    </div>
  )
}
