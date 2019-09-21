// const resolvers = require('../resolvers');
import resolvers from '../resolvers';
import expectExport from 'expect';
import { async } from '../../../../Library/Caches/typescript/3.6/node_modules/rxjs/internal/scheduler/async';
import { split } from 'apollo-link';

describe('Spirits', () => {

  const spiritCount = 3;  // currently the resolvers add 3 spirits
  const spirit = { 
    name: "Test Booze", 
    type: "GIN", 
    howMuchLeft: "50"
  };

  it('returns a list of spirits', async () => {
    const res = await resolvers.Query.spirits();
    expect(res.length).toEqual(spiritCount);
  });

  it('creates a new spirit', async () => {
    const resId = await resolvers.Mutation.addSpirit(spirit);
    expect(resId).not.toBe(null);
  });

  it('fetches a spirit by id', async () => {
    const allSpirits = await resolvers.Query.spirits();
    const spirit = allSpirits[0];

    const resSpirit = await resolvers.Query.spirit(null, { id: spirit.id });
    expect(resSpirit).toEqual(spirit);
  });

  it('returns the correct error when it cannot lookup a spirit', async () => {

    const allSpirits = await resolvers.Query.spirits();
    const spirit = allSpirits[0];

    await expect(resolvers.Query.spirit(null, { id: "does-not-exist" }))
      .rejects
      .toThrow("Spirit doesn't exist");
  });

  it('deletes a spirit', async () => {});
  it('edits a spirit', async () => {});

});