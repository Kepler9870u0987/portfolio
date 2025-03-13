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
          sans: [
            '-apple-system',
            'BlinkMacSystemFont', 
            '"Segoe UI"', 
            'Roboto', 
            'Oxygen',
            'Ubuntu', 
            'Cantarell', 
            '"Open Sans"', 
            '"Helvetica Neue"', 
            'sans-serif',
          ],
          mono: [
            'source-code-pro', 
            'Menlo', 
            'Monaco', 
            'Consolas', 
            '"Courier New"', 
            'monospace',
          ],
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }