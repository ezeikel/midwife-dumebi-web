/* eslint-disable global-require */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        catamaran: ["catamaran", "sans-serif"],
        "bennet-banner": ["bennet-banner", "sans-serif"],
      },
      backgroundImage: {
        hero: "url('/images/black-woman-pregnant.svg')",
      },
      colors: {
        peach: "#E69882",
      },
    },
  },
};
