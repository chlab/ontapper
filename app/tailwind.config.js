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
        'huge': '5rem'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
