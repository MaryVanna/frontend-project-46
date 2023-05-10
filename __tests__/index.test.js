import genDiff from '../index.js';

test('genDiff test', () => {
  const actual = genDiff('./examples/file1.json', './examples/file2.json');
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(actual).toEqual(expected);
});
