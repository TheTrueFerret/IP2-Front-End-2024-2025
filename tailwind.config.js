/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], 
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#D7D0A2'
        }
      },
      backgroundImage: {
        'game-gradient': 'linear-gradient(280deg, rgba(14,0,155,1) 0%, rgba(0,60,255,1) 33%, rgba(0,212,255,1) 100%)',
      },
    },
  },
  plugins: [],
}

