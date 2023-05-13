import _ from 'lodash';

const getChildren = (obj) => {
  if (!_.isObject(obj)) {
    return null;
  }
  const keys = (Object.keys(obj));
  return keys.map((key) => {
    if (_.isObject(obj[key])) {
      return {
        key, children: getChildren(obj[key]), nasted: true, changes: 'none',
      };
    }
    return { key, value: obj[key], changes: 'none' };
  });
};

const getDiffs = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  return keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key, children: getDiffs(data1[key], data2[key]), nasted: true, changes: 'none',
      };
    }
    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      const equalValues = {
        key, value: data1[key], children: getChildren(data1[key]), changes: 'none', nasted: _.isObject(data1[key]),
      };
      const notEqualValues = [
        {
          key, value: data1[key], children: getChildren(data1[key]), changes: 'deleted', nasted: _.isObject(data1[key]),
        },
        {
          key, value: data2[key], children: getChildren(data2[key]), changes: 'added', nasted: _.isObject(data2[key]),
        },
      ];
      return _.isEqual(data1[key], data2[key]) ? equalValues : notEqualValues;
    }
    if (Object.hasOwn(data1, key)) {
      return {
        key, value: data1[key], children: getChildren(data1[key]), changes: 'deleted', nasted: _.isObject(data1[key]),
      };
    }
    return {
      key, value: data2[key], children: getChildren(data2[key]), changes: 'added', nasted: _.isObject(data2[key]),
    };
  });
};

export default getDiffs;
