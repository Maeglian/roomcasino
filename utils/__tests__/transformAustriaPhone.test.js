import { transformAustriaPhone } from '../helpers';

test('replaces phones starting with 430', () => {
  expect(transformAustriaPhone('43055667755')).toBe('4355667755');
  expect(transformAustriaPhone('+43055667755')).toBe('+4355667755');
});

test("doesn't transform phones not starting with 430", () => {
  expect(transformAustriaPhone('89031000101')).toBe('89031000101');
  expect(transformAustriaPhone('4380070002')).toBe('4380070002');
  expect(transformAustriaPhone('14380070002')).toBe('14380070002');
  expect(transformAustriaPhone('+14380070002')).toBe('+14380070002');
  expect(transformAustriaPhone('80070043055')).toBe('80070043055');
  expect(transformAustriaPhone('+143065789900')).toBe('+143065789900');
});
