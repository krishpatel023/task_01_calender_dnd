/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'breakPoint1' : { 'max' : '1200px'} ,
      'breakPoint2' : { 'max' : '800px'} ,
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ['light'],
  },
}

