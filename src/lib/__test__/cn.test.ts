import { describe, it, expect } from 'vitest';

import { cn } from '../cn';

describe('cn', () => {
  it('merges simple classes', () => {
    expect(cn('px-2', 'py-4')).toBe('px-2 py-4');
  });

  it('ignores falsy values', () => {
    expect(cn('px-2', false, undefined, 'py-4')).toBe('px-2 py-4');
  });

  it('merges duplicate Tailwind classes', () => {
    expect(cn('px-2', 'px-2', 'py-4')).toBe('px-2 py-4');
  });

  it('handles arrays', () => {
    expect(cn(['px-2', 'py-4'], 'text-center')).toBe('px-2 py-4 text-center');
  });
});
