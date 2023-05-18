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
      const stringTemplate = `Property '${currentPath}' was ${status}`;
      switch (status) {
        case 'removed':
          return `${stringTemplate}`;
        case 'added':
          return `${stringTemplate} with value: ${valueToString(value)}`;
        case 'updated':
          if (_.isObject(value) && _.isObject(newValue)) {
            return iter(children, currentPath, 1);
          }
          return `${stringTemplate}. From ${valueToString(value)} to ${valueToString(newValue)}`;
        default:
          throw new Error('Упс, что-то пошло не так [✖‿✖]');
      }
    })
    .join('\n');
  return iter(data, '', 0);
};

export default plain;
