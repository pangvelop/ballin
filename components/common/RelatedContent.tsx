import Link from 'next/link'

interface RelatedItem {
  slug: string
  title: string
  href: string
}

interface RelatedContentProps {
  items: RelatedItem[]
  label: string
}

export default function RelatedContent({ items, label }: RelatedContentProps) {
  if (items.length === 0) return null

  return (
    <section className="mt-8">
      <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-gray-100">{label}</h2>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-brand-300 hover:text-brand-500 dark:border-gray-700 dark:text-gray-300 dark:hover:border-brand-600 dark:hover:text-brand-400"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </section>
  )
}
