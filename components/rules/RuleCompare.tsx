'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import type { LeagueInfo } from '@/lib/types'

interface RuleCompareProps {
  fiba: LeagueInfo
  nba: LeagueInfo
}

type League = 'fiba' | 'nba'

export default function RuleCompare({ fiba, nba }: RuleCompareProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const activeLeague = (searchParams.get('league') as League) || 'fiba'

  const setLeague = (league: League) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('league', league)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const activeData = activeLeague === 'fiba' ? fiba : nba

  return (
    <div className="my-6">
      {/* 탭 */}
      <div className="flex rounded-lg border border-gray-200 p-1 dark:border-gray-700">
        <button
          type="button"
          onClick={() => setLeague('fiba')}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeLeague === 'fiba'
              ? 'bg-brand-500 text-white'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          FIBA
        </button>
        <button
          type="button"
          onClick={() => setLeague('nba')}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeLeague === 'nba'
              ? 'bg-brand-500 text-white'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          NBA
        </button>
      </div>

      {/* 콘텐츠 */}
      <div className="mt-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
        <p className="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {activeData.description}
        </p>

        {activeData.keyPoints.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
              핵심 포인트
            </h4>
            <ul className="space-y-1.5">
              {activeData.keyPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
