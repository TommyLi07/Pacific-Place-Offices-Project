/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Tondo: ["Tondo", "sans-serif"],
        PP_Tondo_Signage: ["PP_Tondo_Signage", "sans-serif"],
        Tondo_W01_Signage: ["Tondo_W01_Signage", "sans-serif"],
      },
      colors: {
        DEFAULT: "#000000",
        alabaster: "#f5f1ea",
        barley_corn: "#d9c7ab",
        yellow_metal: "#715e39",
        alice_blue: "#f6f7f9",
      },
      screens: {
        lg: "1180px",
      },
    },
  },
  plugins: [],
};
