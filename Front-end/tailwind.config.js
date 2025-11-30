/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
      screens: {
        DEFAULT: "1372px",
      },
    },
    extend: {
      colors: {
        mblack: "#000000",
        primary: "#722ED1 ",
        footer: "#160637",
        mgray: "#8989A2",
      },
      keyframes: {
        bounce2: {
          "0% ": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-30px)" },
        },
      },
      animation: {
        bounce2: "bounce2 3s ease infinite",
      },
    },
  },
  plugins: [],
};
