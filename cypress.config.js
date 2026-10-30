const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  retries: { runMode: 2, openMode: 0 },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    baseUrl: "https://automationexercise.com",
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
