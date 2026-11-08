/**
 * Tailwind mirrors the DS CSS variables (src/shared/tokens/*.css). Color ramps,
 * radii, shadows, fonts and spacing resolve to `var(--…)` so the :root tokens
 * stay the single source of truth.
 *
 * Exceptions: the domain risk scales (`risk`/`nivel`) are kept as raw hex so the
 * `/opacity` modifier keeps working (Tailwind can't derive an alpha channel from
 * a var that holds a hex). Semantic one-offs (surfaces, text, borders) are used
 * directly as `var(--…)` arbitrary values inside components.
 */
const ramp = (name, stops) =>
  Object.fromEntries(stops.map((s) => [s, `var(--${name}-${s})`]));

module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "var(--white)",
        navy: ramp("navy", [900, 800, 700, 600, 500, 400, 300, 200]),
        blue: ramp("blue", [700, 600, 500, 400, 300, 100, "050"]),
        amber: ramp("amber", [700, 600, 500, 300, 100, "050"]),
        red: ramp("red", [700, 600, 500, 300, 100, "050"]),
        green: ramp("green", [700, 600, 500, 300, 100, "050"]),
        orange: ramp("orange", [700, 600, 500, 300, 100, "050"]),
        violet: ramp("violet", [700, 600, 500, 300, 100, "050"]),
        gray: ramp("gray", [900, 800, 700, 600, 500, 400, 300]),
        surface: {
          DEFAULT: "var(--surface-100)",
          200: "var(--surface-200)",
          card: "var(--surface-card)",
          sunken: "var(--surface-sunken)",
        },
        // Domain risk scale (hex so /opacity works). Keys mirror core RiskLevel.
        risk: {
          aceptable: "#27AE60",
          moderado: "#F0A500",
          importante: "#E2670B",
          intolerable: "#D72638",
        },
        // Línea Base band naming (DS spelling: "intolerante").
        nivel: {
          aceptable: "#27AE60",
          moderado: "#F0A500",
          importante: "#E2670B",
          intolerante: "#D72638",
        },
        // Legacy aliases kept so pre-reskin components still compile; repointed
        // onto DS ramps.
        brand: {
          50: "var(--blue-050)",
          100: "var(--blue-100)",
          300: "var(--blue-300)",
          500: "var(--blue-500)",
          600: "var(--blue-600)",
          700: "var(--blue-700)",
          900: "var(--navy-700)",
        },
        neutral: {
          0: "var(--white)",
          50: "var(--surface-100)",
          100: "var(--surface-200)",
          200: "var(--gray-300)",
          400: "var(--gray-500)",
          600: "var(--gray-600)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        "2xs": "var(--text-2xs)",
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        base: "var(--text-base)",
        md: "var(--text-md)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
        "4xl": "var(--text-4xl)",
        "5xl": "var(--text-5xl)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-md)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-pill)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        inset: "var(--shadow-inset)",
      },
      spacing: {
        sidebar: "var(--sidebar-width)",
        "sidebar-collapsed": "var(--sidebar-width-collapsed)",
        topbar: "var(--topbar-height)",
        rail: "var(--rail-width)",
        gutter: "var(--page-gutter)",
      },
      maxWidth: {
        content: "var(--content-max)",
      },
    },
  },
  plugins: [],
};
