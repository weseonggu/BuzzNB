const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString } = require('graphql');
const exchangeService = require('../services/exchangeService');
const { 
  ExchangeInfoType, 
  InputUpdateExchangeInfo,
  InputDeleteExchangeInfo 
} = require('../types/exchangeType');

/**
 * 환율 정보 조회
 */
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getExchangeRate: {
      type: ExchangeInfoType,
      args: {
        src: { type: new GraphQLNonNull(GraphQLString) },
        tgt: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        return await exchangeService.getExchangeInfo(args.src, args.tgt);
      },
    },
  },
});

/**
 * 환율 정보 업데이트, 삭제
 */
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    postExchangeRate: {// 업데이트
      type: ExchangeInfoType,
      args: {
        info: { type: InputUpdateExchangeInfo }
      },
      resolve: async (parent, args) => {
        return await exchangeService.updateExchangeRate(args.info);
      }
    },
    deleteExchangeRate: {// 삭제
      type: ExchangeInfoType,
      args: {
        info: { type: InputDeleteExchangeInfo }
      },
      resolve: async (parent, args) => {
        return await exchangeService.deleteExchangeRate(args.info);
      }
    }
  }
});

module.exports = {
  query: RootQuery,
  mutation: Mutation
};