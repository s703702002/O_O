import { getRandomItem } from './index'

test('getRandomItem test', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  const amount = 3;
  const randomItem = getRandomItem(arr, amount);

  expect(randomItem.length).toEqual(amount);
  randomItem.forEach(v => {
    expect(arr.includes(v)).toBeTruthy();
  });
})

test('getRandomItem err', () => {
  const arr = [];
  const amount = 3;
  const randomItem = getRandomItem(arr, amount);

  expect(randomItem).toEqual(null);
})

test('故意錯', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  const amount = 3;
  const randomItem = getRandomItem(arr, amount);

  expect(randomItem.length).toEqual(4);
})