import type { TrainingData } from '@/lib/types'

export const MOCK_DRILLS: TrainingData[] = [
  {
    title: '크로스오버 드리블 기초',
    category: 'individual-skills',
    subcategory: 'ball-handling',
    difficulty: 'beginner',
    duration: '15분',
    equipment: ['농구공 1개'],
    summary: '왼손-오른손 크로스오버 드리블의 기본 동작을 익히는 연습',
    tags: ['볼핸들링', '드리블'],
    commonMistakes: ['눈이 공을 봄', '허리를 세우고 드리블'],
    relatedDrills: ['behind-the-back'],
    slug: 'crossover-basic',
    content: '크로스오버 드리블 기초 상세 설명입니다.',
  },
  {
    title: '픽앤롤 2인 훈련',
    category: 'team-tactics',
    subcategory: 'pick-and-roll',
    difficulty: 'intermediate',
    duration: '20분',
    equipment: ['농구공 1개', '콘 2개'],
    summary: '픽앤롤의 기본 타이밍과 각도를 연습하는 2인 훈련',
    tags: ['팀전술', '픽앤롤'],
    slug: 'pick-and-roll-basic',
    content: '픽앤롤 2인 훈련 상세 설명입니다.',
  },
]
