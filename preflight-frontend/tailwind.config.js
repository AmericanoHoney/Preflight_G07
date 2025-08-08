// tailwind.config.js
// eslint-disable-next-line import/no-extraneous-dependencies
const typography = require('@tailwindcss/typography');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // <- App Router อยู่ในโฟลเดอร์นี้
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
};
