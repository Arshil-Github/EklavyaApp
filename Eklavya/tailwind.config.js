/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        beautyChaos: {
          purple: "#6A0DAD",
          orange: "#FF4500",
          turquoise: "#40E0D0",
          red: "#DC143C",
          blue: "#7DF9FF",
          green: "#32CD32",
          gray: "#808080",
          black: "#2E2E2E",
        },
        country: {
          green: "#797D62",
          lightgreen: "#9B9B7A",
          lightbrown: "#D9AE94",
          lightyellow: "#F1DCA7",
          yellow: "#FFCB69",
          orange: "#D08C60",
          brown: "#997B66",
        },
        text: "#090809",
        background: "#fbfbfc",
        primary: "#7b768e",
        secondary: "#bab6c6",
        accent: "#938cab",
        success: "#43e777",
        error: "#f7876b",
        warning: "#f7edae",
      },
      fontSize: {
        sm: "0.750rem",
        base: "1rem",
        xl: "1.333rem",
        "2xl": "1.777rem",
        "3xl": "2.369rem",
        "4xl": "3.158rem",
        "5xl": "4.210rem",
      },
      fontFamily: {
        heading: "Geist",
        body: "Nunito Sans",
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
    },
  },
  plugins: [],
};
