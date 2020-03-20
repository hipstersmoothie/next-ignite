const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  plugins: [
    require('tailwindcss-dark-mode')()
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          ...colors.gray,
          1000: '#11151d'
        }
      },
    }
  },
  variants: {
    backgroundColor: ['dark', 'dark-focus', 'dark-hover'],
    fontWeight: ['dark', 'dark-hover'],
    borderColor: ['dark', 'dark-focus', 'dark-hover'],
    textColor: ['dark', 'dark-focus', 'dark-hover'],
  }
};
