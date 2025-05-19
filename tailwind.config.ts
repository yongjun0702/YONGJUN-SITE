import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme') // require 사용

const config = {
  darkMode: 'class', // 배열 대신 문자열 사용
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        'xs': '375px',
      },
      fontFamily: {
        // 기본 sans 폰트를 Pretendard CSS 변수로 설정
        sans: ['var(--font-pretendard)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            h2: {
              fontSize: theme('fontSize.2xl'),
              fontWeight: theme('fontWeight.semibold'),
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.gray.300'),
              paddingBottom: theme('spacing.2'),
              marginTop: theme('spacing.12'),
              marginBottom: theme('spacing.5'),
            },
            p: {
              marginTop: theme('spacing.5'),
              marginBottom: theme('spacing.6'),
            },
            blockquote: {
              fontStyle: 'normal',
              color: theme('colors.gray.700'),
              borderLeftWidth: '4px',
              borderLeftColor: theme('colors.gray.400'),
              paddingTop: theme('spacing.3'),
              paddingBottom: theme('spacing.3'),
              paddingLeft: theme('spacing.4'),
              paddingRight: theme('spacing.4'),
              backgroundColor: theme('colors.gray.50'),
              quotes: 'none',
              p: {
                fontSize: theme('fontSize.base'),
                fontWeight: '400',
                marginTop: theme('spacing.1'),
                marginBottom: theme('spacing.1'),
              },
            },
          },
        },
        invert: {
          css: {
            h2: {
              borderBottomColor: theme('colors.gray.700'),
            },
            blockquote: {
              color: theme('colors.gray.300'),
              borderLeftColor: theme('colors.gray.600'),
              backgroundColor: theme('colors.gray.800'),
            },
          },
        },
        lg: {
          css: {
            h2: {
              fontSize: theme('fontSize.3xl'),
              marginTop: theme('spacing.14'),
              marginBottom: theme('spacing.6'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config

export default config 