// based on the tutorial found here:
// https://developer.okta.com/blog/2019/05/29/build-crud-nodejs-graphql

import schema from './types/schema.js';

const { ApolloServer } = require('apollo-server');
const uuid = require('uuid/v4');

const spirits = {};

// TODO: add unique name check
const addSpirit = spirit => {
  const id = uuid();
  return spirits[id] = { ...spirit, id };
}

// initial spirits
addSpirit({ name: "Hendrik's Gin", type: "GIN", howMuchLeft: "50" });
addSpirit({ name: "Havana Club", type: "RUM",howMuchLeft: "25" });
addSpirit({ name: "Woodford Reserve", type: "BOURBON" });

const resolvers = {
  Query: {
    spirits: () => Object.values(spirits),
  },
  Mutation: {
    addSpirit: async (parent, spirit) => {
      return addSpirit(spirit);
    },
    editSpirit: async (parent, { id, ...spirit }) => {
      if (!spirits[id]) {
        throw new Error("Spirit doesn't exist");
      }
      // I don't understand why I can't just
      // edit the spirit at the index 'id'?
      spirits[id] = {
        ...spirits[id],
        ...spirit,
      };

      return spirits[id];
    },
    deleteSpirit: async (parent, { id }) => {
      const ok = Boolean(spirits[id]);
      delete spirits[id];

      return { ok };
    },
  },
};

const server = new ApolloServer({ typeDefs: schema, resolvers: resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);    // eslint-disable-line no-console
});
