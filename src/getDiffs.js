import _ from 'lodash';

const getChildren = (obj) => {
  if (!_.isObject(obj)) {
    return [];
  }
  const keys = (Object.keys(obj));
  return keys.map((key) => {
    const value = obj[key];
    return {
      key, value, children: getChildren(value), status: 'unchanged',
    };
  });
};

const getDiffs = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    const [value, newValue] = [data1[key], data2[key]];

    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (_.isEqual(value, newValue)) {
        return {
          key, value, children: getChildren(value), status: 'unchanged',
        };
      }
      if (_.isObject(value) && _.isObject(newValue)) {
        return {
          key, value, newValue, children: getDiffs(value, newValue), status: 'updated',
        };
      }
      return {
        key, value, newValue, children: _.isObject(value) ? getChildren(value) : getChildren(newValue), status: 'updated',
      };
    }

    if (Object.hasOwn(data1, key)) {
      return {
        key, value, children: getChildren(value), status: 'removed',
      };
    }
    return {
      key, value: newValue, children: getChildren(newValue), status: 'added',
    };
  });
};

export default getDiffs;
