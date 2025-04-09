/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        theme: "#d68e43",
        bg1: "#f7f7fa",
        text: "var(--text)",
        eventtheme: "var(--eventtheme)",
      },
      fontFamily: {
        recline: "Recline",
      },
    },
  },
  plugins: [],
};
