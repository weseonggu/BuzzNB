// server.js
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const { query, mutation } = require('./controllers/exchangeController');
const dbConnect = require('./config/mongoDBconnect');
const { formatGraphQLError } = require('./utils/errorHandler');

const schema = new GraphQLSchema({
  query,
  mutation
});

const app = express();

dbConnect();

app.use('/graphql', graphqlHTTP({ 
  schema, 
  graphiql: true,
  customFormatErrorFn: formatGraphQLError
}));

const PORT = 5110;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});