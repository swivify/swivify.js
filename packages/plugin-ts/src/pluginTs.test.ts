import { describe, it, expect } from 'vitest';
import { pluginTs } from './index.js';

describe('pluginTs', () => {
  it('returns the correct string', () => {
    expect(pluginTs()).toBe('Hello from Swivify TypeScript Plugin!');
  });
});
