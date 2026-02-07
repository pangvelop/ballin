'use client'

import { useState, useMemo } from 'react'
import RuleCard from '@/components/rules/RuleCard'
import FilterBar from '@/components/common/FilterBar'
import type { RuleData, Difficulty } from '@/lib/types'

interface RuleListWithFilterProps {
  rules: RuleData[]
}

export default function RuleListWithFilter({ rules }: RuleListWithFilterProps) {
  const [difficulty, setDifficulty] = useState<Difficulty | ''>('')

  const filtered = useMemo(() => {
    if (!difficulty) return rules
    return rules.filter((r) => r.difficulty === difficulty)
  }, [rules, difficulty])

  return (
    <div>
      <div className="mb-6">
        <FilterBar selected={difficulty} onChange={setDifficulty} />
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((rule) => (
            <RuleCard key={rule.slug} rule={rule} />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-gray-500 dark:text-gray-500">
          해당 난이도의 콘텐츠가 없습니다.
        </p>
      )}
    </div>
  )
}
