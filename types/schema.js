// import spirit from './spirits';
const { gql } = require('apollo-server');

import { typeDef as Spirit } from './spirits';

const all = gql`
  """
  Queries
  """
  type Query {
    spirits: [Spirit]
  }

  """
  Mutations
  """
  type Mutation {
    addSpirit(name: String!, type: SpiritType!): Spirit
    editSpirit(id: ID!, name: String!, type: SpiritType!): Spirit
    deleteSpirit(id: ID!): DeleteResponse
  }

  type DeleteResponse {
    ok: Boolean!
  }
`;

const schema = [Spirit]
  .concat(all)

export default schema