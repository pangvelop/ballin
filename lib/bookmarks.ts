const STORAGE_KEY = 'ballin-bookmarks'

export interface Bookmark {
  href: string
  title: string
  type: 'rule' | 'training' | 'routine'
}

export function getBookmarks(): Bookmark[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Bookmark[]
  } catch {
    return []
  }
}

export function addBookmark(bookmark: Bookmark): void {
  const bookmarks = getBookmarks()
  if (bookmarks.some((b) => b.href === bookmark.href)) return
  bookmarks.push(bookmark)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
}

export function removeBookmark(href: string): void {
  const bookmarks = getBookmarks().filter((b) => b.href !== href)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
}

export function isBookmarked(href: string): boolean {
  return getBookmarks().some((b) => b.href === href)
}

export function toggleBookmark(bookmark: Bookmark): boolean {
  if (isBookmarked(bookmark.href)) {
    removeBookmark(bookmark.href)
    return false
  }
  addBookmark(bookmark)
  return true
}
