const common = require("./jest-common");

const config = {
  ...common,
  displayName: "client",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};

module.exports = config;
