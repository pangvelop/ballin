import { test, expect } from '@playwright/test'

test.describe('퀴즈', () => {
  test.beforeEach(async ({ page }) => {
    // localStorage 초기화하여 이전 진행률 제거
    await page.goto('/rules/violations/traveling')
    await page.evaluate(() => localStorage.removeItem('ballin-quiz-traveling'))
    await page.reload()
  })

  test('퀴즈 섹션이 표시된다', async ({ page }) => {
    await expect(page.getByText('퀴즈로 확인하기')).toBeVisible()
    await expect(page.getByText('1 / 4')).toBeVisible()
  })

  test('옵션 선택 시 피드백과 설명이 표시된다', async ({ page }) => {
    // 첫 번째 질문: "게더 스텝 이후 허용되는 스텝 수는?"
    await expect(page.getByText('게더 스텝 이후 허용되는 스텝 수는?')).toBeVisible()

    // 옵션 클릭 (정답: 2스텝, index 1)
    await page.getByRole('button', { name: '2스텝' }).click()

    // 설명 표시
    await expect(page.getByText('FIBA와 NBA 모두 게더 스텝 이후 2스텝까지 허용됩니다.')).toBeVisible()
    // 다음 버튼 표시
    await expect(page.getByRole('button', { name: '다음' })).toBeVisible()
  })

  test('다음 버튼으로 다음 문제로 이동한다', async ({ page }) => {
    // Q1 답변
    await page.getByRole('button', { name: '2스텝' }).click()
    await page.getByRole('button', { name: '다음' }).click()

    // Q2로 이동
    await expect(page.getByText('2 / 4')).toBeVisible()
    await expect(page.getByText('NBA에서 유로 스텝은 트래블링이다.')).toBeVisible()
  })

  test('모든 문제 완료 후 결과가 표시된다', async ({ page }) => {
    // Q1: 2스텝 (정답)
    await page.getByRole('button', { name: '2스텝' }).click()
    await page.getByRole('button', { name: '다음' }).click()

    // Q2: X (정답 - false)
    await page.getByRole('button', { name: 'X' }).click()
    await page.getByRole('button', { name: '다음' }).click()

    // Q3: 아무 발이나 선택 가능 (정답)
    await page.getByRole('button', { name: '아무 발이나 선택 가능' }).click()
    await page.getByRole('button', { name: '다음' }).click()

    // Q4: 마지막 문제 → "결과 보기"
    await page.getByRole('button', { name: 'X' }).click()
    await page.getByRole('button', { name: '결과 보기' }).click()

    // 결과 화면
    await expect(page.getByText('퀴즈 결과')).toBeVisible()
    await expect(page.getByText('/ 4')).toBeVisible()
    await expect(page.getByRole('button', { name: '다시 풀기' })).toBeVisible()
  })

  test('다시 풀기 클릭 시 퀴즈가 초기화된다', async ({ page }) => {
    // 전체 풀이
    await page.getByRole('button', { name: '2스텝' }).click()
    await page.getByRole('button', { name: '다음' }).click()
    await page.getByRole('button', { name: 'X' }).click()
    await page.getByRole('button', { name: '다음' }).click()
    await page.getByRole('button', { name: '아무 발이나 선택 가능' }).click()
    await page.getByRole('button', { name: '다음' }).click()
    await page.getByRole('button', { name: 'X' }).click()
    await page.getByRole('button', { name: '결과 보기' }).click()

    // 다시 풀기
    await page.getByRole('button', { name: '다시 풀기' }).click()

    // 초기화 확인
    await expect(page.getByText('1 / 4')).toBeVisible()
    await expect(page.getByText('게더 스텝 이후 허용되는 스텝 수는?')).toBeVisible()
  })
})
