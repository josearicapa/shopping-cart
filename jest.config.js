module.exports = {
  testEnvironment: "jsdom",
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "Shopping car - Test Report",
      },
    ],
  ],
};
