"use strict";

var _index = require("./index");

test('getRandomItem test', function () {
  var arr = [1, 2, 3, 4, 5, 6, 7];
  var amount = 3;
  var randomItem = (0, _index.getRandomItem)(arr, amount);
  expect(randomItem.length).toEqual(amount);
  randomItem.forEach(function (v) {
    expect(arr.includes(v)).toBeTruthy();
  });
});
test('getRandomItem err', function () {
  var arr = [];
  var amount = 3;
  var randomItem = (0, _index.getRandomItem)(arr, amount);
  expect(randomItem).toBeNull();
});
test('queryToObj', function () {
  var mockQuery = '?a=a&b=b&c=c';
  var queryObj = (0, _index.queryToObj)(mockQuery);
  expect(queryObj).toBeInstanceOf(Object);
  expect(queryObj.a).toBe('a');
  expect(queryObj.b).toBe('b');
  expect(queryObj.c).toBe('c');
  expect(queryObj.foo).toBeUndefined();
});