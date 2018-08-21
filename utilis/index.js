import createBrowserHistory from 'history/createBrowserHistory';

const clone = target => JSON.parse(JSON.stringify(target));

const history = createBrowserHistory();

function serialize(obj) {
  const str = Object.entries(obj).map(item => `${encodeURIComponent(item[0])}=${encodeURIComponent(item[1])}`);
  return str.join('&');
}

function queryToObj(queryString) {
  return JSON.parse('{"' + decodeURI(queryString.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
}

function getRandomItem(arr, amount) {
  if (!arr.length) return null;
  const copy = arr.slice();
  const result = [];
  for (let i = 0; i < amount; i++) {
    const initLenght = copy.length;
    const random = Math.floor(Math.random() * initLenght);
    const takeItem = copy.splice(random, 1);
    result.push(...takeItem);
  }

  return result;
}

function pushHistory(
  // history,
  queryObj,
) {
  let { search } = history.location;
  const { page } = queryObj;
  if (!search.length) {
    search = '?sort=desc';
  }
  const queryObject = queryToObj(search);
  const newQueryObj = {
    ...queryObject,
    ...queryObj,
  };
  if (newQueryObj.minPrice === '') delete newQueryObj.minPrice;
  if (newQueryObj.maxPrice === '') delete newQueryObj.maxPrice;
  if (page !== undefined) {
    // 如果有變更page就不reset
    newQueryObj.page = page;
  } else {
    // 每次變更條件都reset頁數回0
    newQueryObj.page = 0;
  }
  const newQuery = `?${serialize(newQueryObj)}`;
  history.push(newQuery);
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export { default } from './ClickOutside';
export {
  serialize,
  queryToObj,
  clone,
  getRandomItem,
  pushHistory,
  history,
};
