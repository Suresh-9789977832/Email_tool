/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        voilet: "#8C5CB3",
        blur: "rgba(255,255,255,0.8)",
        darkblue: "#0D6EFD"
      },
      screens: {
        '3md': "769px",
        '3sm': "376px",
        '3mdd': "426px",
        '3lg': "1441px",
        '3llg': "1025px",
        '3ssm':"321px"
      }
    },
  },
  plugins: [require("daisyui")],
}