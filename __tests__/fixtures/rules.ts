import type { RuleData } from '@/lib/types'

export const MOCK_RULES: RuleData[] = [
  {
    title: '트래블링 (Traveling)',
    category: 'violations',
    difficulty: 'beginner',
    summary: '공을 가진 상태에서 허용된 스텝 수를 초과하여 이동하는 반칙',
    tags: ['바이올레이션', '드리블'],
    relatedRules: ['double-dribble'],
    slug: 'traveling',
    content: '트래블링에 대한 상세 설명입니다.',
    fiba: {
      description: 'FIBA 기준 트래블링: 피벗풋 이동 시 바이올레이션.',
      keyPoints: ['피벗풋 규정', '게더 스텝 제한'],
    },
    nba: {
      description: 'NBA 기준 트래블링: 게더 스텝 후 2보까지 허용.',
      keyPoints: ['게더 스텝 허용', '유로 스텝 합법'],
    },
  },
  {
    title: '더블드리블 (Double Dribble)',
    category: 'violations',
    difficulty: 'beginner',
    summary: '드리블을 멈춘 후 다시 드리블하는 반칙',
    tags: ['바이올레이션', '드리블'],
    relatedRules: ['traveling'],
    slug: 'double-dribble',
    content: '더블드리블에 대한 상세 설명입니다.',
    fiba: {
      description: 'FIBA 기준 더블드리블 규정.',
      keyPoints: ['드리블 중단 후 재드리블 금지'],
    },
    nba: {
      description: 'NBA 기준 더블드리블 규정.',
      keyPoints: ['드리블 중단 후 재드리블 금지'],
    },
  },
  {
    title: '퍼스널 파울 (Personal Foul)',
    category: 'fouls',
    difficulty: 'intermediate',
    summary: '상대 선수에 대한 불법적인 신체 접촉',
    tags: ['파울', '신체 접촉'],
    slug: 'personal-foul',
    content: '퍼스널 파울에 대한 상세 설명입니다.',
    fiba: {
      description: 'FIBA 기준 퍼스널 파울 규정.',
      keyPoints: ['5 파울 퇴장'],
    },
    nba: {
      description: 'NBA 기준 퍼스널 파울 규정.',
      keyPoints: ['6 파울 퇴장'],
    },
  },
]
