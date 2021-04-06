import { yearCheck } from '../formCheckers';

test('years are valid', () => {
  expect(yearCheck('1901')).toBe(true);
  expect(yearCheck('2020')).toBe(true);
  expect(yearCheck('1985')).toBe(true);
  expect(yearCheck('1932')).toBe(true);
  expect(yearCheck('1955')).toBe(true);
});

test('years are not valid', () => {
  expect(yearCheck('1855')).toBe(false);
  expect(yearCheck('3500')).toBe(false);
  expect(yearCheck('2092')).toBe(false);
  expect(yearCheck('13')).toBe(false);
  expect(yearCheck('0')).toBe(false);
  expect(yearCheck('00')).toBe(false);
  expect(yearCheck('100')).toBe(false);
  expect(yearCheck('zzhh')).toBe(false);
  expect(yearCheck('zzhh150')).toBe(false);
});
