import type { Difficulty } from '@/lib/types'

const BADGE_CONFIG: Record<Difficulty, { label: string; className: string }> = {
  beginner: {
    label: '초급',
    className:
      'bg-difficulty-beginner/10 text-difficulty-beginner border-difficulty-beginner/30',
  },
  intermediate: {
    label: '중급',
    className:
      'bg-difficulty-intermediate/10 text-difficulty-intermediate border-difficulty-intermediate/30',
  },
  advanced: {
    label: '고급',
    className:
      'bg-difficulty-advanced/10 text-difficulty-advanced border-difficulty-advanced/30',
  },
}

interface DifficultyBadgeProps {
  difficulty: Difficulty
}

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const config = BADGE_CONFIG[difficulty]

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  )
}
