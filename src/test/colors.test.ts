import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

function scanDirForHex(dir: string): string[] {
  const violations: string[] = [];
  if (!fs.existsSync(dir)) return violations;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      violations.push(...scanDirForHex(fullPath));
    } else if (/\.(tsx|ts)$/.test(entry.name) && !entry.name.includes('.test.')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      // Look for hex colors like #fff, #ffffff, #123456
      const hexMatches = content.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/g);
      if (hexMatches) {
        violations.push(`${fullPath}: ${hexMatches.join(', ')}`);
      }
    }
  }
  return violations;
}

describe('Design Tokens Enforcement', () => {
  it('does not allow hardcoded hex colors in components and features', () => {
    const dirsToScan = [
      path.resolve(__dirname, '../components'),
      path.resolve(__dirname, '../features'),
      path.resolve(__dirname, '../app'),
    ];

    const allViolations: string[] = [];
    for (const dir of dirsToScan) {
      allViolations.push(...scanDirForHex(dir));
    }

    expect(allViolations).toEqual([]);
  });
});
