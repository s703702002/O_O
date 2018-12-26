const graphqlHTTP = require('express-graphql');
const { schema, rootValue } = require('../api/GraphQLSchema');

function gqlSetUp() {
  return graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  });
}

module.exports = gqlSetUp;
