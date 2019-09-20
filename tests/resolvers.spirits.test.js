// const resolvers = require('../resolvers');
import resolvers from '../resolvers';
import expectExport from 'expect';
import { async } from '../../../../Library/Caches/typescript/3.6/node_modules/rxjs/internal/scheduler/async';

describe('Spirits', () => {

  it('returns a list of spirits', async () => {
    const res = await resolvers.Query.spirits();
    // currently the resolvers add 3 spirits
    expect(res.length).toEqual(3);
  });

});