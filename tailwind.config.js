module.exports = {
    content: [
      './src/**/*.{js,jsx}',
      './public/index.html',
    ],
    theme: {
      extend: {
        colors: {
          primary: '#0066cc',
          secondary: '#333333',
        },
        fontFamily: {
          custom: ['HomePageFont', 'Roboto Flex', 'sans-serif']
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }