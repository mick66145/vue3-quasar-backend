import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
  attributify: true,
  preflight: false,
  extract: {
    include: ['src/**/*.{html,vue,jsx,tsx,svelte}'],
    exclude: ['node_modules', '.git'],
  },
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        qDark: 'var(--color-dark)',
        positive: 'var(--color-positive)',
        negative: 'var(--color-negative)',
        info: 'var(--color-info)',
        warning: 'var(--color-warning)',
        func: {
          focus: 'var(--color-func-focus)',
        },

        pink: colors.pink,
        rose: colors.rose,
        red: colors.red,
        orange: colors.orange,
        yellow: colors.yellow,
        amber: colors.amber,
        lime: colors.lime,
        green: colors.green,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        sky: colors.sky,
        blue: colors.blue,
        indigo: colors.indigo,
        purple: colors.purple,
        violet: colors.violet,
        fuchsia: colors.fuchsia,
        gray: colors.gray,
        slate: colors.slate,
        stone: colors.stone,
        neutral: colors.neutral,
        zinc: colors.zinc,
        light: colors.light,
        dark: colors.dark,
      },
    },
    screens: {
      xs: '0',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px',
    },
  },
  plugins: [
    // require('windicss/plugin/forms'),  // disable base input style
    require('windicss/plugin/typography'),
    require('windicss/plugin/line-clamp'),
    require('windicss/plugin/aspect-ratio'),
    require('windicss/plugin/scroll-snap'),
  ],
})
