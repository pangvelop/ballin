'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getBookmarks } from '@/lib/bookmarks'
import type { Bookmark } from '@/lib/bookmarks'

const TYPE_LABELS: Record<Bookmark['type'], string> = {
  rule: '룰',
  training: '연습법',
  routine: '루틴',
}

const TYPE_COLORS: Record<Bookmark['type'], string> = {
  rule: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  training: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  routine: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
}

export default function BookmarkSection() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  useEffect(() => {
    setBookmarks(getBookmarks())
  }, [])

  if (bookmarks.length === 0) return null

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
        내 북마크
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {bookmarks.map((bm) => (
          <Link
            key={bm.href}
            href={bm.href}
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-brand-300 dark:border-gray-800 dark:hover:border-brand-700"
          >
            <span
              className={`shrink-0 rounded px-1.5 py-0.5 text-xs font-medium ${TYPE_COLORS[bm.type]}`}
            >
              {TYPE_LABELS[bm.type]}
            </span>
            <span className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
              {bm.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
