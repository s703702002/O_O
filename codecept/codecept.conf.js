exports.config = {
  tests: '../__e2e__/**/**.test.js',
  output: '../report',
  helpers: {
    WebDriver: {
      url: 'http://localhost:4444',
      browser: 'chrome',
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
