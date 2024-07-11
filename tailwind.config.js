/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "dark-puples": "#2F3645",
        "rgba": "#939185"
      }
    },
  },
  plugins: [],
}

