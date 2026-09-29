/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // NEXT GEN palette — deep navy/indigo canvas with rich violet accent.
        // "brand" = navy → indigo structural color.
        brand: {
          50:  "#eceefb",
          100: "#d6daf6",
          200: "#adb4ec",
          300: "#828cde",
          400: "#5c67cf",
          500: "#4a53bd",
          600: "#3b429e",
          700: "#2e3480",
          800: "#212560",
          900: "#141737",
          950: "#0a0b22"
        },
        // "gold" key is repurposed as the violet/purple ACCENT so existing
        // classes across the app map onto the NEXT GEN accent automatically.
        gold: {
          50:  "#f1eefe",
          100: "#e5dffd",
          200: "#ccc0fb",
          300: "#ad9bf6",
          400: "#8b74ef",
          500: "#7857e6",
          600: "#663ed6",
          700: "#5730b4",
          800: "#472a90",
          900: "#312069"
        },
        // "ink" = INVERTED neutral scale (lavender-tinted) so low numbers are
        // dark surfaces/borders and high numbers are light text — designed for
        // a dark UI.
        ink: {
          50:  "#0c0e26",
          100: "#151834",
          200: "#232750",
          300: "#333a6e",
          400: "#5b64a0",
          500: "#8b93c4",
          600: "#aab1dc",
          700: "#c9cef0",
          800: "#e4e7fb",
          900: "#f4f5ff"
        },
        accent: {
          violet: "#8b74ef",
          indigo: "#5c67cf",
          glow: "#7857e6"
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Manrope"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Space Grotesk"', '"Sora"', '"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // serif key mapped to the modern display font so any legacy usage stays clean
        serif: ['"Space Grotesk"', '"Sora"', '"Inter"', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      letterSpacing: {
        'display': '-0.02em',
        'display-wide': '-0.01em'
      },
      boxShadow: {
        "glow-gold": "0 18px 50px -12px rgba(120, 87, 230, 0.55)",
        "glow-brand": "0 18px 50px -14px rgba(92, 103, 207, 0.45)",
        "glow-violet": "0 0 0 1px rgba(139,116,239,0.18), 0 20px 60px -18px rgba(120,87,230,0.55)",
        "soft": "0 10px 40px rgba(4, 6, 20, 0.45)"
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(139,116,239,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,116,239,0.08) 1px, transparent 1px)",
        "hero-radial":
          "radial-gradient(1200px 520px at 12% -8%, rgba(120,87,230,0.28), transparent 60%), radial-gradient(900px 520px at 88% 8%, rgba(92,103,207,0.30), transparent 60%)",
        "violet-grad": "linear-gradient(135deg, #5c67cf 0%, #7857e6 50%, #8b74ef 100%)",
        "brand-grad": "linear-gradient(135deg, #141737 0%, #2e3480 55%, #5730b4 100%)"
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "fade-in": "fadeIn 0.7s ease-out both",
        "fade-up": "fadeUp 0.7s ease-out both",
        "glow-pulse": "glowPulse 6s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.9" }
        }
      }
    }
  },
  plugins: []
};
