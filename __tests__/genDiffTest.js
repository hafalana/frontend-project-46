import path from 'path';
import { genDiff } from '../src/index.js';

describe('compare flat JSON objects', () => {
  test('should return the correct differences', () => {
    const data1 = { key1: 'value1', key2: 'value2' };
    const data2 = { key1: 'value1', key2: 'new value' };

    const expectedOutput = `- key2: value2
+ key2: new value`;

    expect(genDiff(data1, data2)).toBe(expectedOutput);
  });

  test('should return added and removed keys', () => {
    const data1 = { key1: 'value1' };
    const data2 = { key1: 'value1', key2: 'value2' };

    const expectedOutput = '+ key2: value2';

    expect(genDiff(data1, data2)).toBe(expectedOutput);
  });

  test('should return removed keys', () => {
    const data1 = { key1: 'value1', key2: 'value2' };
    const data2 = { key1: 'value1' };

    const expectedOutput = '- key2: value2';

    expect(genDiff(data1, data2)).toBe(expectedOutput);
  });
});

describe('compare YAML files', () => {
  test('should return differences', () => {
    const filePath1 = path.resolve(__dirname, '..', '__fixtures__', 'filepath1.yaml');
    const filePath2 = path.resolve(__dirname, '..', '__fixtures__', 'filepath2.yaml');

    const result = genDiff(filePath1, filePath2);

    expect(result).toEqual(`
        {
        - timeout: 50
        + timeout: 20
        - proxy: 123.234.53.22
        - follow: false
        + verbose: true
        }
        `);
  });
});
