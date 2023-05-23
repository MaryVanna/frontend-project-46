import _ from 'lodash';

const spasing = '    ';

const valueToString = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }
  const entries = Object.entries(currentValue);
  const currentSpasing = spasing.repeat(depth);
  const strings = entries.map(([key, value]) => `${currentSpasing}    ${key}: ${valueToString(value, depth + 1)}`);
  return `{\n${strings.join('\n')}\n${currentSpasing}}`;
};

const stylish = (data) => {
  const iter = (keys, depth) => {
    const currentSpasing = spasing.repeat(depth);
    const strings = keys.map(({
      key, value, newValue, children, status,
    }) => {
      switch (status) {
        case 'unchanged':
          return `${currentSpasing}    ${key}: ${valueToString(value, depth + 1)}`;
        case 'added':
          return `${currentSpasing}  + ${key}: ${valueToString(value, depth + 1)}`;
        case 'removed':
          return `${currentSpasing}  - ${key}: ${valueToString(value, depth + 1)}`;
        case 'updated':
          return [
            `${currentSpasing}  - ${key}: ${valueToString(value, depth + 1)}`,
            `${currentSpasing}  + ${key}: ${valueToString(newValue, depth + 1)}`,
          ];
        case 'nasted':
          return `${currentSpasing}    ${key}: ${iter(children, depth + 1)}`;
        default:
          throw new Error('Упс, что-то пошло не так [✖‿✖]');
      }
    });
    return `{\n${strings.flat().join('\n')}\n${currentSpasing}}`;
  };

  return iter(data, 0);
};

export default stylish;
