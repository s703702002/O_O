exports.config = {
  tests: '../__e2e__/**/**.test.js',
  output: '../report',
  helpers: {
    WebDriver: {
      url: 'http://localhost:8888',
      browser: 'chrome',
      desiredCapabilities: {
        chromeOptions: {
          args: [ "--headless", '--disable-extensions', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage']
        }
      },
      windowSize: '1440x1200',
      "timeouts": {
        "script": 60000,
        "page load": 10000
      },
    },
  },
  include: {
    I: './steps_file.js',
  },
  bootstrap: null,
  mocha: {},
  name: 'O_O',
  translation: 'zh-TW',
  plugins: {
    wdio: {
      enabled: true,
      services: ['selenium-standalone']
    }
  }
};
