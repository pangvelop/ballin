import { test, expect } from '@playwright/test'

test.describe('네비게이션', () => {
  test('헤더에 네비게이션 링크가 있다', async ({ page }) => {
    await page.goto('/')
    const header = page.locator('header')
    await expect(header.getByText('Ballin')).toBeVisible()
  })

  test('푸터 링크가 올바른 페이지로 이동한다', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    const rulesLink = footer.locator('a[href="/rules/game-basics"]')
    await expect(rulesLink).toBeVisible()
  })

  test('Ballin 로고 클릭 시 홈으로 이동한다', async ({ page }) => {
    await page.goto('/rules')
    await page.locator('header').getByText('Ballin').click()
    await expect(page).toHaveURL('/')
  })
})
