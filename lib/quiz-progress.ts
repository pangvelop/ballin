import type { QuizProgress } from './types'

const STORAGE_PREFIX = 'ballin-quiz-'

export function getQuizProgress(slug: string): QuizProgress | null {
  const raw = localStorage.getItem(`${STORAGE_PREFIX}${slug}`)
  if (!raw) return null
  return JSON.parse(raw) as QuizProgress
}

export function saveQuizProgress(progress: QuizProgress): void {
  localStorage.setItem(
    `${STORAGE_PREFIX}${progress.slug}`,
    JSON.stringify(progress)
  )
}

export function getAllQuizProgress(): QuizProgress[] {
  const results: QuizProgress[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith(STORAGE_PREFIX)) {
      const raw = localStorage.getItem(key)
      if (raw) {
        results.push(JSON.parse(raw) as QuizProgress)
      }
    }
  }
  return results
}
