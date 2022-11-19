/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT( {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
          fontFamily: {
       
        'sf-pro-display':['SF Pro Display', 'sans-serif']
      }
       },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    
  ],
})