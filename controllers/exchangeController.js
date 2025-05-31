const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString } = require('graphql');
const exchangeService = require('../services/exchangeService');
const { ExchangeInfoType, InputUpdateExchangeInfo } = require('../types/exchangeType');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getExchangeRate: {
      type: new GraphQLList(ExchangeInfoType),
      args: {
        src: { type: new GraphQLNonNull(GraphQLString) },
        tgt: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        return exchangeService.getExchangeInfo(args.src, args.tgt);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    postExchangeRate: {
      type: ExchangeInfoType,
      args: {
        info: { type: InputUpdateExchangeInfo }
      },
      resolve: (parent, args) => {
        return exchangeService.updateExchangeRate(args.info);
      }
    }
  }
});

module.exports = {
  query: RootQuery,
  mutation: Mutation
};