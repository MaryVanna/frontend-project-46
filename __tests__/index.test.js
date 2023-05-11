import genDiff from '../index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'node:fs';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff test', () => {
  const actual = genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json');
  const expected = readFile('expectedPlain.txt');
  expect(actual).toEqual(expected);
});
