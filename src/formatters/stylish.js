import _ from 'lodash';

const stylish = (data) => {
  const iter = (keys, depth) => {
    const currentSpasing = '    '.repeat(depth);
    const strings = keys
      .map(({
        key, value, newValue, children, status,
      }) => {
        const valueString = `${key}: ${_.isObject(value) ? iter(children, depth + 1) : value}`;
        const newValueString = `${key}: ${_.isObject(newValue) ? iter(children, depth + 1) : newValue}`;
        switch (status) {
          case 'unchanged':
            return `${currentSpasing}    ${valueString}`;
          case 'added':
            return `${currentSpasing}  + ${valueString}`;
          case 'removed':
            return `${currentSpasing}  - ${valueString}`;
          case 'updated':
            if (_.isObject(value) && _.isObject(newValue)) {
              return `${currentSpasing}    ${valueString}`;
            }
            return [`${currentSpasing}  - ${valueString}`, `${currentSpasing}  + ${newValueString}`];
          default:
            throw new Error('Упс, что-то пошло не так [✖‿✖]');
        }
      });
    return `{\n${strings.flat().join('\n')}\n${currentSpasing}}`;
  };

  return iter(data, 0);
};

export default stylish;
