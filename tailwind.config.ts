import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 농구 테마 컬러 팔레트
        court: {
          orange: '#F97316', // 농구공 오렌지
          wood: '#D4A574', // 코트 나무색
          'wood-dark': '#A0784C', // 코트 나무색 (진한)
          line: '#FFFFFF', // 코트 라인
        },
        brand: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316', // primary
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        difficulty: {
          beginner: '#22C55E', // 초급 (녹색)
          intermediate: '#EAB308', // 중급 (노란색)
          advanced: '#EF4444', // 고급 (빨간색)
        },
      },
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Helvetica Neue',
          'Apple SD Gothic Neo',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}

export default config
