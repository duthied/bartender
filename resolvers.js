import uuid from 'uuid/v4';

const spirits = {};
const recipes = {};
// const uuid = require('uuid/v4');

// TODO: add unique name check
const addSpirit = spirit => {
  const id = uuid();
  return spirits[id] = { ...spirit, id };
}

const addRecipe = recipe => {
  const id = uuid();
  return recipes[id] = { ...recipe, id };
}
// initial spirits
let hendricks = addSpirit({ name: "Hendrik's Gin", type: "GIN", howMuchLeft: "50" });
let havanaClub = addSpirit({ name: "Havana Club", type: "RUM",howMuchLeft: "25" });
// eslint-disable-next-line no-unused-vars
let woodford = addSpirit({ name: "Woodford Reserve", type: "BOURBON" });

addRecipe({ name: "Mucky-Muck", ingredients: [{ spirit: hendricks, amount: "2oz" }, { spirit: havanaClub, amount: "2oz" }], glass: "COLLINS" });

module.exports = {
    Query: {
      spirits: () => Object.values(spirits),
      recipes: () => Object.values(recipes),
    },
    Mutation: {
      addSpirit: async (parent, spirit) => {
        return addSpirit(spirit);
      },
      editSpirit: async (parent, { id, ...spirit }) => {
        if (!spirits[id]) {
          throw new Error("Spirit doesn't exist");
        }
        
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
  