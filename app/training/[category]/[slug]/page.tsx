import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import Breadcrumb from '@/components/layout/Breadcrumb'
import DifficultyBadge from '@/components/common/DifficultyBadge'
import InfoBox from '@/components/common/InfoBox'
import VideoEmbed from '@/components/common/VideoEmbed'
import BookmarkButton from '@/components/common/BookmarkButton'
import RelatedContent from '@/components/common/RelatedContent'
import QuizSection from '@/components/quiz/QuizSection'
import GiscusComments from '@/components/common/GiscusComments'
import { TRAINING_CATEGORIES } from '@/lib/categories'
import { getAllTraining, getTrainingBySlug } from '@/lib/content'
import type { TrainingCategory } from '@/lib/types'

interface Props {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  const trainings = getAllTraining()
  return trainings.map((t) => ({
    category: t.category,
    slug: t.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const training = getTrainingBySlug(category as TrainingCategory, slug)
  if (!training) return {}

  return {
    title: training.title,
    description: training.summary,
    openGraph: {
      title: training.title,
      description: training.summary,
    },
  }
}

export default async function TrainingDetailPage({ params }: Props) {
  const { category, slug } = await params
  const training = getTrainingBySlug(category as TrainingCategory, slug)
  if (!training) notFound()

  const categoryMeta = TRAINING_CATEGORIES[category as TrainingCategory]
  const allTraining = getAllTraining()
  const relatedDrills = (training.relatedDrills ?? [])
    .map((ds) => allTraining.find((t) => t.slug === ds))
    .filter((t) => t !== undefined)
    .map((t) => ({ slug: t.slug, title: t.title, href: `/training/${t.category}/${t.slug}` }))

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumb
        items={[
          { label: '연습법', href: '/training' },
          { label: categoryMeta?.name ?? category, href: `/training/${category}` },
          { label: training.title },
        ]}
      />

      {/* 헤더 */}
      <div className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={training.difficulty} />
          <span className="text-sm text-gray-500 dark:text-gray-500">
            {training.duration}
          </span>
          <BookmarkButton
            bookmark={{
              href: `/training/${category}/${slug}`,
              title: training.title,
              type: 'training',
            }}
          />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          {training.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{training.summary}</p>
      </div>

      {/* 필요 장비 */}
      {training.equipment.length > 0 && (
        <div className="mb-6 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
          <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
            필요 장비
          </h3>
          <ul className="flex flex-wrap gap-2">
            {training.equipment.map((item) => (
              <li
                key={item}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* MDX 본문 */}
      <article className="prose prose-gray max-w-none dark:prose-invert prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 dark:prose-headings:text-gray-100 dark:prose-p:text-gray-300 dark:prose-li:text-gray-300">
        <MDXRemote
          source={training.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          components={{ script: () => null, iframe: () => null }}
        />
      </article>

      {/* 흔한 실수 */}
      {training.commonMistakes && training.commonMistakes.length > 0 && (
        <InfoBox variant="mistake">
          <ul className="space-y-1">
            {training.commonMistakes.map((mistake) => (
              <li key={mistake} className="flex items-start gap-2">
                <span className="mt-0.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                {mistake}
              </li>
            ))}
          </ul>
        </InfoBox>
      )}

      {/* 영상 */}
      {training.videos && training.videos.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
            관련 영상
          </h2>
          {training.videos.map((video) => (
            <VideoEmbed key={video.url} url={video.url} title={video.title} poster={video.poster} />
          ))}
        </section>
      )}

      {/* 태그 */}
      {training.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {training.tags.map((tag) => (
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
      {training.quiz && training.quiz.questions.length > 0 && (
        <QuizSection quiz={training.quiz} slug={slug} />
      )}

      {/* 관련 연습법 */}
      <RelatedContent items={relatedDrills} label="관련 연습법" />

      {/* 댓글 */}
      <section className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
          댓글
        </h2>
        <GiscusComments />
      </section>
    </div>
  )
}
