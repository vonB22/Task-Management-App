/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Warm dark theme colors
        'dark-bg': '#1a1512',
        'dark-surface': '#2d2419',
        'dark-border': '#4a3d2f',
        'dark-text': '#f5e6d3',
        'dark-muted': '#9d8b73',
      },
    },
  },
  plugins: [],
}
