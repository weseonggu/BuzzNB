// server.js
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const { query, mutation } = require('./controllers/exchangeController');
const dbConnect = require('./config/mongoDBconnect');
const { formatGraphQLError } = require('./utils/errorHandler');
const logger = require('./middleware/logger');

const schema = new GraphQLSchema({
  query,
  mutation
});

const app = express();

// body-parser 미들웨어 추가
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 로깅 미들웨어 적용
app.use(logger);

dbConnect();

// GraphQL 엔드포인트 설정
app.use('/graphql', (req, res, next) => {
  // GET 요청의 경우 쿼리 파라미터를 body로 변환
  if (req.method === 'GET' && req.query.query) {
    req.body = {
      query: req.query.query,
      variables: req.query.variables ? JSON.parse(req.query.variables) : {}
    };
  }
  next();
}, graphqlHTTP({ 
  schema, 
  graphiql: true,
  customFormatErrorFn: formatGraphQLError
}));

const PORT = 5110;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});