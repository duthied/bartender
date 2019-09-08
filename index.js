// based on the tutorial found here:
// https://developer.okta.com/blog/2019/05/29/build-crud-nodejs-graphql

const { ApolloServer, gql } = require('apollo-server');
const uuid = require('uuid/v4');

// const typeDefs = gql`
//   type Quote {
//     id: ID!
//     phrase: String!
//     quotee: String
//   }

//   type Query {
//     quotes: [Quote]
//   }

//   type Mutation {
//     addQuote(phrase: String!, quotee: String): Quote
//     editQuote(id: ID!, phrase: String, quotee: String): Quote
//     deleteQuote(id: ID!): DeleteResponse
//   }

//   type DeleteResponse {
//     ok: Boolean!
//   }
// `;

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
  //   editQuote: async (parent, { id, ...spirit }) => {
  //     if (!spirits[id]) {
  //       throw new Error("Quote doesn't exist");
  //     }
  //     // I don't understand why I can't just
  //     // edit the quote at the index 'id'?
  //     spirits[id] = {
  //       ...spirits[id],
  //       ...spirit,
  //     };

  //     return spirits[id];
  //   },
  //   deleteQuote: async (parent, { id }) => {
  //     const ok = Boolean(spirits[id]);
  //     delete spirits[id];

  //     return { ok };
  //   },
  },
};

const server = new ApolloServer({ typeDefs: schema, resolvers: resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);    // eslint-disable-line no-console
});
