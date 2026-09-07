import { formatTime } from '@/lib/utils';
import { test, expect, describe } from 'vitest';

describe('formatTime', () => {
  test('should return the correct time for 00:00', () => {
    expect(formatTime('00:00')).toBe('12:00 AM');
  });
  test('should return the correct time for 12:00', () => {
    expect(formatTime('12:00')).toBe('12:00 PM');
  });
  test('should return the correct time for 13:00', () => {
    expect(formatTime('13:00')).toBe('1:00 PM');
  });
  test('should return the correct time for 23:00', () => {
    expect(formatTime('23:00')).toBe('11:00 PM');
  });
});
