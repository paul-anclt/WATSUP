module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    colors:{
      'watsup-bg-main' : '#212332',
      'watsup-bg-secondary' : '#2A2D3E',
      'watsup-title' : '#9B8EFF',
      'watsup-text' : '#D8D7E1',
      'watsup-text-white' : '#FFFFFF',
      'watsup-green' : 'rgb(34 197 94)',
      'watsup-red' : 'color: rgb(185 28 28)'
    },
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      }
    }
  }
}

