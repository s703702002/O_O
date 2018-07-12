const products = require('./products.json');
const { buildSchema } = require('graphql');
require('babel-core').transform('code', {
  plugins: ['transform-object-rest-spread'],
});


let nextId = 2;

const usersById = {
  1: {
    id: 1,
    name: 'stanley',
    shoppings: [8, 11, 5],
  },
};

const productsById = {};

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
  constructor({ id, name, shoppings }) {
    this.id = id;
    this.name = name;
    this.shoppingList = shoppings;
    this.shoppings = this.getShoppings();
  }
  getShoppings() {
    const shoppingList = [...this.shoppingList];
    return shoppingList.map(productId => new GraphQLProduct(productsById[productId]));
  }
}

const querys = {
  users: () => Object.keys(usersById).map(id => new GraphQLUser(usersById[id])),
  user: ({ id }) => (usersById[id] ? new GraphQLUser(usersById[id]) : null),
  products: () => Object.keys(productsById).map(id => new GraphQLProduct(productsById[id])),
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
      shoppings: [Product!]!
  }
  type Product {
      id: ID!
      price: Int!
      title: String!
      inventory: Int!
      gender: Int!
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
  }
`);

exports.rootValue = {
  ...querys,
  ...mutations,
};
