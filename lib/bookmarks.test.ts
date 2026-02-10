import { describe, it, expect, beforeEach } from 'vitest'
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
  isBookmarked,
  toggleBookmark,
} from './bookmarks'
import type { Bookmark } from './bookmarks'

const BOOKMARK_A: Bookmark = {
  href: '/rules/violations/traveling',
  title: '트래블링',
  type: 'rule',
}

const BOOKMARK_B: Bookmark = {
  href: '/training/individual-skills/crossover-basic',
  title: '크로스오버 드리블',
  type: 'training',
}

beforeEach(() => {
  localStorage.clear()
})

describe('getBookmarks', () => {
  it('저장된 북마크가 없으면 빈 배열을 반환한다', () => {
    expect(getBookmarks()).toEqual([])
  })

  it('저장된 북마크를 가져온다', () => {
    localStorage.setItem('ballin-bookmarks', JSON.stringify([BOOKMARK_A]))
    expect(getBookmarks()).toEqual([BOOKMARK_A])
  })

  it('잘못된 JSON이면 빈 배열을 반환한다', () => {
    localStorage.setItem('ballin-bookmarks', 'not-json')
    expect(getBookmarks()).toEqual([])
  })

  it('배열이 아닌 데이터면 빈 배열을 반환한다', () => {
    localStorage.setItem('ballin-bookmarks', '"string"')
    expect(getBookmarks()).toEqual([])
  })

  it('유효하지 않은 항목은 필터링한다', () => {
    localStorage.setItem(
      'ballin-bookmarks',
      JSON.stringify([BOOKMARK_A, { invalid: true }, { href: 'no-slash', title: 'bad', type: 'rule' }])
    )
    const result = getBookmarks()
    expect(result).toEqual([BOOKMARK_A])
  })
})

describe('addBookmark', () => {
  it('북마크를 추가한다', () => {
    addBookmark(BOOKMARK_A)
    expect(getBookmarks()).toEqual([BOOKMARK_A])
  })

  it('중복 북마크를 추가하지 않는다', () => {
    addBookmark(BOOKMARK_A)
    addBookmark(BOOKMARK_A)
    expect(getBookmarks()).toHaveLength(1)
  })

  it('여러 북마크를 추가한다', () => {
    addBookmark(BOOKMARK_A)
    addBookmark(BOOKMARK_B)
    expect(getBookmarks()).toHaveLength(2)
  })
})

describe('removeBookmark', () => {
  it('북마크를 제거한다', () => {
    addBookmark(BOOKMARK_A)
    addBookmark(BOOKMARK_B)
    removeBookmark(BOOKMARK_A.href)
    expect(getBookmarks()).toEqual([BOOKMARK_B])
  })

  it('존재하지 않는 href를 제거해도 에러가 발생하지 않는다', () => {
    addBookmark(BOOKMARK_A)
    removeBookmark('/non-existent')
    expect(getBookmarks()).toEqual([BOOKMARK_A])
  })
})

describe('isBookmarked', () => {
  it('저장된 북마크이면 true를 반환한다', () => {
    addBookmark(BOOKMARK_A)
    expect(isBookmarked(BOOKMARK_A.href)).toBe(true)
  })

  it('저장되지 않은 href이면 false를 반환한다', () => {
    expect(isBookmarked('/non-existent')).toBe(false)
  })
})

describe('toggleBookmark', () => {
  it('저장되지 않은 북마크를 토글하면 추가하고 true를 반환한다', () => {
    const result = toggleBookmark(BOOKMARK_A)
    expect(result).toBe(true)
    expect(isBookmarked(BOOKMARK_A.href)).toBe(true)
  })

  it('이미 저장된 북마크를 토글하면 제거하고 false를 반환한다', () => {
    addBookmark(BOOKMARK_A)
    const result = toggleBookmark(BOOKMARK_A)
    expect(result).toBe(false)
    expect(isBookmarked(BOOKMARK_A.href)).toBe(false)
  })
})
