/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          900: '#0B1320',
          800: '#0F1A2E',
          700: '#1E293B',
          600: '#1F2937',
        },
        fintech: {
          blue: '#2563EB',
          'blue-hover': '#1D4ED8',
          'blue-light': '#60A5FA',
        }
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
      }
    },
  },
  plugins: [],
}
