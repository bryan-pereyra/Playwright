const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  retries: 1, // Failed tests will execute n times
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
        ...devices['iPhone 13'] // Mobile view
      },
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        // viewport: { width: 720, height: 720 }, // Web responsive purposes
        ignoreHTTPSErrors: true // SSL Certification (No Https Web)
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure'
      },
    }
  ]
});