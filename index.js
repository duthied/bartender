// based on the tutorial found here:
// https://developer.okta.com/blog/2019/05/29/build-crud-nodejs-graphql

const { ApolloServer, gql } = require('apollo-server');
const uuid = require('uuid/v4');

const schema = gql`
  enum SpiritType {
    GIN
    VODKA
    RUM
    LIQUOR
    TEQUILA
    BOURBON
  }

  type Spirit {
    id: ID!
    name: String!
    type: SpiritType!
  }

  type Query {
    spirits: [Spirit]
  }

  type Mutation {
    addSpirit(name: String!, type: SpiritType!): Spirit
    editSpirit(id: ID!, name: String!, type: SpiritType!): Spirit
    deleteSpirit(id: ID!): DeleteResponse
  }

  type DeleteResponse {
    ok: Boolean!
  }
    
`;

const spirits = {};

// TODO: add unique name check
const addSpirit = spirit => {
  const id = uuid();
  return spirits[id] = { ...spirit, id };
}

// initial spirits
addSpirit({ name: "Hendrik's Gin", type: "GIN" });
addSpirit({ name: "Havana Club", type: "RUM" });
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
