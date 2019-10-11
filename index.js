/* eslint-disable no-console */
// based on the tutorial found here:
// https://developer.okta.com/blog/2019/05/29/build-crud-nodejs-graphql

import schema from "./types/schema.js";

const { ApolloServer } = require("apollo-server");

const resolvers = require("./resolvers");

const { print } = require("graphql");

class BasicLogging {
  requestDidStart({ queryString, parsedQuery, variables }) {
    const query = queryString || print(parsedQuery);
    console.log(query);
    console.log(variables);
  }

  willSendResponse({ graphqlResponse }) {
    console.log(JSON.stringify(graphqlResponse, null, 2));
  }
}

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   extensions: [() => new BasicLogging()]
// });

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  extensions: [() => new BasicLogging()]
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`); // eslint-disable-line no-console
});
