// @ts-expect-error -- Jest/ts-jest needs extensionless import
import { helloCore } from './index';

test('helloCore returns correct string', () => {
  expect(helloCore()).toBe('Hello from Swivify Core!');
});
