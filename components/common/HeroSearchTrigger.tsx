'use client'

export default function HeroSearchTrigger() {
  const handleClick = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))
  }

  return (
    <button
      onClick={handleClick}
      className="w-full max-w-md rounded-xl border border-gray-300 bg-white px-4 py-3 text-left text-sm text-gray-400 transition-colors hover:border-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500 dark:hover:border-brand-700"
    >
      룰, 연습법, 용어 검색... <kbd className="ml-1 rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">⌘K</kbd>
    </button>
  )
}
