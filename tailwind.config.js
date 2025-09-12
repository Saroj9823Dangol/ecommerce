/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)" /* gray-200 */,
        input: "var(--color-input)" /* white */,
        ring: "var(--color-ring)" /* orange-500 */,
        background: "var(--color-background)" /* gray-50 */,
        foreground: "var(--color-foreground)" /* gray-900 */,
        primary: {
          DEFAULT: "var(--color-primary)" /* black */,
          foreground: "var(--color-primary-foreground)" /* white */,
        },
        secondary: {
          DEFAULT: "var(--color-secondary)" /* gray-100 */,
          foreground: "var(--color-secondary-foreground)" /* gray-900 */,
        },
        destructive: {
          DEFAULT: "var(--color-destructive)" /* red-500 */,
          foreground: "var(--color-destructive-foreground)" /* white */,
        },
        muted: {
          DEFAULT: "var(--color-muted)" /* gray-100 */,
          foreground: "var(--color-muted-foreground)" /* gray-500 */,
        },
        accent: {
          DEFAULT: "var(--color-accent)" /* orange-500 */,
          foreground: "var(--color-accent-foreground)" /* white */,
        },
        popover: {
          DEFAULT: "var(--color-popover)" /* white */,
          foreground: "var(--color-popover-foreground)" /* gray-900 */,
        },
        card: {
          DEFAULT: "var(--color-card)" /* white */,
          foreground: "var(--color-card-foreground)" /* gray-900 */,
        },
        success: {
          DEFAULT: "var(--color-success)" /* green-500 */,
          foreground: "var(--color-success-foreground)" /* white */,
        },
        warning: {
          DEFAULT: "var(--color-warning)" /* amber-500 */,
          foreground: "var(--color-warning-foreground)" /* white */,
        },
        error: {
          DEFAULT: "var(--color-error)" /* red-500 */,
          foreground: "var(--color-error-foreground)" /* white */,
        },
      },
      fontFamily: {
        flame: ["Flame", "sans-serif"],
        coder: ["Cascadia Code", "monospace"],
        monument: ["Monument Extended", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "elevation-1": "0 1px 3px rgba(0, 0, 0, 0.1)",
        "elevation-2": "0 4px 12px rgba(0, 0, 0, 0.15)",
        "elevation-3": "0 8px 24px rgba(0, 0, 0, 0.2)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "slide-in": "slide-in 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
        "scale-in": "scale-in 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in": {
          from: { transform: "translateY(-10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0.0, 0.2, 1)",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
