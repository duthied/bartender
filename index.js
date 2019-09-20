// based on the tutorial found here:
// https://developer.okta.com/blog/2019/05/29/build-crud-nodejs-graphql

import schema from './types/schema.js';

const { ApolloServer } = require('apollo-server');

const resolvers = require('./resolvers');

const server = new ApolloServer({ typeDefs: schema, resolvers: resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);    // eslint-disable-line no-console
});
