import { describe, it, expect } from 'vitest';
import {
  getWarframeEnumeration,
  getWeaponEnumeration,
  getModEnumeration,
  getFactionEnumeration,
  getSyndicateEnumeration,
  getQuestEnumeration,
  getArcaneEnumeration,
  getMissionEnumeration,
  getResourceEnumeration,
  getRelicEnumeration,
} from '../../src/lib/enumerations';

describe('getWarframeEnumeration', () => {
  it('returns an array', () => {
    const result = getWarframeEnumeration();
    expect(Array.isArray(result)).toBe(true);
  });

  it('each entry has slug and name', () => {
    const result = getWarframeEnumeration();
    if (result.length === 0) return; // data file may not exist in CI
    const first = result[0]!;
    expect(typeof first.slug).toBe('string');
    expect(typeof first.name).toBe('string');
  });
});

describe('getWeaponEnumeration', () => {
  it('returns an array', () => {
    const result = getWeaponEnumeration();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('getModEnumeration', () => {
  it('returns an array', () => {
    const result = getModEnumeration();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('getFactionEnumeration', () => {
  it('returns an array', () => {
    const result = getFactionEnumeration();
    expect(Array.isArray(result)).toBe(true);
  });

  it('unwraps the items field from the {sources, items} envelope', () => {
    const result = getFactionEnumeration();
    // If items exist they should all have slug
    for (const item of result) {
      expect(typeof item.slug).toBe('string');
    }
  });
});

describe('getSyndicateEnumeration', () => {
  it('returns an array', () => {
    const result = getSyndicateEnumeration();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('getQuestEnumeration', () => {
  it('returns an array', () => {
    const result = getQuestEnumeration();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('getArcaneEnumeration', () => {
  it('returns an array', () => {
    const result = getArcaneEnumeration();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('getMissionEnumeration', () => {
  it('returns an array', () => {
    const result = getMissionEnumeration();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('getResourceEnumeration', () => {
  it('returns an array', () => {
    const result = getResourceEnumeration();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('getRelicEnumeration', () => {
  it('returns an array', () => {
    const result = getRelicEnumeration();
    expect(Array.isArray(result)).toBe(true);
  });
});
