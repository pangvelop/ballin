import { test, expect } from '@playwright/test'

test.describe('추천 루틴', () => {
  test('루틴 목록 페이지가 렌더링된다', async ({ page }) => {
    await page.goto('/routines')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('루틴 카드들이 표시된다', async ({ page }) => {
    await page.goto('/routines')
    const routineLinks = page.locator('a[href^="/routines/"]')
    await expect(routineLinks.first()).toBeVisible()
  })

  test('루틴 상세 페이지가 렌더링된다', async ({ page }) => {
    await page.goto('/routines')
    const firstRoutine = page.locator('a[href^="/routines/"]').first()
    await firstRoutine.click()
    await expect(page.locator('h1')).toBeVisible()
  })
})
