import _ from 'lodash';

const spacing = '    ';

const valueToString = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }
  const entries = Object.entries(currentValue);
  const currentSpacing = spacing.repeat(depth);
  const strings = entries.map(([key, value]) => `${currentSpacing}    ${key}: ${valueToString(value, depth + 1)}`);
  return `{\n${strings.join('\n')}\n${currentSpacing}}`;
};

const stylish = (data) => {
  const iter = (keys, depth) => {
    const currentSpacing = spacing.repeat(depth);
    const strings = keys.flatMap(({
      key, value, newValue, children, status,
    }) => {
      switch (status) {
        case 'unchanged':
          return `${currentSpacing}    ${key}: ${valueToString(value, depth + 1)}`;
        case 'added':
          return `${currentSpacing}  + ${key}: ${valueToString(value, depth + 1)}`;
        case 'removed':
          return `${currentSpacing}  - ${key}: ${valueToString(value, depth + 1)}`;
        case 'updated':
          return [
            `${currentSpacing}  - ${key}: ${valueToString(value, depth + 1)}`,
            `${currentSpacing}  + ${key}: ${valueToString(newValue, depth + 1)}`,
          ];
        case 'nested':
          return `${currentSpacing}    ${key}: ${iter(children, depth + 1)}`;
        default:
          throw new Error('Упс, что-то пошло не так [✖‿✖]');
      }
    });
    return `{\n${strings.join('\n')}\n${currentSpacing}}`;
  };

  return iter(data, 0);
};

export default stylish;
