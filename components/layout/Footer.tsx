import Link from 'next/link'

const FOOTER_SECTIONS = [
  {
    title: '룰북',
    links: [
      { href: '/rules/game-basics', label: '기본 규칙' },
      { href: '/rules/violations', label: '바이올레이션' },
      { href: '/rules/fouls', label: '파울' },
      { href: '/rules/positions', label: '포지션' },
    ],
  },
  {
    title: '연습법',
    links: [
      { href: '/training/individual-skills', label: '개인 스킬' },
      { href: '/training/team-tactics', label: '팀 전술' },
      { href: '/training/fitness', label: '체력 & 컨디셔닝' },
    ],
  },
  {
    title: '더보기',
    links: [
      { href: '/routines', label: '추천 루틴' },
      { href: '/glossary', label: '용어사전' },
    ],
  },
] as const

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* 링크 섹션 */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 transition-colors hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 하단 */}
        <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              &copy; 2026 Ballin — 농구 룰 &amp; 연습법 가이드
            </p>
            <a
              href="#"
              className="text-xs text-gray-500 transition-colors hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
            >
              맨 위로 &uarr;
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
