/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '120': '30rem',
      }
    },
  },
  plugins: [
    'tailwindcss/forms',
  ],
}