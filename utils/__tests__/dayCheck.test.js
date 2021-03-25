import { dayCheck } from '../formCheckers';

test('all days are valid', () => {
  expect(dayCheck('1')).toBe(true);
  expect(dayCheck('01')).toBe(true);
  expect(dayCheck('2')).toBe(true);
  expect(dayCheck('02')).toBe(true);
  expect(dayCheck('10')).toBe(true);
  expect(dayCheck('11')).toBe(true);
  expect(dayCheck('20')).toBe(true);
  expect(dayCheck('21')).toBe(true);
  expect(dayCheck('30')).toBe(true);
  expect(dayCheck('31')).toBe(true);
});

test('not valid days are not valid', () => {
  expect(dayCheck('32')).toBe(false);
  expect(dayCheck('0')).toBe(false);
  expect(dayCheck('00')).toBe(false);
  expect(dayCheck('100')).toBe(false);
  expect(dayCheck('zzhh')).toBe(false);
  expect(dayCheck('zzhh150')).toBe(false);
});
