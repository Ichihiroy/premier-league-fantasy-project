/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f3f1ff',
          100: '#e9e5ff',
          200: '#d4cbff',
          300: '#b8a8ff',
          400: '#9b7aff',
          500: '#7c4dff',
          600: '#6a1b9a',
          700: '#4a0d7a',
          800: '#2e004f',
          900: '#1a0033',
        },
        accent: {
          magenta: '#c300ff',
          fuchsia: '#ff2e9d',
          teal: '#00e6d0',
          lime: '#00ff88',
        },
        neutral: {
          white: '#f5f6fa',
          100: '#f1f2f6',
          200: '#ddd8e7',
          300: '#a4a8b8',
          400: '#6b7084',
          500: '#4a5068',
          600: '#2f3349',
          700: '#1c1c24',
          800: '#151519',
          900: '#0d0d0f',
        },
        semantic: {
          success: '#00d09c',
          warning: '#ffcc00',
          error: '#ff4757',
          info: '#3742fa',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2e004f 0%, #4a0d7a 100%)',
        'gradient-accent': 'linear-gradient(135deg, #c300ff 0%, #ff2e9d 100%)',
        'gradient-hero': 'linear-gradient(135deg, #2e004f 0%, #4a0d7a 60%, #6a1b9a 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(124, 77, 255, 0.1) 0%, rgba(195, 0, 255, 0.05) 100%)',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(124, 77, 255, 0.3)',
        'glow-accent': '0 0 40px rgba(195, 0, 255, 0.4)',
        'glass': '0 10px 15px -3px rgba(46, 0, 79, 0.1), 0 4px 6px -2px rgba(46, 0, 79, 0.05)',
      },
      backdropBlur: {
        'glass': '10px',
      },
      animation: {
        'ticker': 'ticker 60s linear infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'pulse-accent': 'pulseAccent 2s infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeUp: {
          'to': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        pulseAccent: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        }
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
