import _ from 'lodash';

const stylish = (data) => {
  const iter = (keys, depth) => {
    const currentSpasing = '    '.repeat(depth);
    const strings = keys.map(({
        key, value, newValue, children, status,
      }) => {
        const valueToString = (val) => `${key}: ${_.isObject(val) ? iter(children, depth + 1) : val}`;
        switch (status) {
          case 'unchanged':
            return `${currentSpasing}    ${valueToString(value)}`;
          case 'added':
            return `${currentSpasing}  + ${valueToString(value)}`;
          case 'removed':
            return `${currentSpasing}  - ${valueToString(value)}`;
          case 'updated':
            if (_.isObject(value) && _.isObject(newValue)) {
              return `${currentSpasing}    ${valueToString(value)}`;
            }
            return [`${currentSpasing}  - ${valueToString(value)}`, `${currentSpasing}  + ${valueToString(newValue)}`];
          default:
            throw new Error('Упс, что-то пошло не так [✖‿✖]');
        }
      });
    return `{\n${strings.flat().join('\n')}\n${currentSpasing}}`;
  };

  return iter(data, 0);
};

export default stylish;
