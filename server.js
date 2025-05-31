const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const { query, mutation } = require('./controllers/exchangeController');

const schema = new GraphQLSchema({
  query,
  mutation
});

const app = express();

// GraphQL 에러 포맷팅 함수
const customFormatErrorFn = (error) => {
  const originalError = error.originalError;
  
  return {
    message: originalError?.message || error.message,
    path: error.path,
    extensions: {
      code: originalError?.code || 'INTERNAL_SERVER_ERROR',
      timestamp: new Date().toISOString()
    }
  };
};

app.use('/graphql', graphqlHTTP({ 
  schema, 
  graphiql: true,
  customFormatErrorFn
}));

const PORT = 5110;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});