import { test, expect } from '@playwright/test'

test.describe('비교 모드 하이라이트', () => {
  test('비교 모드 토글이 표시된다', async ({ page }) => {
    await page.goto('/rules/violations/traveling')
    await expect(page.getByRole('switch', { name: '비교 모드 전환' })).toBeVisible()
  })

  test('비교 모드 전환 시 FIBA/NBA 패널이 나란히 표시된다', async ({ page }) => {
    await page.goto('/rules/violations/traveling')
    await page.getByRole('switch', { name: '비교 모드 전환' }).click()

    // 비교 모드 텍스트 표시
    await expect(page.getByText('비교 모드')).toBeVisible()
    // FIBA, NBA 두 패널 동시 표시
    await expect(page.locator('h3').getByText('FIBA')).toBeVisible()
    await expect(page.locator('h3').getByText('NBA')).toBeVisible()
  })

  test('비교 모드에서 차이점 하이라이트가 적용된다', async ({ page }) => {
    await page.goto('/rules/violations/traveling')
    await page.getByRole('switch', { name: '비교 모드 전환' }).click()

    // FIBA 전용 포인트: 파란색 하이라이트
    const blueHighlight = page.locator('li.border-blue-400')
    await expect(blueHighlight.first()).toBeVisible()

    // NBA 전용 포인트: 빨간색 하이라이트
    const redHighlight = page.locator('li.border-red-400')
    await expect(redHighlight.first()).toBeVisible()
  })
})
