import getDiffs from './getDiffs.js';
import parse from './parsers.js';
import formatter from './formatters/index.js';

const genDiff = (path1, path2, format) => {
  const data1 = parse(path1);
  const data2 = parse(path2);
  const diffs = getDiffs(data1, data2);
  return formatter(diffs, format);
};

export default genDiff;
