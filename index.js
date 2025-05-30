const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLFloat } = require("graphql");

const exchangeInfo = [
  { src: "USD", tgt: "KRW", rate: 1380.30, date: "20250530" },
  { src: "USD", tgt: "KRW", rate: 1371.41	, date: "20250529" },
  { src: "KRW", tgt: "USD", rate: 0.00072, date: "20250530" },
  { src: "KRW", tgt: "USD", rate: 0.00072, date: "20250529" },
];
const ExchangeInfoType = new GraphQLObjectType({
  name: 'ExchangeInfo',
  fields: () => ({
    src: { type: new GraphQLNonNull(GraphQLString) },
    tgt: { type: new GraphQLNonNull(GraphQLString) },
    rate: { type: new GraphQLNonNull(GraphQLFloat) },
    date: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    exchangeInfo: {
      type: new GraphQLList(ExchangeInfoType),
      args: {
        src: { type: new GraphQLNonNull(GraphQLString) },
        tgt: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        return exchangeInfo.filter(
          (item) => item.src === args.src && item.tgt === args.tgt
        );
      },
    },
  },
});


const schema = new GraphQLSchema({
  query: RootQuery,
});

const app = express();

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

const PORT = 5110;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});