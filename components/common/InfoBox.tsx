interface InfoBoxProps {
  title?: string
  children: React.ReactNode
  variant?: 'tip' | 'warning' | 'mistake'
}

const VARIANT_STYLES = {
  tip: {
    container: 'border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50',
    title: 'text-blue-800 dark:text-blue-300',
    icon: 'text-blue-500',
  },
  warning: {
    container: 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50',
    title: 'text-amber-800 dark:text-amber-300',
    icon: 'text-amber-500',
  },
  mistake: {
    container: 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/50',
    title: 'text-red-800 dark:text-red-300',
    icon: 'text-red-500',
  },
} as const

const DEFAULT_TITLES: Record<string, string> = {
  tip: '자주 헷갈리는 포인트',
  warning: '주의',
  mistake: '흔한 실수',
}

export default function InfoBox({ title, children, variant = 'tip' }: InfoBoxProps) {
  const styles = VARIANT_STYLES[variant]
  const displayTitle = title ?? DEFAULT_TITLES[variant]

  return (
    <div className={`my-4 rounded-lg border-l-4 p-4 ${styles.container}`}>
      {displayTitle && (
        <p className={`mb-2 text-sm font-semibold ${styles.title}`}>{displayTitle}</p>
      )}
      <div className="text-sm text-gray-700 dark:text-gray-300">{children}</div>
    </div>
  )
}
