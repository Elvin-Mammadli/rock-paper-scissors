/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    color: {
      my_black: '#161616',
      gradient_top: '#484848',
      gradient_bottom: '#1d1d1d',
    },
    extend: {},
  },
  plugins: [],
}