'use client'

import { useState, useEffect } from 'react'
import { isBookmarked, toggleBookmark } from '@/lib/bookmarks'
import type { Bookmark } from '@/lib/bookmarks'

interface BookmarkButtonProps {
  bookmark: Bookmark
}

export default function BookmarkButton({ bookmark }: BookmarkButtonProps) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSaved(isBookmarked(bookmark.href))
  }, [bookmark.href])

  const handleClick = () => {
    const newState = toggleBookmark(bookmark)
    setSaved(newState)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-sm transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
      aria-label={saved ? '북마크 해제' : '북마크 추가'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={1.5}
        className={`h-4 w-4 ${saved ? 'text-brand-500' : 'text-gray-400'}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
        />
      </svg>
      <span className={saved ? 'text-brand-500' : 'text-gray-500 dark:text-gray-400'}>
        {saved ? '저장됨' : '북마크'}
      </span>
    </button>
  )
}
