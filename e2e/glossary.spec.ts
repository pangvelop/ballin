import { test, expect } from '@playwright/test'

test.describe('용어사전', () => {
  test('용어사전 페이지가 렌더링된다', async ({ page }) => {
    await page.goto('/glossary')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('검색 입력란이 있다', async ({ page }) => {
    await page.goto('/glossary')
    await expect(page.getByPlaceholder('용어 검색...')).toBeVisible()
  })

  test('용어 검색이 동작한다', async ({ page }) => {
    await page.goto('/glossary')
    await page.getByPlaceholder('용어 검색...').fill('트래블링')
    // 필터링 후 트래블링 항목이 표시됨
    await expect(page.getByText('트래블링').first()).toBeVisible()
  })
})
