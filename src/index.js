import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import getDiffs from './getDiffs.js';
import parse from './parsers.js';
import formatter from './formatters/index.js';

const getParsedContent = (filepath) => {
  const normalizedPath = path.resolve(process.cwd(), filepath);
  const fileContent = fs.readFileSync(normalizedPath, 'utf-8');
  const fileExtension = path.extname(filepath).slice(1);
  return parse(fileContent, fileExtension);
};

const genDiff = (path1, path2, format = 'stylish') => {
  const data1 = getParsedContent(path1);
  const data2 = getParsedContent(path2);
  const diffs = getDiffs(data1, data2);
  return formatter(diffs, format);
};

export default genDiff;
