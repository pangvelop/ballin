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
    await expect(page.locator('a[href="/rules"]').first()).toBeVisible()
    await expect(page.locator('a[href="/training"]').first()).toBeVisible()
  })

  test('헤더의 Ballin 로고가 표시된다', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header').getByText('Ballin')).toBeVisible()
  })

  test('푸터가 표시된다', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('footer')).toBeVisible()
  })
})
