import {
  getRandomItem,
  queryToObj,
} from '../../src/utilis'

test('getRandomItem test', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  const amount = 3;
  const randomItem = getRandomItem(arr, amount);

  expect(randomItem.length).toEqual(amount);
  randomItem.forEach(v => {
    expect(arr.includes(v)).toBeTruthy();
  });
});

test('getRandomItem err', () => {
  const arr = [];
  const amount = 3;
  const randomItem = getRandomItem(arr, amount);

  expect(randomItem).toBeNull();
});

test('queryToObj', () => {
  const mockQuery = '?a=a&b=b&c=c';
  const queryObj = queryToObj(mockQuery);
  
  expect(queryObj).toBeInstanceOf(Object);
  expect(queryObj.a).toBe('a');
  expect(queryObj.b).toBe('b');
  expect(queryObj.c).toBe('c');
  expect(queryObj.foo).toBeUndefined();
})