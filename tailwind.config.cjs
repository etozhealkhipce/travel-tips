const plugin = require("tailwindcss/plugin");
const { SCREEN_WIDTHS } = require("./src/shared/lib/constants/breakpoints.ts");

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "",
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./renderer/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ theme, addBase }) => {
      addBase({
        // or whichever color you'd like
        html: { color: theme("colors.slate.800") },
      });
    }),
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    screens: {
      xs: SCREEN_WIDTHS.xs,
      sm: SCREEN_WIDTHS.sm,
      md: SCREEN_WIDTHS.md,
      lg: SCREEN_WIDTHS.lg,
      xl: SCREEN_WIDTHS.xl,
      "2xl": SCREEN_WIDTHS["2xl"],
    },
    extend: {
      colors: {
        brand: "#FFFF",
      },
      animation: {
        "scale-in": "scale-in 0.3s ease-out",
        "fade-in": "fade-in 0.4s ease-in-out",
        "slide-down": "slide-down 0.4s ease-in-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      keyframes: {
        "caret-blink": {
          "20%,50%": { opacity: "0" },
          "0%,70%,100%": { opacity: "1" },
        },
        "accordion-up": {
          to: { height: "0" },
          from: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "fade-in": {
          to: {
            opacity: 1,
          },
          from: {
            opacity: 0,
          },
        },
        "scale-in": {
          to: {
            opacity: 1,
            transform: "scale(1)",
          },
          from: {
            opacity: 0,
            transform: "scale(0.9)",
          },
        },
        "slide-down": {
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
          from: {
            opacity: 0,
            transform: "translateY(-20px)",
          },
        },
      },
    },
  },
};
