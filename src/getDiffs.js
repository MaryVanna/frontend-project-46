import _ from 'lodash';

const getChildren = (obj) => {
  if (!_.isObject(obj)) {
    return null;
  }
  const keys = (Object.keys(obj));
  return keys.map((key) => {
    if (_.isObject(obj[key])) {
      return {
        key, children: getChildren(obj[key]), nasted: true, changes: 'changed',
      };
    }
    return {
      key, value: obj[key], changes: 'none', nasted: false,
    };
  });
};

const getDiffs = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    const [value1, value2] = [data1[key], data2[key]];
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        key, children: getDiffs(value1, value2), nasted: true, changes: 'none',
      };
    }
    const [unchanged, added, deleted] = [
      {
        key, value: value1, children: getChildren(value1), changes: 'none', nasted: _.isObject(value1),
      },
      {
        key, value: value2, children: getChildren(value2), changes: 'added', nasted: _.isObject(value2),
      },
      {
        key, value: value1, children: getChildren(value1), changes: 'deleted', nasted: _.isObject(value1),
      },
    ];
    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      return _.isEqual(value1, value2) ? unchanged : [deleted, added];
    }
    return Object.hasOwn(data1, key) ? deleted : added;
  });
};

export default getDiffs;
