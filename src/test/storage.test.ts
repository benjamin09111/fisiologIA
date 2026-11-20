import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

function scanDirForStorage(dir: string): string[] {
  const violations: string[] = [];
  if (!fs.existsSync(dir)) return violations;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      violations.push(...scanDirForStorage(fullPath));
    } else if (/\.(tsx|ts)$/.test(entry.name) && !entry.name.includes('.test.')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes('localStorage') || content.includes('sessionStorage')) {
        violations.push(`${fullPath}: contains browser storage reference`);
      }
    }
  }
  return violations;
}

describe('Storage Guidelines Enforcement', () => {
  it('does not allow localStorage or sessionStorage in frontend code (cookies + server state only)', () => {
    const dirsToScan = [
      path.resolve(__dirname, '../components'),
      path.resolve(__dirname, '../features'),
      path.resolve(__dirname, '../app'),
      path.resolve(__dirname, '../lib'),
    ];

    const allViolations: string[] = [];
    for (const dir of dirsToScan) {
      allViolations.push(...scanDirForStorage(dir));
    }

    expect(allViolations).toEqual([]);
  });
});
