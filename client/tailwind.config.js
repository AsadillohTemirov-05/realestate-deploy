/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f9f9f9",
        primaryLight: "#e3f7fa",
        secondary: "#7a62fe",
        tertiary: "#404040",
        "gray-10": "#EEEEEE",
        "gray-20": "#A2A2A2",
        "gray-30": "#7B7B7B",
        "gray-50": "#585858",
        "gray-90": "#141414",
      },
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
    },
  },
  plugins: [],
}
