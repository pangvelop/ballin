import { test, expect } from '@playwright/test'

test.describe('통합 검색', () => {
  test('검색 버튼이 헤더에 있다', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByLabel('검색 (Ctrl+K)')).toBeVisible()
  })

  test('검색 버튼 클릭으로 오버레이가 열린다', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('검색 (Ctrl+K)').click()
    await expect(page.getByPlaceholder('룰, 연습법, 용어 검색...')).toBeVisible()
  })

  test('검색어 입력 시 결과가 표시된다', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('검색 (Ctrl+K)').click()
    await page.getByPlaceholder('룰, 연습법, 용어 검색...').fill('트래블링')
    // 결과 항목이 표시됨
    await expect(page.locator('.fixed').getByText('트래블링').first()).toBeVisible()
  })

  test('Escape 키로 오버레이를 닫는다', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('검색 (Ctrl+K)').click()
    await expect(page.getByPlaceholder('룰, 연습법, 용어 검색...')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.getByPlaceholder('룰, 연습법, 용어 검색...')).not.toBeVisible()
  })
})
