const cors = require('cors');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { schema, rootValue } = require('./api/GraphQLSchema');

const app = express();

app.use(cors());
app.use('/', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

app.listen(3000);
