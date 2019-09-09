const { gql } = require('apollo-server');

export const typeDef = gql`
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
    howMuchLeft: String
  }
`;
