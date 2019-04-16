"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var products = require('./products.json');

var users = require('./member.json');

var _require = require('graphql'),
    buildSchema = _require.buildSchema; // require('babel-core').transform('code', {
//   plugins: ['transform-object-rest-spread'],
// });


var nextId = users.length + 1;
var usersById = {};
var productsById = {};
users.map(function (item) {
  var id = item.id;
  usersById[id] = item;
  return item;
});
products.map(function (item) {
  var id = item.id;
  productsById[id] = item;
  return item;
});

var GraphQLProduct = function GraphQLProduct(_ref) {
  var id = _ref.id,
      title = _ref.title,
      price = _ref.price,
      inventory = _ref.inventory,
      gender = _ref.gender;
  (0, _classCallCheck2.default)(this, GraphQLProduct);
  this.id = id;
  this.price = price;
  this.title = title;
  this.inventory = inventory;
  this.gender = gender;
};

var GraphQLUser =
/*#__PURE__*/
function () {
  function GraphQLUser(_ref2) {
    var id = _ref2.id,
        name = _ref2.name,
        shoppings = _ref2.shoppings;
    (0, _classCallCheck2.default)(this, GraphQLUser);
    this.id = id;
    this.name = name;
    this.shoppingList = shoppings;
    this.shoppings = this.getShoppings();
  }

  (0, _createClass2.default)(GraphQLUser, [{
    key: "getShoppings",
    value: function getShoppings() {
      var shoppingList = (0, _toConsumableArray2.default)(this.shoppingList);
      var userShoppingInfo = [];

      for (var i = 0; i < shoppingList.length; i++) {
        var _shoppingList$i = shoppingList[i],
            productId = _shoppingList$i.productId,
            count = _shoppingList$i.count;
        var infoObj = {};
        infoObj.product = new GraphQLProduct(productsById[productId]);
        infoObj.count = count;
        userShoppingInfo.push(infoObj);
      }

      return userShoppingInfo;
    }
  }]);
  return GraphQLUser;
}();

var querys = {
  users: function users() {
    return Object.keys(usersById).map(function (id) {
      return new GraphQLUser(usersById[id]);
    });
  },
  user: function user(_ref3) {
    var id = _ref3.id;
    return usersById[id] ? new GraphQLUser(usersById[id]) : null;
  },
  products: function products() {
    return Object.keys(productsById).map(function (id) {
      return new GraphQLProduct(productsById[id]);
    });
  },
  product: function product(_ref4) {
    var id = _ref4.id;
    return productsById[id] ? new GraphQLProduct(productsById[id]) : null;
  }
};
var mutations = {
  addUser: function addUser(_ref5) {
    var name = _ref5.name;
    var newUser = {
      id: nextId,
      name: name,
      shoppings: []
    };
    usersById[nextId] = newUser;
    nextId++;
    return new GraphQLUser(newUser);
  },
  renameUser: function renameUser(_ref6) {
    var id = _ref6.id,
        name = _ref6.name;
    usersById[id].name = name;
    return new GraphQLUser(usersById[id]);
  },
  removeUser: function removeUser(_ref7) {
    var id = _ref7.id;
    delete usersById[id];
    return {
      deletedUserId: id
    };
  }
};
exports.schema = buildSchema("\n  type User {\n      id: ID!\n      name: String!\n      shoppings: [Order!]!\n  }\n  type Product {\n      id: ID!\n      price: Int!\n      title: String!\n      inventory: Int!\n      gender: Int!\n  }\n  type Order {\n    product: Product!\n    count: Int!\n  }\n  type RemoveUserPayload {\n    deletedUserId: Int!\n  }\n  type Mutation {\n      addUser(name: String!): User\n      renameUser(id: Int!, name: String!): User\n      removeUser(id: Int!): RemoveUserPayload\n  }\n  type Query {\n    users: [User!]!\n    products: [Product!]!\n    user(id: ID!): User\n    product(id: ID!): Product\n  }\n");
exports.rootValue = (0, _objectSpread2.default)({}, querys, mutations);