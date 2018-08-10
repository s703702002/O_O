export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export { default } from './click_outside';

function serialize(obj) {
  const str = Object.entries(obj).map(item => `${encodeURIComponent(item[0])}=${encodeURIComponent(item[1])}`);
  return str.join('&');
}

function queryToObj(queryString) {
  return JSON.parse('{"' + decodeURI(queryString.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
}

function getRandomItem(arr, amount) {
  if (!arr.length) return;
  const copy = arr.slice();
  const result = [];
  for (let i = 0; i < copy.length; i++) {
    if (result.length === amount) break;
    if (Math.random() > 0.4) {
      result.push(copy[i]);
    }
  }
  return result;
}

const clone = target => JSON.parse(JSON.stringify(target));

export { serialize, queryToObj, clone, getRandomItem };
