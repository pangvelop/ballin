import { test, expect } from '@playwright/test'

test.describe('댓글 (Giscus)', () => {
  test('댓글 섹션 제목이 표시된다', async ({ page }) => {
    await page.goto('/rules/violations/traveling')
    await expect(page.getByRole('heading', { name: '댓글' })).toBeVisible()
  })

  test('Giscus 위젯이 로드된다', async ({ page }) => {
    await page.goto('/rules/violations/traveling')
    // giscus-widget 커스텀 엘리먼트가 마운트되었는지 확인
    await expect(page.locator('giscus-widget')).toBeAttached({ timeout: 10000 })
    // iframe 로드는 외부 네트워크 의존적 → soft assertion
    const giscusIframe = page.locator('giscus-widget iframe')
    await expect.soft(giscusIframe).toBeAttached({ timeout: 15000 })
  })
})
