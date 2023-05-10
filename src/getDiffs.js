import _ from 'lodash';

const getDiffs = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  if (keys.length === 0) {
    return '{}';
  }
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

/*if (data1[key] === data2[key]) {
  acc.push(`    ${key}: ${data1[key]}`);
} else if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key) && data1[key] !== data2[key]) {
  const firstProp = `  - ${key}: ${data1[key]}`;
  const secondProp = `  + ${key}: ${data2[key]}`;
  acc.push(firstProp);
  acc.push(secondProp);
} else if (Object.hasOwn(data1, key)) {
  acc.push(`  - ${key}: ${data1[key]}`);
} else if (Object.hasOwn(data2, key)) {
  acc.push(`  + ${key}: ${data2[key]}`);
}*/