import { monthCheck } from '../formCheckers';

test('all months are valid', () => {
  expect(monthCheck('1')).toBe(true);
  expect(monthCheck('2')).toBe(true);
  expect(monthCheck('3')).toBe(true);
  expect(monthCheck('4')).toBe(true);
  expect(monthCheck('5')).toBe(true);
  expect(monthCheck('6')).toBe(true);
  expect(monthCheck('7')).toBe(true);
  expect(monthCheck('8')).toBe(true);
  expect(monthCheck('9')).toBe(true);
  expect(monthCheck('10')).toBe(true);
  expect(monthCheck('11')).toBe(true);
  expect(monthCheck('12')).toBe(true);
  expect(monthCheck('01')).toBe(true);
  expect(monthCheck('02')).toBe(true);
  expect(monthCheck('03')).toBe(true);
  expect(monthCheck('04')).toBe(true);
  expect(monthCheck('05')).toBe(true);
  expect(monthCheck('06')).toBe(true);
  expect(monthCheck('07')).toBe(true);
  expect(monthCheck('08')).toBe(true);
  expect(monthCheck('09')).toBe(true);
});

test('not valid months are not valid', () => {
  expect(monthCheck('13')).toBe(false);
  expect(monthCheck('0')).toBe(false);
  expect(monthCheck('00')).toBe(false);
  expect(monthCheck('100')).toBe(false);
  expect(monthCheck('zzhh')).toBe(false);
  expect(monthCheck('zzhh150')).toBe(false);
});
