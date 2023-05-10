const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  /* Maximun time one test can run for */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  /* Shared settings for all the projects below */
  use: {
    browserName: 'chromium',
    headless: false,
    trace: 'on-first-retry',
    screenshot: 'on',
    trace: 'on'
  },
});