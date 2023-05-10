import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const parse = (filepath) => {
  const normalizedPath = path.resolve(process.cwd(), filepath);
  const fileContent = fs.readFileSync(normalizedPath, 'utf-8');
  return JSON.parse(fileContent);
};

export default parse;
