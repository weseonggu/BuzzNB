const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLNonNull, GraphQLInputObjectType } = require('graphql');

const ExchangeInfoType = new GraphQLObjectType({
  name: 'ExchangeInfo',
  fields: () => ({
    src: { type: new GraphQLNonNull(GraphQLString) },
    tgt: { type: new GraphQLNonNull(GraphQLString) },
    rate: { type: new GraphQLNonNull(GraphQLFloat) },
    date: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const InputUpdateExchangeInfo = new GraphQLInputObjectType({
    name: 'InputUpdateExchangeInfo',
    fields: {
      src: { type: new GraphQLNonNull(GraphQLString) },
      tgt: { type: new GraphQLNonNull(GraphQLString) },
      rate: { type: new GraphQLNonNull(GraphQLFloat) },
      date: { type: GraphQLString },
    },
  });

module.exports = { ExchangeInfoType, InputUpdateExchangeInfo };
