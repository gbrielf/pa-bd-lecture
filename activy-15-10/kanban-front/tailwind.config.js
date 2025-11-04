/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Esta linha é a mais importante
    "./src/**/*.{html,ts}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-primeui')
],
};