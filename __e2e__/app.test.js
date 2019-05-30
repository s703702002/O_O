// Doc: https://codecept.io/helpers/WebDriverIO/#waitforelement
Feature('My App Test');

Scenario('測試 App 首頁', (I) => {
  I.say('Hello World');
  I.amOnPage('http://localhost:8888/');
  I.see('商品366');
  I.see('Happy');
  I.see('pleas Login');

  I.click('價格: 低至高');
  I.see('商品86');

  I.click('女裝');
  I.see('商品854');

  I.appendField('minPrice', 100);
  I.appendField('maxPrice', 200);
  I.click('篩選價格');
  I.see('商品1053');

  I.click('登入');
  I.see('0000');
  
  I.appendField('#account', 'stanley');
  I.appendField('#password', '0000');
  I.pressKey('Enter');
  I.see('取消登入');
  // wait .count for 5s
  I.waitForElement('.count', 5);
  I.see('2');
  I.see('登出');

  // login status still valid after refreshPage
  I.refreshPage();
  I.see('2');
});
