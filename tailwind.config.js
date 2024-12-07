/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        light: '#edf7ee',
        important: '#cd5555',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      'emerald', // Directly use the theme name instead of manually importing it
      {
        my_emerald: {
          primary: '#c1e8c4',
          'primary-content': '#1e211b',
          secondary: '#223634',
          'secondary-content': '#eaf0e4',
          accent: '#e8d990',
          'accent-content': '#1e211b',
          neutral: '#3c3d37',
          'nautral-content': '#e0e0e0',
          '--rounded-box': '0.5rem',
          '--rounded-btn': '0.5rem',
          'font-family': 'Roboto, sans-serif',
        },
      },
    ],
  },
};
