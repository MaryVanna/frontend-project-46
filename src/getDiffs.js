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
    const keyDescription = { key, value };

    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      keyDescription.status = _.isEqual(value, newValue) ? 'unchanged' : 'updated';
    } else {
      keyDescription.status = Object.hasOwn(data1, key) ? 'removed' : 'added';
    }

    if (keyDescription.status === 'updated') {
      keyDescription.newValue = newValue;
      if (_.isObject(value) && _.isObject(newValue)) {
        keyDescription.children = getDiffs(value, newValue);
      } else {
        keyDescription.children = _.isObject(value) ? getChildren(value) : getChildren(newValue);
      }
    }

    if (keyDescription.status === 'removed') {
      keyDescription.children = getChildren(value);
    }

    if (keyDescription.status === 'added') {
      keyDescription.value = newValue;
      keyDescription.children = getChildren(newValue);
    }

    return keyDescription;
  });
};

export default getDiffs;
