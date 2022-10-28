const path = require("path");

const config = {
  rootDir: path.join(__dirname, ".."),
  moduleNameMapper: {
    "\\.css$": require.resolve("./style-mock.js"),
  },
  watchPlugins: [
    "jest-watch-select-projects",
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};

module.exports = config;
