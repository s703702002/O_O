// Doc: https://codecept.io/helpers/WebDriverIO/#waitforelement

const { I } = inject();

Feature('My App Test');

Scenario('App 首頁', async () => {
  I.say('Hello World');
  I.amOnPage('/');
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
});

Scenario('query string', async () => {
  I.amOnPage('/?sort=asc&page=0&gender=female&minPrice=100&maxPrice=200');
  I.see('商品1053');
  I.seeInField('minPrice', 100);
  I.seeInField('maxPrice', 200);
});

Scenario('login test', async () => {
  I.amOnPage('/')
  I.click('登入');
  I.see('0000');
  I.appendField('#account', 'stanley');
  I.appendField('#password', '0000');
  I.pressKey('Enter');
  I.see('取消登入');

  // wait .count for 5s
  I.waitForElement('.count', 5);
  I.see('stanley');
  I.see('登出');

  // login status still valid after refreshPage
  I.refreshPage();
  I.see('stanley');
});