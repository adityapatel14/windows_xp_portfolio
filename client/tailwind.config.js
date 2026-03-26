/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        tahoma: ['Tahoma', 'MS Sans Serif', 'Arial', 'sans-serif'],
      },
      colors: {
        xp: {
          blue: '#245EDB',
          'blue-dark': '#0A246A',
          'blue-light': '#3A88F5',
          grey: '#D4D0C8',
          'button-face': '#ECE9D8',
          border: '#0054E3',
        },
      },
    },
  },
  plugins: [],
}
