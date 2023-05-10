import getDiffs from '../src/getDiffs.js';
import parse from '../src/parse.js';

const data1 = parse('./examples/file1.json');
const data2 = parse('./examples/file2.json');

test('finding diffs', () => {
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(getDiffs(data1, data2)).toEqual(expected);
});
