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
        if (nasted) {
          switch (changes) {
            case 'none':
              return `${currentSpasing}${changeSymbols.none}${key}: ${iter(children, depth + 1)}`;
            case 'deleted':
              return `${currentSpasing}${changeSymbols.deleted}${key}: ${iter(children, depth + 1)}`;
            case 'added':
              return `${currentSpasing}${changeSymbols.added}${key}: ${iter(children, depth + 1)}`;
            default:
              throw new Error('Упс, что-то пошло не так [✖‿✖]');
          }
        }
        switch (changes) {
          case 'none':
            return `${currentSpasing}${changeSymbols.none}${key}: ${value}`;
          case 'deleted':
            return `${currentSpasing}${changeSymbols.deleted}${key}: ${value}`;
          case 'added':
            return `${currentSpasing}${changeSymbols.added}${key}: ${value}`;
          default:
            throw new Error('Упс, что-то пошло не так [✖‿✖]');
        }
      });
    return `{\n${strings.join('\n')}\n${currentSpasing}}`;
  };

  return iter(data, 0);
};

export default stylish;
