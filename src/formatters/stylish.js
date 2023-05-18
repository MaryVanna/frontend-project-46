import _ from 'lodash';

const stylish = (data) => {
  const iter = (keys, depth) => {
    const currentSpasing = '    '.repeat(depth);
    const strings = keys
      .map(({
        key, value, newValue, children, status,
      }) => {
        switch (status) {
          case 'unchanged':
            return `${currentSpasing}    ${key}: ${_.isObject(value) ? iter(children, depth + 1) : value}`;
          case 'added':
            return `${currentSpasing}  + ${key}: ${_.isObject(value) ? iter(children, depth + 1) : value}`;
          case 'removed':
            return `${currentSpasing}  - ${key}: ${_.isObject(value) ? iter(children, depth + 1) : value}`;
          case 'updated':
            if (_.isObject(value) && _.isObject(newValue)) {
              return `${currentSpasing}    ${key}: ${_.isObject(value) ? iter(children, depth + 1) : value}`;
            }
            return [
              `${currentSpasing}  - ${key}: ${_.isObject(value) ? iter(children, depth + 1) : value}`,
              `${currentSpasing}  + ${key}: ${_.isObject(newValue) ? iter(children, depth + 1) : newValue}`,
            ];
          default:
            throw new Error('Упс, что-то пошло не так [✖‿✖]');
        }
      });
    return `{\n${strings.flat().join('\n')}\n${currentSpasing}}`;
  };

  return iter(data, 0);
};

export default stylish;
