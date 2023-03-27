/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontSize: {
      "2xl": [
        "24px",
        {
          lineHeight: "34px",
          fontWeight: "400",
          letterSpacing: "1.5px",
        },
      ],
      "6xl": [
        "64px",
        {
          lineHeight: "65.3px",
          letterSpacing: "-0.02em",
          fontWeight: "700",
        },
      ],
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)"],
        popins: ["var(--font-popins)"],
        rubik: ["var(--font-rubik)"],
      },
      colors: {
        specialBlue: "#6ea9d7",
        mint: "#A1FFE0",
        gray: {
          100: "#E9E9EB",
          200: "#D4D3D8",
          300: "#A9A8B0",
          400: "#93929C",
          500: "#525162",
          600: "#2F2E49",
          700: "#272639",
        },
        purple: {
          100: "#F3F2F7",
          200: "#DAD9E6",
          300: "#C1C0D6",
          400: "#2A2944",
          500: "#605F93",
          600: "#404061",
          700: "#28273D",
          800: "#1D1D29",
          900: "#101018",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
}
