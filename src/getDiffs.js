import _ from 'lodash';

/* const getDiffs = (data1, data2) => {
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
}; */

const getDiffs = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  return keys.reduce((acc, key) => {
    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      const equalKeys = {
        key,
        value: data1[key],
        changes: 'none',
      };
      const notEqualKeys = [
        {
          key,
          value: data1[key],
          changes: 'deleted',
        },
        {
          key,
          value: data2[key],
          changes: 'added',
        },
      ];
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        const notEqual = {
          key,
          value: getDiffs(data1[key], data2[key]),
          changes: 'none',
        };
        acc.push(_.isEqual(data1[key], data2[key]) ? equalKeys : notEqual);
      } else {
        acc.push(data1[key] === data2[key] ? equalKeys : notEqualKeys);
      }
    } else if (Object.hasOwn(data1, key)) {
      acc.push({ key, value: data1[key], changes: 'deleted' });
    } else {
      acc.push({ key, value: data2[key], changes: 'added' });
    }
    return acc;
  }, [])
    .flat();
};

export default getDiffs;
