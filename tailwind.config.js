/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/tw-elements/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#0072BB",
          light: "#9adbf7",
        },
        secondary: {
          main: "#0f172a",
          light: "#334155",
          highlight: "#94a3b8",
        },
        tertiary: {
          main: "#f3c614",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tw-elements/plugin.cjs")],
};
