'use client'

import { useState, useEffect } from 'react'
import type { Quiz } from '@/lib/types'
import { getQuizProgress, saveQuizProgress } from '@/lib/quiz-progress'
import QuizQuestion from './QuizQuestion'
import QuizResult from './QuizResult'

interface QuizSectionProps {
  quiz: Quiz
  slug: string
}

export default function QuizSection({ quiz, slug }: QuizSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [answered, setAnswered] = useState(false)
  const [showResult, setShowResult] = useState(false)

  // 이전 진행률 확인
  useEffect(() => {
    const prev = getQuizProgress(slug)
    if (prev) {
      setShowResult(true)
      setAnswers(prev.answers)
    }
  }, [slug])

  const question = quiz.questions[currentIndex]
  const isLast = currentIndex === quiz.questions.length - 1

  const handleAnswer = (answerIndex: number) => {
    setAnswers((prev) => [...prev, answerIndex])
    setAnswered(true)
  }

  const handleNext = () => {
    if (isLast) {
      // 결과 계산 및 저장
      const finalAnswers = answers
      const score = finalAnswers.reduce((acc, ans, idx) => {
        const q = quiz.questions[idx]!
        if (q.type === 'multiple-choice') {
          return acc + (ans === q.answer ? 1 : 0)
        }
        // true-false: 0 = O(true), 1 = X(false)
        const isCorrect = q.answer ? ans === 0 : ans === 1
        return acc + (isCorrect ? 1 : 0)
      }, 0)

      saveQuizProgress({
        slug,
        score,
        total: quiz.questions.length,
        completedAt: new Date().toISOString(),
        answers: finalAnswers,
      })

      setShowResult(true)
    } else {
      setCurrentIndex((prev) => prev + 1)
      setAnswered(false)
    }
  }

  const handleRetry = () => {
    setCurrentIndex(0)
    setAnswers([])
    setAnswered(false)
    setShowResult(false)
  }

  const score = answers.reduce((acc, ans, idx) => {
    const q = quiz.questions[idx]
    if (!q) return acc
    if (q.type === 'multiple-choice') {
      return acc + (ans === q.answer ? 1 : 0)
    }
    const isCorrect = q.answer ? ans === 0 : ans === 1
    return acc + (isCorrect ? 1 : 0)
  }, 0)

  return (
    <section className="mt-8 rounded-xl border border-gray-200 p-6 dark:border-gray-800">
      <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
        퀴즈로 확인하기
      </h2>

      {showResult ? (
        <QuizResult score={score} total={quiz.questions.length} onRetry={handleRetry} />
      ) : question ? (
        <div>
          <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
            {currentIndex + 1} / {quiz.questions.length}
          </p>

          <QuizQuestion
            question={question}
            onAnswer={handleAnswer}
            answered={answered}
            selectedAnswer={answers[currentIndex]}
          />

          {answered && (
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-600"
              >
                {isLast ? '결과 보기' : '다음'}
              </button>
            </div>
          )}
        </div>
      ) : null}
    </section>
  )
}
