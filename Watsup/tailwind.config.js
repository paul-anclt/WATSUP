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
      'watsup-text-white' : '#FFFFFF'
    },
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'] 
      }
    }
  }
}

