import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import Breadcrumb from '@/components/layout/Breadcrumb'
import DifficultyBadge from '@/components/common/DifficultyBadge'
import RuleCompare from '@/components/rules/RuleCompare'
import VideoEmbed from '@/components/common/VideoEmbed'
import BookmarkButton from '@/components/common/BookmarkButton'
import RelatedContent from '@/components/common/RelatedContent'
import QuizSection from '@/components/quiz/QuizSection'
import { RULE_CATEGORIES } from '@/lib/categories'
import { getAllRules, getRuleBySlug } from '@/lib/content'
import type { RuleCategory } from '@/lib/types'

interface Props {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  const rules = getAllRules()
  return rules.map((rule) => ({
    category: rule.category,
    slug: rule.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const rule = getRuleBySlug(category as RuleCategory, slug)
  if (!rule) return {}

  return {
    title: rule.title,
    description: rule.summary,
    openGraph: {
      title: rule.title,
      description: rule.summary,
    },
  }
}

export default async function RuleDetailPage({ params }: Props) {
  const { category, slug } = await params
  const rule = getRuleBySlug(category as RuleCategory, slug)
  if (!rule) notFound()

  const categoryMeta = RULE_CATEGORIES[category as RuleCategory]
  const allRules = getAllRules()
  const relatedRules = (rule.relatedRules ?? [])
    .map((rs) => allRules.find((r) => r.slug === rs))
    .filter((r) => r !== undefined)
    .map((r) => ({ slug: r.slug, title: r.title, href: `/rules/${r.category}/${r.slug}` }))

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumb
        items={[
          { label: '룰북', href: '/rules' },
          { label: categoryMeta?.name ?? category, href: `/rules/${category}` },
          { label: rule.title },
        ]}
      />

      {/* 헤더 */}
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <DifficultyBadge difficulty={rule.difficulty} />
          <BookmarkButton
            bookmark={{
              href: `/rules/${category}/${slug}`,
              title: rule.title,
              type: 'rule',
            }}
          />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          {rule.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{rule.summary}</p>
      </div>

      {/* FIBA/NBA 비교 탭 */}
      <Suspense
        fallback={
          <div className="my-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">탭 모드</span>
            </div>
            <div className="flex rounded-lg border border-gray-200 p-1 dark:border-gray-700">
              <div className="flex-1 rounded-md bg-brand-500 px-4 py-2 text-center text-sm font-medium text-white">
                FIBA
              </div>
              <div className="flex-1 rounded-md px-4 py-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
                NBA
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mt-3 h-20 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
            </div>
          </div>
        }
      >
        <RuleCompare fiba={rule.fiba} nba={rule.nba} />
      </Suspense>

      {/* MDX 본문 */}
      <article className="prose prose-gray max-w-none dark:prose-invert prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 dark:prose-headings:text-gray-100 dark:prose-p:text-gray-300 dark:prose-li:text-gray-300">
        <MDXRemote
          source={rule.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          components={{ script: () => null, iframe: () => null }}
        />
      </article>

      {/* 영상 */}
      {rule.videos && rule.videos.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
            관련 영상
          </h2>
          {rule.videos.map((video) => (
            <VideoEmbed key={video.url} url={video.url} title={video.title} />
          ))}
        </section>
      )}

      {/* 태그 */}
      {rule.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {rule.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 퀴즈 */}
      {rule.quiz && rule.quiz.questions.length > 0 && (
        <QuizSection quiz={rule.quiz} slug={slug} />
      )}

      {/* 관련 룰 */}
      <RelatedContent items={relatedRules} label="관련 룰" />
    </div>
  )
}
