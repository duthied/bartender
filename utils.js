import uuid from "uuid/v4";

const spirits = {};
const recipes = {};

// TODO: add unique name check
const addSpirit = spirit => {
  const id = uuid();
  return (spirits[id] = { ...spirit, id });
};

const addRecipe = recipe => {
  const id = uuid();
  return (recipes[id] = { ...recipe, id });
};

// initial spirits
let hendricks = addSpirit({
  name: "Hendrik's Gin",
  type: "GIN",
  howMuchLeft: "50"
});
let havanaClub = addSpirit({
  name: "Havana Club",
  type: "RUM",
  howMuchLeft: "25"
});
// eslint-disable-next-line no-unused-vars
let woodford = addSpirit({ name: "Woodford Reserve", type: "BOURBON" });

addRecipe({
  name: "Mucky-Muck",
  ingredients: [
    {
      spirit: hendricks,
      amount: "2oz"
    },
    {
      spirit: havanaClub,
      amount: "2oz"
    }
  ],
  glass: "COLLINS"
});

module.exports = {
  addSpirit: addSpirit,
  addRecipe: addRecipe,
  spirits: spirits,
  recipes: recipes
};
