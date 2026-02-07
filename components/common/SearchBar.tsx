'use client'

import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import type { SearchResult, SearchResultType } from '@/lib/search'
import { searchItems } from '@/lib/search'

interface SearchBarProps {
  searchIndex: SearchResult[]
}

const TYPE_LABELS: Record<SearchResultType, string> = {
  rule: '룰',
  training: '연습법',
  glossary: '용어',
}

const TYPE_COLORS: Record<SearchResultType, string> = {
  rule: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  training: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  glossary: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
}

export default function SearchBar({ searchIndex }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => searchItems(searchIndex, query), [searchIndex, query])

  const openSearch = useCallback(() => {
    setIsOpen(true)
    setQuery('')
  }, [])

  const closeSearch = useCallback(() => {
    setIsOpen(false)
    setQuery('')
  }, [])

  // 열릴 때 input에 포커스
  useEffect(() => {
    if (isOpen) {
      // 약간 딜레이를 줘야 DOM이 렌더된 후 포커스됨
      const timer = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Escape 키로 닫기
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        closeSearch()
      }
      // Cmd/Ctrl + K로 열기
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) {
          closeSearch()
        } else {
          openSearch()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, openSearch, closeSearch])

  // 바깥 클릭으로 닫기
  useEffect(() => {
    if (!isOpen) return

    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closeSearch()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen, closeSearch])

  return (
    <>
      {/* 검색 트리거 버튼 */}
      <button
        type="button"
        onClick={openSearch}
        className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        aria-label="검색 (Ctrl+K)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>

      {/* 검색 오버레이 */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 pt-[10vh]">
          <div
            ref={panelRef}
            className="mx-4 w-full max-w-lg rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
          >
            {/* 검색 입력 */}
            <div className="flex items-center border-b border-gray-200 px-4 dark:border-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 shrink-0 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="룰, 연습법, 용어 검색..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent px-3 py-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100"
              />
              <kbd className="hidden rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500 sm:inline-block dark:bg-gray-800 dark:text-gray-400">
                ESC
              </kbd>
            </div>

            {/* 검색 결과 */}
            <div className="max-h-80 overflow-y-auto p-2">
              {query.trim() && results.length === 0 && (
                <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  검색 결과가 없습니다.
                </p>
              )}

              {!query.trim() && (
                <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  검색어를 입력하세요.
                </p>
              )}

              {results.map((result, i) => (
                <Link
                  key={`${result.type}-${result.href}-${i}`}
                  href={result.href}
                  onClick={closeSearch}
                  className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <span
                    className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-xs font-medium ${TYPE_COLORS[result.type]}`}
                  >
                    {TYPE_LABELS[result.type]}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                      {result.title}
                    </p>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                      {result.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
