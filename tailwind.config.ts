import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FBFAF7',
        ink: '#101414',
        teal: '#479E90',
        gold: '#D9AA66',
        red: '#DF1A23',
        orange: '#F68421',
        yellow: '#FECB02',
        'dark-teal': '#016171',
        pink: '#EF1551',
        lime: '#A5CD2F',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'var(--font-noto-bengali)', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'var(--font-hind-siliguri)', 'system-ui', 'sans-serif'],
        bengali: ['var(--font-hind-siliguri)', 'var(--font-noto-bengali)', 'serif'],
      },
      fontSize: {
        // Fluid type scale
        'display-xl': 'clamp(4rem, 10vw, 10rem)',
        'display-lg': 'clamp(3rem, 7vw, 7rem)',
        'display-md': 'clamp(2.5rem, 5vw, 5rem)',
        'display-sm': 'clamp(2rem, 4vw, 3.5rem)',
        'label': '0.6875rem', // 11px
      },
      letterSpacing: {
        label: '0.22em',
        tight: '-0.03em',
        tighter: '-0.05em',
      },
      lineHeight: {
        display: '0.95',
        heading: '1.1',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'power3': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        micro: '250ms',
        standard: '900ms',
        hero: '1600ms',
      },
      borderRadius: {
        xl2: '1rem',
      },
      screens: {
        xs: '390px',
      },
      zIndex: {
        cursor: '9999',
        preloader: '9998',
        transition: '9997',
        header: '100',
        modal: '200',
      },
    },
  },
  plugins: [],
}

export default config
