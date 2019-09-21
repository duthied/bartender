import { spirits, recipes, addSpirit } from './utils';

module.exports = {
    Query: {
      spirits: () => Object.values(spirits),
      spirit: async (_, { id }) => {
        if (!spirits[id]) {
          throw new Error("Spirit doesn't exist");
        }
        return spirits[id];
      },
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
  