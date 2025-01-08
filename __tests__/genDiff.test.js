import genDiff from './index.js';
   
test('compare flat JSON objects', () => {
    const data1 = { key1: 'value1', key2: 'value2' };
    const data2 = { key1: 'value1', key2: 'new value' };
    
    expect(genDiff(data1, data2)).toBe(`- key2: value2
+ key2: new value`);
});