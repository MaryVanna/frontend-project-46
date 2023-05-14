import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (diffs, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diffs);
    case 'plain':
      return plain(diffs);
    default:
      throw new Error('Этот формат мне не знаком ¯\\_(ツ)_//¯');
  }
};

export default formatter;
