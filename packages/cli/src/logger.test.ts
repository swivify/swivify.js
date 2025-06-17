import { describe, it, expect } from 'vitest';
import { log } from './logger.js';

describe('logger', () => {
  it('should log info messages', () => {
    expect(() => log.info('test')).not.toThrow();
  });
  it('should log success messages', () => {
    expect(() => log.success('test')).not.toThrow();
  });
  it('should log warn messages', () => {
    expect(() => log.warn('test')).not.toThrow();
  });
  it('should log error messages', () => {
    expect(() => log.error('test')).not.toThrow();
  });
});
