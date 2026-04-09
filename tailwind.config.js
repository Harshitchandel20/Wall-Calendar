/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        paper: '#FFFFFF',
        'bg-warm': '#E2E0DC',
        accent: {
          blue: '#2B7EC1',
          gold: '#E8A741',
          orange: '#D4663E',
        },
        'grid-line': '#E5E5E5',
      },
      boxShadow: {
        'paper': '0 2px 4px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.06), 0 16px 32px rgba(0,0,0,0.08), 0 32px 64px rgba(0,0,0,0.04)',
        'paper-hover': '0 4px 8px rgba(0,0,0,0.06), 0 12px 24px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.1)',
      },
      animation: {
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
        'hero-flip-in': 'heroFlipIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'grid-fade-slide': 'gridFadeSlide 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'today-glow': 'todayGlow 3s ease-in-out infinite',
        'range-highlight': 'rangeHighlight 0.25s ease forwards',
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: '0.6', transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1.05)' },
        },
        heroFlipIn: {
          '0%': { opacity: '0', transform: 'scale(1.12)' },
          '100%': { opacity: '1', transform: 'scale(1.05)' },
        },
        gridFadeSlide: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        todayGlow: {
          '0%, 100%': { opacity: '0.5', boxShadow: '0 0 0 0 rgba(232, 167, 65, 0)' },
          '50%': { opacity: '1', boxShadow: '0 0 8px 2px rgba(232, 167, 65, 0.15)' },
        },
        rangeHighlight: {
          '0%': { backgroundColor: 'transparent' },
          '100%': { backgroundColor: 'var(--selection-range, rgba(43, 126, 193, 0.10))' },
        },
      },
    },
  },
  plugins: [],
}
