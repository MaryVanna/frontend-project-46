import _ from 'lodash';

const plain = (data) => {
  const iter = (keys, path, depth) => keys
    .filter((keyDescription) => {
      const { changes, nasted } = keyDescription;
      return _.isArray(keyDescription) ? true : (changes !== 'none' || nasted);
    })
    .map((keyDescription) => {
      const complex = '[complex value]';
      if (_.isArray(keyDescription)) {
        const [
          { key, nasted: delNasted, value: delValue },
          { nasted: addNasted, value: addValue },
        ] = keyDescription;
        const [delString, addString] = [
          _.isString(delValue) ? `'${delValue}'` : delValue,
          _.isString(addValue) ? `'${addValue}'` : addValue,
        ];
        const currentPath = depth > 0 ? `${path}.${key}` : key;
        return `Property '${currentPath}' was updated. From ${delNasted ? complex : delString} to ${addNasted ? complex : addString}`;
      }
      const {
        key, value, changes, children, nasted,
      } = keyDescription;
      const currentPath = depth > 0 ? `${path}.${key}` : key;
      const valueString = _.isString(value) ? `'${value}'` : value;
      switch (changes) {
        case 'changed':
          return iter(children, currentPath, 1);
        case 'deleted':
          return `Property '${currentPath}' was removed`;
        case 'added':
          return `Property '${currentPath}' was added with value: ${nasted ? complex : valueString}`;
        default:
          throw new Error('Упс, что-то пошло не так [✖‿✖]');
      }
    })
    .join('\n');
  return iter(data, '', 0);
};

export default plain;
