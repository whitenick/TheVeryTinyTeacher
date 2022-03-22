module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    height: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      full: "100%",
      screen: "calc(var(--vh) * 100)",
    }),
    extend: {
      fontFamily: {
        'jim-pam': ['jim-pam'],
        'little-spark': ['little-spark'],
        'boom-roasted': ['boom-roasted'],
      }
    },
    colors: {
      "pink": "#e0a8aaff",
      "white": "#ffffff",
      "powder-blue": "#e9fffeff",
      "sea-green": "#cdd5beff",
      "deep-orange": "#c56f25ff",
    }
  },
  plugins: [],
}
