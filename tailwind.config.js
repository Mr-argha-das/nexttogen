/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — deep navy + gold accent, with soft supporting neutrals
        brand: {
          50:  "#f3f4fb",
          100: "#e5e8f5",
          200: "#c6cce8",
          300: "#9aa4d3",
          400: "#6a77ba",
          500: "#4a57a5",
          600: "#374089",
          700: "#2b326e",
          800: "#1f2554",
          900: "#141838",
          950: "#0a0c22"
        },
        gold: {
          50:  "#fdf9ec",
          100: "#faf0c9",
          200: "#f5de8e",
          300: "#efc755",
          400: "#e8b12a",
          500: "#d0951a",
          600: "#a97314",
          700: "#7f5413",
          800: "#553914",
          900: "#2f1f09"
        },
        ink: {
          50:  "#f7f7f8",
          100: "#eeeef1",
          200: "#d9dae1",
          300: "#b4b6c5",
          400: "#8588a0",
          500: "#5f6278",
          600: "#46485b",
          700: "#323444",
          800: "#1f212c",
          900: "#0e0f16"
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"DM Sans"', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Fraunces"', '"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      letterSpacing: {
        'display': '-0.02em',
        'display-wide': '-0.01em'
      },
      boxShadow: {
        "glow-gold": "0 10px 40px -12px rgba(232, 177, 42, 0.45)",
        "glow-brand": "0 10px 40px -12px rgba(55, 64, 137, 0.45)",
        "soft": "0 8px 30px rgba(20, 24, 56, 0.08)"
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
        "hero-radial":
          "radial-gradient(1200px 500px at 10% -10%, rgba(232,177,42,0.18), transparent 60%), radial-gradient(900px 500px at 90% 10%, rgba(106,119,186,0.35), transparent 60%)"
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      }
    }
  },
  plugins: []
};
