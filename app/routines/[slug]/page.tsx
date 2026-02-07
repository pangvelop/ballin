import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import Breadcrumb from '@/components/layout/Breadcrumb'
import DifficultyBadge from '@/components/common/DifficultyBadge'
import RoutineView from '@/components/training/RoutineView'
import BookmarkButton from '@/components/common/BookmarkButton'
import { getAllRoutines, getRoutineBySlug, getAllTraining } from '@/lib/content'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const routines = getAllRoutines()
  return routines.map((routine) => ({ slug: routine.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const routine = getRoutineBySlug(slug)
  if (!routine) return {}

  return {
    title: routine.title,
    description: routine.summary,
    openGraph: {
      title: routine.title,
      description: routine.summary,
    },
  }
}

export default async function RoutineDetailPage({ params }: Props) {
  const { slug } = await params
  const routine = getRoutineBySlug(slug)
  if (!routine) notFound()

  const allTraining = getAllTraining()
  const linkedDrills = routine.drills
    .map((drillSlug) => allTraining.find((t) => t.slug === drillSlug))
    .filter((d) => d !== undefined)

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumb
        items={[{ label: '루틴', href: '/routines' }, { label: routine.title }]}
      />

      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
        {routine.title}
      </h1>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <DifficultyBadge difficulty={routine.difficulty} />
        <span className="text-sm text-gray-500 dark:text-gray-500">{routine.duration}</span>
        <BookmarkButton
          bookmark={{
            href: `/routines/${slug}`,
            title: routine.title,
            type: 'routine',
          }}
        />
      </div>

      <p className="mb-6 text-gray-600 dark:text-gray-400">{routine.summary}</p>

      {/* 연결된 드릴 */}
      {linkedDrills.length > 0 && (
        <RoutineView drills={linkedDrills} />
      )}

      {/* MDX 본문 */}
      <article className="prose prose-gray max-w-none dark:prose-invert prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 dark:prose-headings:text-gray-100 dark:prose-p:text-gray-300 dark:prose-li:text-gray-300">
        <MDXRemote
          source={routine.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          components={{ script: () => null, iframe: () => null }}
        />
      </article>

      {/* 태그 */}
      {routine.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {routine.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
