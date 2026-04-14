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
        }
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 90px rgba(245, 78, 134, 0.25)"
      },
      backgroundImage: {
        "mesh-dark":
          "radial-gradient(circle at top left, rgba(244, 114, 182, 0.18), transparent 28%), radial-gradient(circle at top right, rgba(96, 165, 250, 0.16), transparent 25%), linear-gradient(180deg, #020617 0%, #0f172a 48%, #111827 100%)"
      }
    }
  },
  plugins: []
};
