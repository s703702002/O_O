// webDriverIo API: https://webdriver.io/docs/api/browser/$.html

// async function main() {
//   const webdriverio = require('webdriverio');

//   // Open a Chrome browser.
//   const browserOptions = {
//     remoteHost: 'http://localhost:4444',
//     desiredCapabilities: {
//       browserName: 'chrome',
//       chromeOptions: {
//         args: [
//           'disable-infobars',
//         ],
//       },
//     },
//   };
//   const driver = webdriverio.remote(browserOptions);
//   const browser = driver.init();

//   // Initialize the eyes SDK and set your private API key.
//   const { Eyes, Target } = require('@applitools/eyes.webdriverio');
//   const eyes = new Eyes();
//   eyes.setApiKey(process.env.EYES_KEY);

//   try {
//     // Start the test and set the browser's viewport size to 800x600.
// await eyes.open(
//   browser,
//   'Test O_O Web',
//   'My first WebdriverIO test!',
//   { width: 1440, height: 1200 }
// );
//     await browser.url('http://localhost:8888/');

//     // Visual checkpoint #1.
//     await eyes.check('Main Page', Target.window());

//     // Click the "Click me!" button.
//     const femaleRadio = $('[label="femaleRadio"]');
//     await femaleRadio.click();

//     // Visual checkpoint #2.
//     await eyes.check('Click!', Target.window());

//     // End the test.
//     await eyes.close();
//   } finally {
//     // Close the browser.
//     await browser.end();

//     // If the test was aborted before eyes.close was called ends the test as aborted.
//     await eyes.abortIfNotClosed();
//   }
// }

// main();
