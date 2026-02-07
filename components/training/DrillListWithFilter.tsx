'use client'

import { useState, useMemo } from 'react'
import DrillCard from '@/components/training/DrillCard'
import FilterBar from '@/components/common/FilterBar'
import type { TrainingData, Difficulty } from '@/lib/types'

interface DrillListWithFilterProps {
  drills: TrainingData[]
}

export default function DrillListWithFilter({ drills }: DrillListWithFilterProps) {
  const [difficulty, setDifficulty] = useState<Difficulty | ''>('')

  const filtered = useMemo(() => {
    if (!difficulty) return drills
    return drills.filter((d) => d.difficulty === difficulty)
  }, [drills, difficulty])

  return (
    <div>
      <div className="mb-6">
        <FilterBar selected={difficulty} onChange={setDifficulty} />
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((drill) => (
            <DrillCard key={drill.slug} drill={drill} />
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
