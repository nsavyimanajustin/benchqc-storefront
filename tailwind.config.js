/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        charcoal: {
          900: '#070A0F',
          800: '#0B0F17',
          700: '#121824',
          600: '#1A2234',
        },
        navy: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
        },
        emerald: {
          brand: '#10B981',
          glow: '#34D399',
          dark: '#059669',
        },
        brand: {
          primary: 'var(--color-primary, #10B981)',
          'primary-hover': 'var(--color-primary-hover, #059669)',
          'primary-glow': 'var(--color-primary-glow, rgba(16, 185, 129, 0.2))',
          accent: 'var(--color-accent, #F59E0B)',
          'accent-hover': 'var(--color-accent-hover, #D97706)',
          'accent-glow': 'var(--color-accent-glow, rgba(245, 158, 11, 0.2))',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px -5px var(--color-primary-glow, rgba(16, 185, 129, 0.3))',
        'glow-accent': '0 0 20px -5px var(--color-accent-glow, rgba(245, 158, 11, 0.3))',
        'subtle-card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
