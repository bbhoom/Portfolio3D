/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class', // Enables dark mode via the 'dark' class
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        generalsans: ['General Sans', 'sans-serif'],
      },
      colors: {
        black: {
          DEFAULT: '#000000',
          100: '#010103',
          200: '#0E0E10',
          300: '#1C1C21',
          500: '#3A3A49',
          600: '#1A1A1A',
        },
        white: {
          DEFAULT: '#FFFFFF',
          500: '#62646C',
          600: '#AFB0B6',
          700: '#D6D9E9',
          800: '#E4E4E6',
        },
      },
      backgroundImage: {
        terminal: "url('/assets/terminal.png')",

      },
    },
  },

  plugins: [],
};


export default config;
