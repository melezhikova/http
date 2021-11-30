import { getTime } from '../others';

test('время для тикета', () => {
  const result = getTime('2021-11-30T08:41:07.750Z');
  const expected = '30.11.2021 08:41';
  expect(result).toBe(expected);
});
