const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const { query, mutation } = require('./controllers/exchangeController');

const schema = new GraphQLSchema({
  query,
  mutation
});

const app = express();

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

const PORT = 5110;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});