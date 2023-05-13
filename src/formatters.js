const stylish = (data) => {
  const spacing = '  ';
  const changeSymbols = {
    none: '  ',
    deleted: '- ',
    added: '+ ',
  };
  const iter = (arr, depth) => {
    const strings = arr
      .map(({ key, value, changes }) => {
        if (typeof value === 'object' && value !== null) {
          return `${spacing.repeat(depth + 1)}${changeSymbols[changes]}${key}: ${iter(value, depth + 1)}`;
        }
        return `${spacing.repeat(depth + 1)}${changeSymbols[changes]}${key}: ${value}`;
      })
      .join('\n');
    return `{\n${strings}\n${spacing.repeat(depth)}}`;
  };
  return iter(data, 0);
};

export default stylish;
