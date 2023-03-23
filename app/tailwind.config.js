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
        'marion': ['marion']
      }
    },
    colors: {
      "pink": "#e3c7b9",
      "white": "#ffffff",
      "powder-blue": "#e9fffeff",
      "sky-blue": "#00c9fd",
      "sea-green": "#cdd5beff",
      "deep-orange": "#c56f25ff",
      "forest-green": "#73A276",
      "mint-cream": "#EFF8F0"
    }
  },
  plugins: [],
}
