import parse from '../src/parse.js';

test('parse file1.json', () => {
  const expected = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  expect(parse('./examples/file1.json')).toEqual(expected);
});
