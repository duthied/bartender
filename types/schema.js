import spirit from './spirits';

import { typeDef as Spirit } from './types/spirits';

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

const schema = spirit
  .concat(all)

export default schema