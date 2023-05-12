import fs from 'node:fs';
import { dirname } from 'node:path';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  {
    extension: 'json',
    dataPath1: getFixturePath('file1.json'),
    dataPath2: getFixturePath('file2.json'),
  },
  {
    extension: 'yaml',
    dataPath1: getFixturePath('file1.yaml'),
    dataPath2: getFixturePath('file2.yaml'),
  },
];

describe.each(cases)('Testing gendiff', ({ extension, dataPath1, dataPath2 }) => {
  const expected = readFile('expectedPlain.txt');

  test(`Testing ${extension} extension`, () => {
    const actual = genDiff(dataPath1, dataPath2);
    expect(actual).toEqual(expected);
  });
});
