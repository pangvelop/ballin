import { test, expect } from '@playwright/test'

test.describe('룰북', () => {
  test('카테고리 목록 페이지가 렌더링된다', async ({ page }) => {
    await page.goto('/rules')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('9개 카테고리 링크가 있다', async ({ page }) => {
    await page.goto('/rules')
    const categoryLinks = page.locator('a[href^="/rules/"]')
    await expect(categoryLinks.first()).toBeVisible()
  })

  test('카테고리 페이지로 이동할 수 있다', async ({ page }) => {
    await page.goto('/rules/violations')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('룰 상세 페이지가 렌더링된다', async ({ page }) => {
    await page.goto('/rules/violations/traveling')
    await expect(page.locator('h1')).toContainText('트래블링')
  })

  test('FIBA/NBA 탭이 표시된다', async ({ page }) => {
    await page.goto('/rules/violations/traveling')
    await expect(page.getByRole('button', { name: 'FIBA' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'NBA' })).toBeVisible()
  })

  test('브레드크럼이 표시된다', async ({ page }) => {
    await page.goto('/rules/violations/traveling')
    await expect(page.locator('nav[aria-label="breadcrumb"]')).toBeVisible()
  })
})
