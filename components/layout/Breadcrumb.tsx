import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-brand-500 dark:hover:text-brand-400"
          >
            홈
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.label} className="flex items-center gap-1">
              <span className="text-gray-400 dark:text-gray-600" aria-hidden="true">
                &gt;
              </span>
              {isLast || !item.href ? (
                <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-brand-500 dark:hover:text-brand-400"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
