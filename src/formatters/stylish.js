const spacing = '    ';
const changeSymbols = {
  none: '    ',
  deleted: '  - ',
  added: '  + ',
};

const stylish = (data) => {
  const iter = (keys, depth) => {
    const currentSpasing = spacing.repeat(depth);
    const strings = keys
      .flat()
      .map(({
        key, value, changes, children, nasted,
      }) => {
        const string = `${key}: ${nasted ? iter(children, depth + 1) : value}`;
        switch (changes) {
          case 'none':
            return `${currentSpasing}${changeSymbols.none}${string}`;
          case 'changed':
            return `${currentSpasing}${changeSymbols.none}${string}`;
          case 'deleted':
            return `${currentSpasing}${changeSymbols.deleted}${string}`;
          case 'added':
            return `${currentSpasing}${changeSymbols.added}${string}`;
          default:
            throw new Error('Упс, что-то пошло не так [✖‿✖]');
        }
      })
      .join('\n');
    return `{\n${strings}\n${currentSpasing}}`;
  };

  return iter(data, 0);
};

export default stylish;
