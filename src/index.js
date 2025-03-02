import _ from 'lodash';
import fs from 'fs';
import path, { extname } from 'path';

const getFileFormat = (filepath) => extname(filepath).slice(1);
const getFileContent = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');

const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const uniqueKeys = _.uniq([...keys1, ...keys2]);

  const diff = uniqueKeys.map((key) => {
    if (!(key in data1)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (!(key in data2)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return null;
  }).filter((line) => line !== null).join('\n');

  return `{\n${diff}\n}`;
};

export { getFileFormat, getFileContent, genDiff };
