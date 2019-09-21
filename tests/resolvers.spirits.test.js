// const resolvers = require('../resolvers');
import resolvers from '../resolvers';
import expectExport from 'expect';
import { async } from '../../../../Library/Caches/typescript/3.6/node_modules/rxjs/internal/scheduler/async';
import { split } from 'apollo-link';
import { exportAllDeclaration } from '@babel/types';

describe('Spirits', () => {

  const spiritCount = 3;  // currently the resolvers add 3 spirits
  const testSpirit = { 
    name: "Test Booze", 
    type: "GIN", 
    howMuchLeft: "50"
  };

  it('returns a list of spirits', async () => {
    const res = await resolvers.Query.spirits();
    expect(res.length).toEqual(spiritCount);
  });

  it('creates a new spirit', async () => {
    const resId = await resolvers.Mutation.addSpirit(testSpirit);
    expect(resId).not.toBe(null);
  });

  it('fetches a spirit by id', async () => {
    // TODO: extract this duplicated code
    const allSpirits = await resolvers.Query.spirits();
    const spirit = allSpirits[0];

    const resSpirit = await resolvers.Query.spirit(null, { id: spirit.id });
    expect(resSpirit).toEqual(spirit);
  });

  it('returns the correct error when it cannot lookup a spirit', async () => {
    await expect(resolvers.Query.spirit(null, { id: "does-not-exist" }))
      .rejects
      .toThrow("Spirit doesn't exist");
  });

  it('deletes a spirit', async () => {
    // TODO: extract this duplicated code
    const allSpirits = await resolvers.Query.spirits();
    const spirit = allSpirits[0];

    // delete one spirit
    const res = await resolvers.Mutation.deleteSpirit(null, { id: spirit.id });
    expect(res.ok).toBe(true);

    // all spirits count should be less one
    const newAllSpirits = await resolvers.Query.spirits();
    expect(newAllSpirits.length).toEqual(allSpirits.length - 1);
  });
  
  it('edits a spirit', async () => {
    // TODO: extract this duplicated code
    const allSpirits = await resolvers.Query.spirits();
    const spirit = allSpirits[0];

    // edit a spirit and ensure the return matches the edits
    const resSpirit = await resolvers.Mutation.editSpirit(null, { 
      id: spirit.id,
      name: testSpirit.name,
      type: testSpirit.type,
      howMuchLeft: testSpirit.howMuchLeft 
    });
    expect(resSpirit.name).toEqual(testSpirit.name);
    expect(resSpirit.type).toEqual(testSpirit.type);
    expect(resSpirit.howMuchLeft).toEqual(testSpirit.howMuchLeft);
  });

  it('returns the correct error when it cannot lookup a spirit for edit', async () => {
    await expect(resolvers.Mutation.editSpirit(null, { 
      id: "does-not-exist",
      name: testSpirit.name,
      type: testSpirit.type,
      howMuchLeft: testSpirit.howMuchLeft 
    }))
      .rejects
      .toThrow("Spirit doesn't exist");
  });

});