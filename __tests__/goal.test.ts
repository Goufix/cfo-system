import { getGoalByUser } from '../src/utils/getGoalByUser';

const string = '';

it('Should return the right goal string', () => {
  expect(getGoalByUser('', '')).toBe('');
});
