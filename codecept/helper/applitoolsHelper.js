const { Eyes, Target } = require('@wdio/eyes.webdriverio');
let eyes = new Eyes();
let Helper = codecept_helper;
let windowsSize;
let appName;

class ApplitoolsHelper extends Helper {
  constructor(config) {
    super(config);
    this.config = config;
    eyes.setApiKey(config.applitoolsKey);
    appName = config.appName || 'Application Under Test';
    this.browser = null;
  }

  async _beforeSuite(suite) {
    this.helpers['WebDriver'].config.manualStart = true;
    this.helpers['WebDriver'].options.manualStart = true;
    if (this.config.windowSize) {
      windowsSize = this._getWindowsSize(this.config);
    } else if (this.helpers['WebDriver'].config.windowSize) {
      windowsSize = this._getWindowsSize(this.helpers['WebDriver'].config);
    } else {
      windowsSize = { width: 800, height: 600 };
    }

    this.browser = await this.helpers['WebDriver']._startBrowser();
    await eyes.open(this.browser, appName, suite.title, windowsSize);
  }

  async _afterSuite() {
    try {
      await eyes.close()
    } finally {
      await eyes.abortIfNotClosed()
    }
  }

  _getWindowsSize(config) {
    return { width: parseInt(config.windowSize.split('x')[0], 10), height: parseInt(config.windowSize.split('x')[1], 10) }
  }

  async eyesCheck(pageName) {
    await eyes.check(pageName, Target.window());
  }

}

module.exports = ApplitoolsHelper;