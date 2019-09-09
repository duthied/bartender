const  { gql} = require('apollo-server');

// TODO create an interface so an ingrediant can be a Spirit or mix/liquor, etc.
export const typeDef = gql`
  enum GlassType {
    COLLINS
    HIGHBALL
    COUPE
    MARTINI
  }

  type Ingredient {
    spirit: Spirit!
    amount: String!
  }

  type Recipe {
    id: ID!
    name: String!
    ingredients: [Ingredient]
    glass: GlassType!
    garnish: String
  }
`;