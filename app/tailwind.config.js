module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
  ],
  h1: {
    fontFamily: 'lobster'
  },
  a: {
    fontFamily: 'marion'
  },
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
        'marion': ['marion'],
        'lobster': ['lobster']
      },
      colors: {
        "pink": {
          DEFAULT: "#e3c7b9",
          100: "#fdfafa"
        },
        "white": "#ffffff",
        "powder-blue": "#e9fffeff",
        "sky-blue": "#00c9fd",
        "sea-green": "#cdd5beff",
        "deep-orange": "#c56f25ff",
        "forest-green": "#73A276",
        "mint-cream": "#EFF8F0",
        "bone": "#FDFBFA"
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
