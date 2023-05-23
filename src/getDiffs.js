import _ from 'lodash';

const getDiffs = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  return keys.map((key) => {
    const [value, newValue] = [data1[key], data2[key]];

    if (_.isObject(value) && _.isObject(newValue)) {
      return { key, children: getDiffs(value, newValue), status: 'nasted' };
    }

    if (!Object.hasOwn(data1, key)) {
      return { key, value: newValue, status: 'added' };
    }

    if (!Object.hasOwn(data2, key)) {
      return { key, value, status: 'removed' };
    }

    if (value !== newValue) {
      return {
        key, value, newValue, status: 'updated',
      };
    }

    return { key, value, status: 'unchanged' };
  });
};

export default getDiffs;
