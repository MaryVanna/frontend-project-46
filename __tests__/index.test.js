import fs from 'node:fs';
import { dirname } from 'node:path';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const filePathes = {
  j2j: [getFixturePath('file1.json'), getFixturePath('file2.json')],
  y2y: [getFixturePath('file1.yaml'), getFixturePath('file2.yaml')],
  j2y: [getFixturePath('file1.json'), getFixturePath('file2.yaml')],
};

const cases = [
  { format: 'stylish', ...filePathes },
  { format: 'plain', ...filePathes },
  { format: 'json', ...filePathes },
];

describe.each(cases)('Testing gendiff', ({
  format, j2j, y2y, j2y,
}) => {
  const expected = readFile(`${format}.txt`);

  test(`Testing ${format} format, json-json`, () => {
    const actual = genDiff(...j2j, format);
    expect(actual).toEqual(expected);
  });

  test(`Testing ${format} format, yaml-yaml`, () => {
    const actual = genDiff(...y2y, format);
    expect(actual).toEqual(expected);
  });

  test(`Testing ${format} format, json-yaml`, () => {
    const actual = genDiff(...j2y, format);
    expect(actual).toEqual(expected);
  });
});
