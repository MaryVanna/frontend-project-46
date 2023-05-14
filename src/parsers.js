import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const normalizedPath = path.resolve(process.cwd(), filepath);
  const fileContent = fs.readFileSync(normalizedPath, 'utf-8');
  const fileExtension = path.extname(filepath).slice(1);
  switch (fileExtension) {
    case 'json':
      return JSON.parse(fileContent);
    case 'yml':
      return yaml.load(fileContent);
    case 'yaml':
      return yaml.load(fileContent);
    default:
      throw new Error(`Расширение '.${fileExtension}' мне не известно ¯\\_(ツ)_/¯`);
  }
};

export default parse;
