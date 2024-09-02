import * as crypto from 'crypto';
import fs from 'fs/promises';
import * as path from 'path';
import { expect, test } from 'vitest';

const getChecksum = async (filePath: string) => {
  const absolutePath = path.resolve(filePath);
  const data = await fs.readFile(absolutePath, 'utf8');

  const obj = JSON.parse(data);
  const normalized = JSON.stringify(obj, null, 2);

  // Calculate MD5 hash
  return crypto.createHash('md5').update(normalized, 'utf8').digest('hex');
};

test('validates tsconfig.json has not been tampered with', async () => {
  const originalPath = './test/tsconfig-untampered.json';
  const currentPath = './tsconfig.json';

  const originalChecksum = await getChecksum(originalPath);
  const currentChecksum = await getChecksum(currentPath);

  if (currentChecksum !== originalChecksum) {
    console.error('ERROR: The tsconfig.json file has been tampered with.');
  }

  expect(currentChecksum).toBe(originalChecksum);
});
