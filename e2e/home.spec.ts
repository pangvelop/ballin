import { test, expect } from '@playwright/test'

test.describe('홈페이지', () => {
  test('홈페이지가 렌더링된다', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Ballin/)
  })

  test('히어로 섹션이 표시된다', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('주요 섹션 바로가기 링크가 있다', async ({ page }) => {
    await page.goto('/')
    // Quick Links 카드 (본문 영역, 모바일에서도 visible)
    await expect(page.locator('main a[href="/rules"]').first()).toBeVisible()
    await expect(page.locator('main a[href="/training"]').first()).toBeVisible()
  })

  test('헤더의 Ballin 로고가 표시된다', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header').getByText('Ballin')).toBeVisible()
  })

  test('푸터가 표시된다', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('footer')).toBeVisible()
  })

  test('추천 연습법 섹션이 표시된다', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('추천 연습법')).toBeVisible()
    // 4개 드릴 카드 존재
    const drillCards = page.locator('a[href^="/training/"]').filter({
      has: page.locator('.line-clamp-2'),
    })
    await expect(drillCards.first()).toBeVisible()
    // 전체 보기 링크
    await expect(page.locator('a[href="/training"]').last()).toBeVisible()
  })

  test('추천 연습법 카드 클릭 시 상세 페이지로 이동한다', async ({ page }) => {
    await page.goto('/')
    const firstDrill = page.locator('a[href^="/training/"]').filter({
      has: page.locator('.line-clamp-2'),
    }).first()
    await firstDrill.click()
    await expect(page).toHaveURL(/\/training\//)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('히어로 검색 버튼 클릭 시 검색 모달이 열린다', async ({ page }) => {
    await page.goto('/')
    await page.getByText('룰, 연습법, 용어 검색...').click()
    await expect(page.getByPlaceholder('룰, 연습법, 용어 검색...')).toBeVisible()
  })
})
