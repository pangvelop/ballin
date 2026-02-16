'use client'

import { useState, useMemo } from 'react'
import type { GlossaryTerm } from '@/lib/types'

interface GlossarySearchProps {
  terms: GlossaryTerm[]
}

export default function GlossarySearch({ terms }: GlossarySearchProps) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const categories = useMemo(() => {
    const cats = new Set<string>()
    terms.forEach((t) => {
      if (t.category) cats.add(t.category)
    })
    return Array.from(cats).sort()
  }, [terms])

  const filtered = useMemo(() => {
    return terms.filter((t) => {
      const matchesQuery =
        !query ||
        t.term.toLowerCase().includes(query.toLowerCase()) ||
        (t.english?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
        t.definition.toLowerCase().includes(query.toLowerCase())

      const matchesCategory = !selectedCategory || t.category === selectedCategory

      return matchesQuery && matchesCategory
    })
  }, [terms, query, selectedCategory])

  return (
    <div>
      {/* 검색 + 필터 */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="용어 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition-colors focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-brand-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          aria-label="카테고리 필터"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        >
          <option value="">전체 카테고리</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 결과 수 */}
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        {filtered.length}개 용어
      </p>

      {/* 용어 목록 */}
      <h2 className="sr-only">용어 목록</h2>
      <div className="space-y-3">
        {filtered.map((t) => (
          <div
            key={t.term}
            className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
          >
            <div className="mb-1 flex items-baseline gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {t.term}
              </h3>
              {t.english && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {t.english}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t.definition}</p>
            {t.category && (
              <span className="mt-2 inline-block rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                {t.category}
              </span>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-gray-600 dark:text-gray-400">
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  )
}
