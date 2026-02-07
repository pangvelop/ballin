'use client'

import { useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import type { LeagueInfo } from '@/lib/types'

interface RuleCompareProps {
  fiba: LeagueInfo
  nba: LeagueInfo
}

type League = 'fiba' | 'nba'

function LeagueContent({ label, data }: { label: string; data: LeagueInfo }) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
      <h3 className="mb-3 text-sm font-bold text-brand-500">{label}</h3>
      <p className="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {data.description}
      </p>

      {data.keyPoints.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
            핵심 포인트
          </h4>
          <ul className="space-y-1.5">
            {data.keyPoints.map((point) => (
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
  )
}

export default function RuleCompare({ fiba, nba }: RuleCompareProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isCompareMode, setIsCompareMode] = useState(false)

  const activeLeague = (searchParams.get('league') as League) || 'fiba'

  const setLeague = (league: League) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('league', league)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="my-6">
      {/* 모드 토글 */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {isCompareMode ? '비교 모드' : '탭 모드'}
        </span>
        <button
          type="button"
          onClick={() => setIsCompareMode(!isCompareMode)}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
          style={{ backgroundColor: isCompareMode ? '#f97316' : '#d1d5db' }}
          role="switch"
          aria-checked={isCompareMode}
          aria-label="비교 모드 전환"
        >
          <span
            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
              isCompareMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {isCompareMode ? (
        /* 비교 모드: 나란히 표시 */
        <div className="grid gap-4 md:grid-cols-2">
          <LeagueContent label="FIBA" data={fiba} />
          <LeagueContent label="NBA" data={nba} />
        </div>
      ) : (
        /* 탭 모드: 하나씩 표시 */
        <>
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

          <div className="mt-4">
            <LeagueContent
              label={activeLeague === 'fiba' ? 'FIBA' : 'NBA'}
              data={activeLeague === 'fiba' ? fiba : nba}
            />
          </div>
        </>
      )}
    </div>
  )
}
