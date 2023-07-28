/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.*'],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)"
      }
    },
  },
  plugins: [],
}

