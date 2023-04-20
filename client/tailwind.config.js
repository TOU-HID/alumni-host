/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
        },
        secondary: {
          DEFAULT: '#60A5FA',
        },
        cadmium: {
          DEFAULT: '#D22B2B',
        },
        black2: {
          DEFAULT: '#222732',
        },
        'nav-black': {
          DEFAULT: '#0F141E',
        },
        gray2: {
          DEFAULT: '#F2F5FB',
        },
        manufac: {
          DEFAULT: '#909090',
        },
      },
    },
  },
  plugins: [require('daisyui')],
};
