import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        kakao: {
          yellow: '#FEE500',
          brown: '#3C1E1E',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
