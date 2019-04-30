import "isomorphic-fetch"
import {
  loginAPI,
  getAllProductsAPI,
  getProductAPI,
} from '../../src/api';

const mockUser = {
  id: 1,
  name: 'stanley',
  shoppings: [{
    "productId": 8,
    "count": 2
  },{
    "productId": 6,
    "count": 1
  }]
};

const mockProduct = [
  {"id":0,"title":"商品0","price":6777,"inventory":84,"gender":0},
  {"id":1,"title":"商品1","price":1615,"inventory":66,"gender":1},
  {"id":2,"title":"商品2","price":3359,"inventory":11,"gender":1},
  {"id":3,"title":"商品3","price":8453,"inventory":50,"gender":0},
  {"id":4,"title":"商品4","price":2081,"inventory":4,"gender":1},
  {"id":5,"title":"商品5","price":1066,"inventory":6,"gender":0},
  {"id":6,"title":"商品6","price":5013,"inventory":85,"gender":0},
  {"id":7,"title":"商品7","price":5827,"inventory":34,"gender":1},
  {"id":8,"title":"商品8","price":519,"inventory":92,"gender":1},
  {"id":9,"title":"商品9","price":3551,"inventory":91,"gender":1},
  {"id":10,"title":"商品10","price":2699,"inventory":35,"gender":0}
];

const mockGetProductById = (productId) => 
  () => Promise.resolve({
    json: () => {
      const product = mockProduct.find(ele => ele.id === productId);
      return Promise.resolve(
        product ?
          { data: product } :
          { data: null }
      )
    }
  });

it('[getAllProductsAPI] test', (done) => {
  global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({
      data: mockProduct
    })
  }));
  getAllProductsAPI()
    .then(data => {
      expect(data.length).toEqual(mockProduct.length);
      expect(global.fetch).toHaveBeenCalledTimes(1);
      done();
    })
});

it('[getProductAPI] testProductId 10', (done) => {
  const testProductId = 10;
  global.fetch = jest.fn().mockImplementation(mockGetProductById(testProductId));
  getProductAPI({ productId: testProductId })
    .then(data => {
      expect(data.id).toEqual(testProductId);
      expect(data.title).toEqual('商品10');
      expect(global.fetch).toHaveBeenCalledTimes(1);
      done();
    })
});

it('[getProductAPI] testProductId 20', (done) => {
  const testProductId = 20;
  global.fetch = jest.fn().mockImplementation(mockGetProductById(testProductId));
  getProductAPI({ productId: testProductId })
    .then(data => {
      expect(data).toBeNull();
      expect(global.fetch).toHaveBeenCalledTimes(1);
      done();
    })
});


