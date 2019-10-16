// import spirit from './spirits';
const { gql } = require("apollo-server");

import { typeDef as Spirit } from "./spirit";
import { typeDef as Recipe } from "./recipe";

const all = gql`
  """
  Queries
  """
  type Query {
    spirits: [Spirit]
    spirit(id: ID!): Spirit
    recipes: [Recipe]
    recipe(id: ID!): Recipe
  }

  """
  Mutations
  """
  type Mutation {
    addSpirit(
      name: String!
      type: SpiritType!
      howMuchLeft: String = "0"
    ): Spirit
    editSpirit(
      id: ID!
      name: String!
      type: SpiritType!
      howMuchLeft: String = "0"
    ): Spirit
    deleteSpirit(id: ID!): DeleteResponse
  }

  type DeleteResponse {
    ok: Boolean!
  }
`;

const schema = [Spirit].concat(Recipe).concat(all);

export default schema;
