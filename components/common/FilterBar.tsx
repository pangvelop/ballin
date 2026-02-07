'use client'

import type { Difficulty } from '@/lib/types'

interface FilterBarProps {
  selected: Difficulty | ''
  onChange: (value: Difficulty | '') => void
}

const DIFFICULTY_OPTIONS: { value: Difficulty | ''; label: string }[] = [
  { value: '', label: '전체' },
  { value: 'beginner', label: '초급' },
  { value: 'intermediate', label: '중급' },
  { value: 'advanced', label: '고급' },
]

const ACTIVE_STYLES: Record<string, string> = {
  '': 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900',
  beginner: 'bg-green-600 text-white dark:bg-green-500',
  intermediate: 'bg-yellow-500 text-white dark:bg-yellow-400 dark:text-gray-900',
  advanced: 'bg-red-600 text-white dark:bg-red-500',
}

export default function FilterBar({ selected, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {DIFFICULTY_OPTIONS.map((opt) => {
        const isActive = selected === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? ACTIVE_STYLES[opt.value] ?? ''
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
