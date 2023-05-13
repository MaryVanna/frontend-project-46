const spacing = '    ';
const changeSymbols = {
  none: '    ',
  deleted: '  - ',
  added: '  + ',
};

const stylish = (data) => {
  const iter = (arr, depth) => {
    const currentSpasing = spacing.repeat(depth);
    const strings = arr
      .flat()
      .map(({
        key, value, changes, children, nasted,
      }) => {
        switch (changes) {
          case 'none':
            return `${currentSpasing}${changeSymbols.none}${key}: ${nasted ? iter(children, depth + 1) : value}`;
          case 'deleted':
            return `${currentSpasing}${changeSymbols.deleted}${key}: ${nasted ? iter(children, depth + 1) : value}`;
          case 'added':
            return `${currentSpasing}${changeSymbols.added}${key}: ${nasted ? iter(children, depth + 1) : value}`;
          default:
            throw new Error('Упс, что-то пошло не так [✖‿✖]');
        }
      });
    return `{\n${strings.join('\n')}\n${currentSpasing}}`;
  };

  return iter(data, 0);
};

export default stylish;
