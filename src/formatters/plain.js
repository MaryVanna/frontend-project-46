import _ from 'lodash';

const valueToString = (value) => {
  const formattedValue = _.isString(value) ? `'${value}'` : value;
  return `${_.isObject(value) ? '[complex value]' : formattedValue}`;
};

const plain = (data) => {
  const iter = (keys, path, depth) => keys
    .filter(({ status }) => status !== 'unchanged')
    .map(({
      key, value, newValue, children, status,
    }) => {
      const currentPath = depth > 0 ? `${path}.${key}` : key;
      switch (status) {
        case 'removed':
          return `Property '${currentPath}' was removed`;
        case 'added':
          return `Property '${currentPath}' was added with value: ${valueToString(value)}`;
        case 'updated':
          return `Property '${currentPath}' was updated. From ${valueToString(value)} to ${valueToString(newValue)}`;
        case 'nasted':
          return iter(children, currentPath, 1);
        default:
          throw new Error('Упс, что-то пошло не так [✖‿✖]');
      }
    })
    .join('\n');
  return iter(data, '', 0);
};

export default plain;
