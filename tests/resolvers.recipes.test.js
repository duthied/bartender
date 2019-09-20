// const resolvers = require('../resolvers');
import resolvers from '../resolvers';
import expectExport from 'expect';
import { async } from '../../../../Library/Caches/typescript/3.6/node_modules/rxjs/internal/scheduler/async';

describe('Recipes', () => {

  it('returns a list of recipes', async () => {
    const res = await resolvers.Query.recipes();
    // currently the resolvers add 1 recipe
    expect(res.length).toEqual(1);

  });

});