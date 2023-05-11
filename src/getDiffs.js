import _ from 'lodash';

const getDiffs = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  const result = keys.reduce((acc, key) => {
    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      const equalKeys = `    ${key}: ${data1[key]}`;
      const notEqualKeys = [`  - ${key}: ${data1[key]}`, `  + ${key}: ${data2[key]}`];
      acc.push(data1[key] === data2[key] ? equalKeys : notEqualKeys);
    } else if (Object.hasOwn(data1, key)) {
      acc.push(`  - ${key}: ${data1[key]}`);
    } else {
      acc.push(`  + ${key}: ${data2[key]}`);
    }
    return acc;
  }, []);
  return `{\n${result.flat().join('\n')}\n}`;
};

export default getDiffs;
