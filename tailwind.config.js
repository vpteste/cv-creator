/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['"Nunito"', 'sans-serif'],
        quicksand: ['"Quicksand"', 'sans-serif'],
      },
      colors: {
        'lavender': '#E6E6FA',
        'sky-blue': '#D7EFFF',
        'mint': '#D9F7E8',
        'powder-pink': '#FADADD',
      },
      keyframes: {
        'gradient-move': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        'gradient-bg': 'gradient-move 15s ease infinite',
      },
    },
  },
  plugins: [],
}