import getDiffs from './src/getDiffs.js';
import parse from './src/parsers.js';
import stylish from './src/formatters.js';

const genDiff = (path1, path2, format) => {
  const data1 = parse(path1);
  const data2 = parse(path2);
  const diffs = getDiffs(data1, data2);
  switch (format) {
    case 'stylish':
      return stylish(diffs);
    default:
      throw new Error('Этот формат мне не известен ¯\\_(ツ)_/¯');
  }
};

export default genDiff;
