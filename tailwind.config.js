/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      screens: {
        sm: "420px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontSize: {
        xs: "16px",
        sm: "24px",
        md: "32px",
        lg: "40px",
      },
      boxShadow: {
        "card-shadow": "0px -1px 0px 1px rgba(101, 85, 131, 0.6)",
      },
      borderRadius: {
        lg: "12px",
      },

      container: {
        center: true,
        padding: "16px",
      },
      colors: {},
      backgroundImage: {
        "bg-main": "url('/imgs/bg.png')",
      },
    },
  },
  plugins: [],
};
