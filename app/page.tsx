import Link from 'next/link'
import { getAllRules } from '@/lib/content'
import DifficultyBadge from '@/components/common/DifficultyBadge'
import BookmarkSection from '@/components/common/BookmarkSection'

const QUICK_LINKS = [
  { href: '/rules', label: '룰북', description: '9개 카테고리별 농구 규칙' },
  { href: '/training', label: '연습법', description: '개인 스킬부터 팀 전술까지' },
  { href: '/glossary', label: '용어사전', description: '농구 용어 한눈에 보기' },
] as const

export default function Home() {
  const allRules = getAllRules()
  const featuredRules = allRules.slice(0, 4)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* 히어로 섹션 */}
      <section className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold text-gray-900 dark:text-gray-100">
          <span className="text-brand-500">Ballin</span>
        </h1>
        <p className="mb-2 text-xl text-gray-700 dark:text-gray-300">
          농구 룰 &amp; 연습법 가이드
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          FIBA/NBA 룰과 연습법을 체계적으로 정리한 모바일 퍼스트 웹앱
        </p>
      </section>

      {/* 빠른 바로가기 */}
      <section className="mb-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-gray-200 p-5 text-center transition-all hover:border-brand-300 hover:shadow-md dark:border-gray-800 dark:hover:border-brand-700"
            >
              <h2 className="mb-1 text-lg font-semibold text-gray-900 group-hover:text-brand-500 dark:text-gray-100">
                {link.label}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 북마크 바로가기 */}
      <BookmarkSection />

      {/* 추천 콘텐츠 */}
      {featuredRules.length > 0 && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              추천 룰
            </h2>
            <Link
              href="/rules"
              className="text-sm font-medium text-brand-500 hover:text-brand-600"
            >
              전체 보기
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredRules.map((rule) => (
              <Link
                key={rule.slug}
                href={`/rules/${rule.category}/${rule.slug}`}
                className="group rounded-xl border border-gray-200 p-4 transition-all hover:border-brand-300 hover:shadow-md dark:border-gray-800 dark:hover:border-brand-700"
              >
                <div className="mb-2">
                  <DifficultyBadge difficulty={rule.difficulty} />
                </div>
                <h3 className="mb-1 font-semibold text-gray-900 group-hover:text-brand-500 dark:text-gray-100">
                  {rule.title}
                </h3>
                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {rule.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
