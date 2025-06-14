import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rpm-primary': '#2563eb',
        'rpm-secondary': '#7c3aed',
        'rpm-accent': '#10b981',
        'rpm-dark': '#1e293b',
        'rpm-light': '#f1f5f9',
      },
      animation: {
        'level-up': 'levelUp 0.6s ease-out',
        'xp-gain': 'xpGain 0.4s ease-out',
      },
      keyframes: {
        levelUp: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        xpGain: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-20px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
export default config