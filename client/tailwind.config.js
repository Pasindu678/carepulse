/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        care: {
          blue: '#1E5BF0',
          green: '#10B981',
          emerald: '#059669',
          lightGreen: '#E8FBF4',
          subtleGreen: '#F0FDF8',
          cardBorder: '#E5E9F0',
          peach: '#FFF1EE',
          darkText: '#0F172A',
          mutedText: '#64748B'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"DM Serif Display"', 'Georgia', 'serif']
      },
      boxShadow: {
        'soft-card': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'blue-glow': '0 10px 25px -3px rgba(30, 91, 240, 0.3)',
        'green-glow': '0 10px 25px -3px rgba(16, 185, 129, 0.3)',
      }
    },
  },
  plugins: [],
}
