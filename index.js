// based on the tutorial found here:
// https://developer.okta.com/blog/2019/05/29/build-crud-nodejs-graphql

const { ApolloServer, gql } = require('apollo-server');
const uuid = require('uuid/v4');

// this _must_ be called 'typeDefs' or the call to instaniate the
// ApolloServer errors out - wha?
const typeDefs = gql`
  type Quote {
    id: ID!
    phrase: String!
    quotee: String
  }

  type Query {
    quotes: [Quote]
  }

  type Mutation {
    addQuote(phrase: String!, quotee: String): Quote
    editQuote(id: ID!, phrase: String, quotee: String): Quote
    deleteQuote(id: ID!): DeleteResponse
  }

  type DeleteResponse {
    ok: Boolean!
  }
`;

const quotes = {};
const addQuote = quote => {
  const id = uuid();
  return quotes[id] = { ...quote, id };
}
// const deleteQuote
// const editQuote

// initial quotes
addQuote({ phrase: "I'm a leaf on the wind.  Watch how I soar", quotee: "Wash"});
addQuote({ phrase: "We're all stories in the end.", quotee: "The Doctor"});
addQuote({ phrase: "Woah!", quotee: "Neo"});

const resolvers = {
  Query: {
    quotes: () => Object.values(quotes),
  },
  Mutation: {
    addQuote: async (parent, quote) => {
      return addQuote(quote);
    },
    editQuote: async (parent, { id, ...quote }) => {
      if (!quotes[id]) {
        throw new Error("Quote doesn't exist");
      }
      // I don't understand why I can't just
      // edit the quote at the index 'id'?
      quotes[id] = {
        ...quotes[id],
        ...quote,
      };

      return quotes[id];
    },
    deleteQuote: async (parent, { id }) => {
      const ok = Boolean(quotes[id]);
      delete quotes[id];

      return { ok };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);    // eslint-disable-line no-console
});
