const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com/#google_vignette',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
