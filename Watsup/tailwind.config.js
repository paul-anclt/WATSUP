module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        'watsup-bg-main' : '#212332',
        'watsup-bg-secondary' : '#2A2D3E',
        'watsup-title' : '#9B8EFF',
        'watsup-title-secondary' : '#7165BE',
        'watsup-text' : '#D8D7E1',
        'watsup-text-secondary' : '#6E6991',
        'watsup-text-white' : '#FFFFFF',
        'watsup-text-gray' : '#A5A2B8',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'] 
      },
    },
  },
  plugins: [],
}

