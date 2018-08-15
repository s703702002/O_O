const products = require('./products.json');
const users = require('./member.json');
const { buildSchema } = require('graphql');
require('babel-core').transform('code', {
  plugins: ['transform-object-rest-spread'],
});


let nextId = users.length + 1;
const usersById = {};
const productsById = {};

users.map((item) => {
  const { id } = item;
  usersById[id] = item;
  return item;
});

products.map((item) => {
  const { id } = item;
  productsById[id] = item;
  return item;
});

class GraphQLProduct {
  constructor({
    id, title, price, inventory, gender,
  }) {
    this.id = id;
    this.price = price;
    this.title = title;
    this.inventory = inventory;
    this.gender = gender;
  }
}

class GraphQLUser {
  constructor({
    id, name, shoppings,
  }) {
    this.id = id;
    this.name = name;
    this.shoppingList = shoppings;
    this.shoppings = this.getShoppings();
  }
  getShoppings() {
    const shoppingList = [...this.shoppingList];
    const userShoppingInfo = [];
    for (let i = 0; i < shoppingList.length; i++) {
      const { productId, count } = shoppingList[i];
      const infoObj = {};
      infoObj.product = new GraphQLProduct(productsById[productId]);
      infoObj.count = count;
      userShoppingInfo.push(infoObj);
    }
    return userShoppingInfo;
  }
}

const querys = {
  users: () => Object.keys(usersById).map(id => new GraphQLUser(usersById[id])),
  user: ({ id }) => (usersById[id] ? new GraphQLUser(usersById[id]) : null),
  products: () => Object.keys(productsById).map(id => new GraphQLProduct(productsById[id])),
  product: ({ id }) => (productsById[id] ? new GraphQLProduct(productsById[id]) : null),
};

const mutations = {
  addUser: ({ name }) => {
    const newUser = {
      id: nextId,
      name,
      shoppings: [],
    };
    usersById[nextId] = newUser;
    nextId++;
    return new GraphQLUser(newUser);
  },
  renameUser: ({ id, name }) => {
    usersById[id].name = name;
    return new GraphQLUser(usersById[id]);
  },
  removeUser: ({ id }) => {
    delete usersById[id];
    return {
      deletedUserId: id,
    };
  },
};

exports.schema = buildSchema(`
  type User {
      id: ID!
      name: String!
      shoppings: [Order!]!
  }
  type Product {
      id: ID!
      price: Int!
      title: String!
      inventory: Int!
      gender: Int!
  }
  type Order {
    product: Product!
    count: Int!
  }
  type RemoveUserPayload {
    deletedUserId: Int!
  }
  type Mutation {
      addUser(name: String!): User
      renameUser(id: Int!, name: String!): User
      removeUser(id: Int!): RemoveUserPayload
  }
  type Query {
    users: [User!]!
    products: [Product!]!
    user(id: ID!): User
    product(id: ID!): Product
  }
`);

exports.rootValue = {
  ...querys,
  ...mutations,
};
