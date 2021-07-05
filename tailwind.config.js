const colors = require('tailwindcss/colors')


module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      default: '#5bc2de',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      blue : colors.blue,
      purple : colors.purple,
      green : colors.green
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    
  ],
  
}
