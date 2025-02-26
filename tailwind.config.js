/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#0061FF",
          200: "#0061FF1A",
          300: "#0061FF0D",
        },
        accent: {
          100: "#E8ECF4",
        },
        black: {
          DEFAULT: "#20232A",
          100: "#8C8E98",
          200: "#6B7280",
          300: "#33373E",
        },

        primaryBlue: "#0286FF",

        lamaSky: "#C3EBFA",
        lamaSkyLight: "#EDF9FD",

        purpleColor: "#8B5DFF",
        lamaPurple: "#CFCEFF",
        lamaPurpleLight: "#F1F0FF",

        lamaYellowLight: "#FEFCE8",
        lamaYellow: "#FAE27C",

        danger: "#F75555",
      },
    },
  },
  plugins: [],
};
