/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primYellow: '#b6a562',
        primYellowHover: '#c99d23',
      },
    },
  },
  plugins: [],
}
