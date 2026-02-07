import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type {
  RuleData,
  RuleFrontmatter,
  RuleCategory,
  TrainingData,
  TrainingFrontmatter,
  TrainingCategory,
  RoutineData,
  RoutineFrontmatter,
  GlossaryTerm,
} from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content')

// ── 유틸리티 ──────────────────────────────────────────

function getMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'))
}

function parseMdxFile<T>(filePath: string): { data: T; content: string } {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { data: data as T, content }
}

// ── 룰 ────────────────────────────────────────────────

export function getAllRules(): RuleData[] {
  const rulesDir = path.join(CONTENT_DIR, 'rules')
  if (!fs.existsSync(rulesDir)) return []

  const categories = fs.readdirSync(rulesDir).filter((item) => {
    const fullPath = path.join(rulesDir, item)
    return fs.statSync(fullPath).isDirectory()
  })

  const rules: RuleData[] = []

  for (const category of categories) {
    const categoryDir = path.join(rulesDir, category)
    const files = getMdxFiles(categoryDir)

    for (const file of files) {
      const filePath = path.join(categoryDir, file)
      const { data, content } = parseMdxFile<RuleFrontmatter>(filePath)
      const slug = file.replace(/\.mdx$/, '')

      rules.push({ ...data, slug, content })
    }
  }

  return rules
}

export function getRuleBySlug(
  category: RuleCategory,
  slug: string
): RuleData | null {
  const filePath = path.join(CONTENT_DIR, 'rules', category, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const { data, content } = parseMdxFile<RuleFrontmatter>(filePath)
  return { ...data, slug, content }
}

export function getRulesByCategory(category: RuleCategory): RuleData[] {
  const categoryDir = path.join(CONTENT_DIR, 'rules', category)
  const files = getMdxFiles(categoryDir)

  return files.map((file) => {
    const filePath = path.join(categoryDir, file)
    const { data, content } = parseMdxFile<RuleFrontmatter>(filePath)
    const slug = file.replace(/\.mdx$/, '')
    return { ...data, slug, content }
  })
}

// ── 연습법 ────────────────────────────────────────────

export function getAllTraining(): TrainingData[] {
  const trainingDir = path.join(CONTENT_DIR, 'training')
  if (!fs.existsSync(trainingDir)) return []

  const categories = fs.readdirSync(trainingDir).filter((item) => {
    const fullPath = path.join(trainingDir, item)
    return fs.statSync(fullPath).isDirectory()
  })

  const trainings: TrainingData[] = []

  for (const category of categories) {
    const categoryDir = path.join(trainingDir, category)
    const files = getMdxFiles(categoryDir)

    for (const file of files) {
      const filePath = path.join(categoryDir, file)
      const { data, content } = parseMdxFile<TrainingFrontmatter>(filePath)
      const slug = file.replace(/\.mdx$/, '')

      trainings.push({ ...data, slug, content })
    }
  }

  return trainings
}

export function getTrainingBySlug(
  category: TrainingCategory,
  slug: string
): TrainingData | null {
  const filePath = path.join(CONTENT_DIR, 'training', category, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const { data, content } = parseMdxFile<TrainingFrontmatter>(filePath)
  return { ...data, slug, content }
}

export function getTrainingByCategory(category: TrainingCategory): TrainingData[] {
  const categoryDir = path.join(CONTENT_DIR, 'training', category)
  const files = getMdxFiles(categoryDir)

  return files.map((file) => {
    const filePath = path.join(categoryDir, file)
    const { data, content } = parseMdxFile<TrainingFrontmatter>(filePath)
    const slug = file.replace(/\.mdx$/, '')
    return { ...data, slug, content }
  })
}

// ── 루틴 ──────────────────────────────────────────────

export function getAllRoutines(): RoutineData[] {
  const routinesDir = path.join(CONTENT_DIR, 'routines')
  const files = getMdxFiles(routinesDir)

  return files.map((file) => {
    const filePath = path.join(routinesDir, file)
    const { data, content } = parseMdxFile<RoutineFrontmatter>(filePath)
    const slug = file.replace(/\.mdx$/, '')
    return { ...data, slug, content }
  })
}

export function getRoutineBySlug(slug: string): RoutineData | null {
  const filePath = path.join(CONTENT_DIR, 'routines', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const { data, content } = parseMdxFile<RoutineFrontmatter>(filePath)
  return { ...data, slug, content }
}

// ── 용어사전 ──────────────────────────────────────────

export function getAllGlossaryTerms(): GlossaryTerm[] {
  const glossaryDir = path.join(CONTENT_DIR, 'glossary')
  const files = getMdxFiles(glossaryDir)

  return files.map((file) => {
    const filePath = path.join(glossaryDir, file)
    const { data } = parseMdxFile<GlossaryTerm>(filePath)
    return data
  })
}
