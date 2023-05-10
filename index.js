import getDiffs from './src/getDiffs.js';
import parse from './src/parse.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  return getDiffs(data1, data2);
};

export default genDiff;
