/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.{js,tsx,ts,jsx}', './App.{js,jsx,ts,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}

