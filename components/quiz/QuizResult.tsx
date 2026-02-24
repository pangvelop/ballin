'use client'

interface QuizResultProps {
  score: number
  total: number
  onRetry: () => void
}

export default function QuizResult({ score, total, onRetry }: QuizResultProps) {
  const percentage = Math.round((score / total) * 100)

  return (
    <div className="text-center">
      <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">
        퀴즈 결과
      </h3>
      <p className="mb-1 text-3xl font-bold text-brand-500">
        {score} / {total}
      </p>
      <p className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
        {percentage}%
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-brand-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-600"
      >
        다시 풀기
      </button>
    </div>
  )
}
