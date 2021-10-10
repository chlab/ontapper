module.exports = {
  purge: {
    content: [
      './src/App.svelte',
    ],
    enabled: 'production' // disable purge in dev

  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        display: ['Cabin Sketch']
      },
      fontSize: {
        'big': '4rem',
        'huge': '5rem'
      },
      minWidth: {
        'big': '3rem',
        'huge': '4rem'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
