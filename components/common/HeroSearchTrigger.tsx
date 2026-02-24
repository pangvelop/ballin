'use client'

export default function HeroSearchTrigger() {
  const handleClick = () => {
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', metaKey: true })
    )
  }

  return (
    <button
      onClick={handleClick}
      className="w-full max-w-md rounded-xl border border-gray-200 px-4 py-3 text-left text-gray-400 transition-colors hover:border-brand-300 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-500 dark:hover:border-brand-600 dark:hover:bg-gray-800/50"
    >
      <span className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        룰, 연습법, 용어 검색...
        <kbd className="ml-auto rounded bg-gray-100 px-1.5 py-0.5 text-xs dark:bg-gray-800">
          ⌘K
        </kbd>
      </span>
    </button>
  )
}
