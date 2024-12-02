/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#edf7ee",
        important: "#cd5555"
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        my_emerald: {
          ...require("daisyui/src/theming/themes")["emerald"],
          // dark green
          "primary": "#c1e8c4",
          "primary-content": "#1e211b",
          // light green
          "secondary": "#223634",
          "secondary-content": "#eaf0e4",
          // light yellow
          "accent": "#e8d990",
          "accent-content": "#1e211b",
          // light gray
          "neutral": "#3c3d37",
          "nautral-content": "#e0e0e0",

          "--rounded-box": "0.5rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "font-family": "Roboto, sans-serif",
        },
      }
    ],
  },
}

