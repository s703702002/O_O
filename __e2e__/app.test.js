
Feature('My App Test');

Scenario('test App', (I) => {
  I.say('Hello World');
  I.amOnPage('http://localhost:8888/');
  I.see('Happy');
  I.see('pleas Login');
  I.see('登入');
});
