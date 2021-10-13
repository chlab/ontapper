module.exports = {
  purge: ['./src/**/*.svelte', './public/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        display: ['Cabin Sketch']
      },
      fontSize: {
        'big': '3rem',
        'huge': '4rem'
      },
      minWidth: {
        '16': '4rem'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
