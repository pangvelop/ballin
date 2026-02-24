'use client'

import { useState, useEffect } from 'react'
import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'

export default function GiscusComments() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-48 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
    )
  }

  return (
    <Giscus
      repo="pangvelop/ballin"
      repoId="R_kgDORKmzpA"
      category="General"
      categoryId="DIC_kwDORKmzpM4C3HLy"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      lang="ko"
    />
  )
}
