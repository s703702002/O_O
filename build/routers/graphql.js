"use strict";

var graphqlHTTP = require('express-graphql');

var _require = require('../api/GraphQLSchema'),
    schema = _require.schema,
    rootValue = _require.rootValue;

function gqlSetUp() {
  return graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true
  });
}

module.exports = gqlSetUp;