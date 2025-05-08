/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF1F1',
          100: '#FFE4E4',
          200: '#FFCBCB',
          300: '#FFA3A3',
          400: '#FF7575',
          500: '#E31E24', // Xavia Red
          600: '#CC1A1F',
          700: '#B31519',
          800: '#8C1115',
          900: '#660C0F',
          950: '#330608',
        },
        secondary: {
          50: '#FFFFFF', // Pure White
          100: '#FAFAFA',
          200: '#F5F5F5',
          300: '#E5E5E5',
          400: '#D4D4D4',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#000000', // Pure Black
        },
        accent: {
          50: '#FFFFFF',
          100: '#FEFEFE',
          200: '#E31E24',
          300: '#000000',
          400: '#E31E24',
          500: '#FFFFFF',
          600: '#000000',
          700: '#E31E24',
          800: '#000000',
          900: '#FFFFFF',
          950: '#E31E24',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Poppins"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(227, 30, 36, 0.5)', // Xavia red glow
        'glow-accent': '0 0 15px rgba(255, 255, 255, 0.5)', // White glow
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        shimmer: 'shimmer 2.5s infinite linear',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};