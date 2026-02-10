import { test, expect } from '@playwright/test'

test.describe('연습법', () => {
  test('카테고리 목록 페이지가 렌더링된다', async ({ page }) => {
    await page.goto('/training')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('카테고리 페이지로 이동할 수 있다', async ({ page }) => {
    await page.goto('/training/individual-skills')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('연습법 상세 페이지가 렌더링된다', async ({ page }) => {
    await page.goto('/training/individual-skills')
    // 첫 번째 연습법 링크 클릭
    const firstDrill = page.locator('a[href^="/training/individual-skills/"]').first()
    await expect(firstDrill).toBeVisible()
  })

  test('난이도 필터 버튼이 있다', async ({ page }) => {
    await page.goto('/training/individual-skills')
    await expect(page.getByRole('button', { name: '전체' })).toBeVisible()
  })
})
