import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0F1117',
        'dark-card': '#181B25',
        'dark-panel': '#181B25',
        'dark-border': '#262A36',
        'dark-text': '#E8E9ED',
        'dark-muted': '#6B7080',
        'dark-row-hover': '#1E2130',
        'accent-indigo': '#6366F1',
        'accent-glow': 'rgba(99,102,241,0.15)',
        'status-green': '#10B981',
        'status-red': '#EF4444',
        'status-yellow': '#F59E0B',
        'status-blue': '#3B82F6',
      },
      fontFamily: {
        sans: ['DM Sans', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        slideIn: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        fadeToast: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '10%': { opacity: '1', transform: 'translateY(0)' },
          '85%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-8px)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.2s ease-out',
        fadeToast: 'fadeToast 3s ease forwards',
      },
    },
  },
  plugins: [],
};

export default config;
