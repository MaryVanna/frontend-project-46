import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import getDiff from './getDiff.js';
import parse from './parsers.js';
import formatter from './formatters/index.js';

const getNormalizedPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileContent = (normalizedPath) => fs.readFileSync(normalizedPath, 'utf-8');
const getFileExtension = (filepath) => path.extname(filepath).slice(1);

const getParsedContent = (filepath) => {
  const fileContent = getFileContent(getNormalizedPath(filepath));
  return parse(fileContent, getFileExtension(filepath));
};

const genDiff = (path1, path2, format = 'stylish') => {
  const data1 = getParsedContent(path1);
  const data2 = getParsedContent(path2);
  const diff = getDiff(data1, data2);
  return formatter(diff, format);
};

export default genDiff;
