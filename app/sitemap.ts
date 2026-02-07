import type { MetadataRoute } from 'next'
import { getAllRules, getAllTraining, getAllRoutines } from '@/lib/content'

export const dynamic = 'force-static'

const BASE_URL = 'https://ballin.kr'

export default function sitemap(): MetadataRoute.Sitemap {
  const rules = getAllRules()
  const trainings = getAllTraining()
  const routines = getAllRoutines()

  const rulePages = rules.map((rule) => ({
    url: `${BASE_URL}/rules/${rule.category}/${rule.slug}`,
    lastModified: new Date(),
  }))

  const trainingPages = trainings.map((t) => ({
    url: `${BASE_URL}/training/${t.category}/${t.slug}`,
    lastModified: new Date(),
  }))

  const routinePages = routines.map((r) => ({
    url: `${BASE_URL}/routines/${r.slug}`,
    lastModified: new Date(),
  }))

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/rules`, lastModified: new Date() },
    { url: `${BASE_URL}/training`, lastModified: new Date() },
    { url: `${BASE_URL}/routines`, lastModified: new Date() },
    { url: `${BASE_URL}/glossary`, lastModified: new Date() },
    ...rulePages,
    ...trainingPages,
    ...routinePages,
  ]
}
