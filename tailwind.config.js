/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lumif: {
          coral: '#E94D35',
          'coral-hover': '#D4412E',
          'coral-light': 'rgba(233,77,53,0.1)',
          'coral-glow': 'rgba(233,77,53,0.05)',
        },
        carrier: {
          qualitas: '#6B2D8B',
          gnp: '#F47920',
          'gnp-navy': '#1B2A4A',
          chubb: '#000000',
          zurich: '#0060AE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        gmail: ['"Google Sans"', 'Roboto', 'sans-serif'],
        'gmail-body': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
