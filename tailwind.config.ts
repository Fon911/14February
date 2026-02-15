import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--color-bg-primary)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'text-primary': 'var(--color-text-primary)',
        'text-muted': 'var(--color-text-muted)',
        'accent-rose': 'var(--color-accent-rose)',
        'accent-soft': 'var(--color-accent-soft)',
      },
      fontSize: {
        'display': 'var(--text-display)',
        'xl': 'var(--text-xl)',
        'lg': 'var(--text-lg)',
        'base': 'var(--text-base)',
        'sm': 'var(--text-sm)',
      },
      fontWeight: {
        'thin': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
      },
      spacing: {
        'section-sm': 'var(--spacing-section-sm)',
        'section-md': 'var(--spacing-section-md)',
        'section-lg': 'var(--spacing-section-lg)',
      },
    },
  },
  plugins: [],
}

export default config
