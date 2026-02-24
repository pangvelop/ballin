'use client'

import type { QuizQuestion as QuizQuestionType } from '@/lib/types'

interface QuizQuestionProps {
  question: QuizQuestionType
  onAnswer: (answerIndex: number) => void
  answered: boolean
  selectedAnswer?: number
}

function getCorrectIndex(question: QuizQuestionType): number {
  if (question.type === 'true-false') {
    return question.answer ? 0 : 1
  }
  return question.answer
}

export default function QuizQuestion({
  question,
  onAnswer,
  answered,
  selectedAnswer,
}: QuizQuestionProps) {
  const options =
    question.type === 'multiple-choice'
      ? question.options
      : (['O', 'X'] as const)

  const correctIndex = getCorrectIndex(question)

  return (
    <div>
      <p className="mb-4 text-base font-medium text-gray-900 dark:text-gray-100">
        {question.question}
      </p>

      <div className="space-y-2">
        {options.map((option, idx) => {
          const baseClass =
            'w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors'

          const stateClass = answered
            ? idx === correctIndex
              ? 'border-green-400 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200'
              : idx === selectedAnswer
                ? 'border-red-400 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200'
                : 'border-gray-200 text-gray-400 dark:border-gray-700 dark:text-gray-500'
            : 'border-gray-200 text-gray-700 hover:border-brand-300 hover:bg-brand-50 dark:border-gray-700 dark:text-gray-300 dark:hover:border-brand-700 dark:hover:bg-brand-950'

          return (
            <button
              key={idx}
              type="button"
              onClick={() => !answered && onAnswer(idx)}
              disabled={answered}
              className={`${baseClass} ${stateClass}`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
          {question.explanation}
        </div>
      )}
    </div>
  )
}
