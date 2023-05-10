import _ from 'lodash';

const getDiffs = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  if (keys.length === 0) {
    return '{}';
  }
  const result = keys.reduce((acc, key) => {
    if (data1[key] === data2[key]) {
      acc.push(`    ${key}: ${data1[key]}`);
      return acc;
    } if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key) && data1[key] !== data2[key]) {
      const firstProp = `  - ${key}: ${data1[key]}`;
      const secondProp = `  + ${key}: ${data2[key]}`;
      acc.push(firstProp);
      acc.push(secondProp);
      return acc;
    } if (Object.hasOwn(data1, key)) {
      acc.push(`  - ${key}: ${data1[key]}`);
    } if (Object.hasOwn(data2, key)) {
      acc.push(`  + ${key}: ${data2[key]}`);
    }
    return acc;
  }, []);
  return `{\n${result.join('\n')}\n}`;
};

export default getDiffs;
