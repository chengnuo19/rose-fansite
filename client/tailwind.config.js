/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fff7fa",
          100: "#ffe8f0",
          200: "#ffcddd",
          300: "#ffa6c1",
          400: "#ff73a2",
          500: "#f54e86",
          600: "#de2d68"
        },
        aurora: {
          100: "#dff7ff",
          200: "#a9e8ff",
          300: "#6fd3ff",
          400: "#39b8ff"
        },
        lilac: {
          100: "#f1e7ff",
          200: "#dcc3ff",
          300: "#c39aff",
          400: "#a970ff"
        },
        gold: {
          100: "#fff4d6",
          200: "#ffe3a1",
          300: "#ffcf68",
          400: "#f6b73c"
        }
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 90px rgba(245, 78, 134, 0.25)",
        aurora: "0 26px 100px rgba(57, 184, 255, 0.18)"
      },
      backgroundImage: {
        "mesh-dark":
          "radial-gradient(circle at top left, rgba(244, 114, 182, 0.18), transparent 28%), radial-gradient(circle at top right, rgba(96, 165, 250, 0.16), transparent 25%), linear-gradient(180deg, #020617 0%, #0f172a 48%, #111827 100%)",
        "mesh-vivid":
          "radial-gradient(circle at 8% 12%, rgba(244, 114, 182, 0.24), transparent 24%), radial-gradient(circle at 88% 10%, rgba(57, 184, 255, 0.2), transparent 20%), radial-gradient(circle at 76% 68%, rgba(169, 112, 255, 0.16), transparent 22%), radial-gradient(circle at 20% 82%, rgba(246, 183, 60, 0.14), transparent 18%), linear-gradient(180deg, #050816 0%, #10172d 45%, #171a2f 100%)"
      }
    }
  },
  plugins: []
};
