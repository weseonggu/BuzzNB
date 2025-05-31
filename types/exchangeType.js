const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLNonNull, GraphQLInputObjectType } = require('graphql');

// 조회용
const ExchangeInfoType = new GraphQLObjectType({
  name: 'ExchangeInfo',
  fields: () => ({
    src: { type: new GraphQLNonNull(GraphQLString) },
    tgt: { type: new GraphQLNonNull(GraphQLString) },
    rate: { type: new GraphQLNonNull(GraphQLFloat) },
    date: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

// 업데이트용 
const InputUpdateExchangeInfo = new GraphQLInputObjectType({
    name: 'InputUpdateExchangeInfo',
    fields: {
      src: { type: new GraphQLNonNull(GraphQLString) },
      tgt: { type: new GraphQLNonNull(GraphQLString) },
      rate: { type: new GraphQLNonNull(GraphQLFloat) },
      date: { type: GraphQLString },
    },
  });

// 삭제용
const InputDeleteExchangeInfo = new GraphQLInputObjectType({
  name: 'InputDeleteExchangeInfo',
  fields: {
    src: { type: new GraphQLNonNull(GraphQLString) },
    tgt: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
  },
});

module.exports = { 
  ExchangeInfoType, 
  InputUpdateExchangeInfo,
  InputDeleteExchangeInfo 
};
