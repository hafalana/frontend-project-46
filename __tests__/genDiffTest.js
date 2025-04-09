import genDiff from '../src/index.js';

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
