import type { GlossaryTerm } from '@/lib/types'

export const MOCK_TERMS: GlossaryTerm[] = [
  {
    term: '트래블링',
    definition: '공을 가지고 허용된 스텝 수를 초과하여 이동하는 반칙',
    english: 'Traveling',
    category: '바이올레이션',
    relatedTerms: ['더블드리블', '피벗'],
  },
  {
    term: '더블드리블',
    definition: '드리블을 멈춘 후 다시 드리블하는 반칙',
    english: 'Double Dribble',
    category: '바이올레이션',
  },
  {
    term: '픽앤롤',
    definition: '스크린을 세운 후 롤하여 패스를 받는 공격 전술',
    english: 'Pick and Roll',
    category: '전술',
  },
]
