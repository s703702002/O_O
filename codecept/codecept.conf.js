exports.config = {
  tests: '../__e2e__/**/**.test.js',
  output: '../report',
  helpers: {
    EyesHelper: { require: './helper/eyesHelper.js' },
    WebDriver: {
      url: 'http://localhost:4444',
      browser: 'chrome',
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
};
