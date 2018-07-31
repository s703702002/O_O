export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export { default } from './click_outside';

function serialize(obj) {
  const str = Object.entries(obj).map(item => `${encodeURIComponent(item[0])}=${encodeURIComponent(item[1])}`);
  return str.join('&');
}

function queryToObj(queryString) {
  return JSON.parse('{"' + decodeURI(queryString.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
}

export { serialize, queryToObj };
