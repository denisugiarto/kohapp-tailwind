const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/templates/pages/**/*.html'],
  theme: {
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '3rem',
    },
    extend: {
      colors: {
        gray: {
          100: '#f8f8f8',
          200: '#f3f3f4',
          300: '#e7e8e9',
          400: '#cfd1d4',
          500: '#9fa3a9',
          600: '#6f757e',
          700: '#3f4753',
          800: '#27303e',
          900: '#0f1928',
        },
        primary1: '#E4B19C',
        primary2: '#F4DED1',
        primary3: '#617E7A',
      },
      fontFamily: {
        sans: ['Azo Sans', ...defaultTheme.fontFamily.sans],
      },
      skew: {
        14: '14deg',
      },
      spacing: {
        128: '32rem',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '448px',
          },
          '@screen md': {
            maxWidth: '512px',
          },
          '@screen lg': {
            maxWidth: '660px',
          },
          '@screen xl': {
            maxWidth: '680px',
          },
          '@screen 2xl': {
            maxWidth: '744px',
          },
        },
      });
    },
  ],
};
