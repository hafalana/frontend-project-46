import genDiff from '../src/index.js';

test('compare flat JSON objects', () => {
  const data1 = { key1: 'value1', key2: 'value2' };
  const data2 = { key1: 'value1', key2: 'new value' };

  expect(genDiff(data1, data2)).toBe('- key2: value2\n+ key2: new value');
});

test('compare JSON files', () => {
  const result = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  expect(result).toEqual(`
{
  - follow: false
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
`);
});

test('compare YAML files', () => {
  const result = genDiff('__fixtures__/filepath1.yml', '__fixtures__/filepath2.yml');
  expect(result).toEqual(`
{
  - follow: false
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
`);
});
