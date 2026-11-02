const tokens = require("./src/shared/design-tokens.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: tokens.colors.brand,
        risk: tokens.colors.risk,
        neutral: tokens.colors.neutral,
      },
      fontFamily: {
        sans: tokens.typography.fontFamily,
      },
      fontSize: tokens.typography.fontSize,
      spacing: tokens.spacing,
    },
  },
  plugins: [],
};
