/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    gap: true,
    border: true,
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
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
        "20px",
        {
          lineHeight: "34px",
          fontWeight: "400",
          letterSpacing: "-0.02em",
        },
      ],
      "3xl": [
        "25px",
        {
          lineHeight: "35px",
          fontWeight: "500",
          letterSpacing: "-0.02em",
        },
      ],
      "4xl": [
        "40px",
        {
          lineHeight: "58.09px",
          fontWeight: "600",
          letterSpacing: "-0.02em",
        },
      ],
      "5xl": [
        "48px",
        {
          lineHeight: "45.3px",
          letterSpacing: "-0.02em",
          fontWeight: "700",
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
    transparent: "transparent",
    current: "currentColor",
    extend: {
      animation: {
        tilt: "tilt 10s infinite linear",
        bounceArrow: "bounce 1s infinite",
        pulseCustom: "custom 5s linear infinite",
        bounceRight: "bounceRight 2s ease-in-out infinite ",
      },
      keyframes: {
        bounceRight: {
          "0%": { transform: "translateX(-15%) rotate(45deg)" },
          "50%": { transform: "translateX(10%) rotate(45deg)" },
          "100%": { transform: "translateX(-15%) rotate(45deg)" },
        },
        custom: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: ".5",
          },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-25px)",
          },
        },
        tilt: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(0.5deg)",
          },
          "75%": {
            transform: "rotate(-0.5deg)",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      colors: {
        specialBlue: "#6ea9d7",
        morado: "#7477FB",
        moradoCode: "#A688FF",
        mint: "#A1FFE0",
        blue: "#2C9DC0",
        lineNumbers: "#8283AD",
        gradient: {
          dark: "#a688ff",
          light: "#d1a8ff",
        },
        gray: {
          100: "#E9E9EB",
          200: "#D4D3D8",
          300: "#A9A8B0",
          400: "#93929C",
          500: "#525162",
          600: "#2F2E49",
          700: "#272639",
          800: "#787879",
        },
        purple: {
          100: "#F3F2F7",
          200: "#DAD9E6",
          300: "#C1C0D6",
          400: "#2A2944",
          500: "#292B45",
          600: "#222539",
          700: "#1E2030",
          800: "#181A28",
          900: "#101018",
        },
        tremor: {
          brand: {
            faint: "#eff6ff", // blue-50
            muted: "#bfdbfe", // blue-200
            subtle: "#60a5fa", // blue-400
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#1d4ed8", // blue-700
            inverted: "#ffffff", // white
          },
          background: {
            muted: "#f9fafb", // gray-50
            subtle: "#f3f4f6", // gray-100
            DEFAULT: "#ffffff", // white
            emphasis: "#374151", // gray-700
          },
          border: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          ring: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          content: {
            subtle: "#9ca3af", // gray-400
            DEFAULT: "#6b7280", // gray-500
            emphasis: "#374151", // gray-700
            strong: "#111827", // gray-900
            inverted: "#ffffff", // white
          },
        },
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": "0.75rem",
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
}
