import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseFile from './parsers.js';

const getFileFormat = (filepath) => path.extname(filepath).slice(1);
const getFileContent = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');

const genDiff = (data1, data2) => {
  let parsedData1;
  let parsedData2;

  if (typeof data1 === 'string' && typeof data2 === 'string') {
    const format1 = getFileFormat(data1);
    const format2 = getFileFormat(data2);

    const content1 = getFileContent(data1);
    const content2 = getFileContent(data2);

    parsedData1 = parseFile(content1, format1);
    parsedData2 = parseFile(content2, format2);
  } else {
    parsedData1 = data1;
    parsedData2 = data2;
  }

  const keys1 = Object.keys(parsedData1);
  const keys2 = Object.keys(parsedData2);

  const uniqueKeys = _.uniq([...keys1, ...keys2]);

  const diff = uniqueKeys.map((key) => {
    if (!(key in parsedData1)) {
      return `+ ${key}: ${parsedData2[key]}`;
    }
    if (!(key in parsedData2)) {
      return `- ${key}: ${parsedData1[key]}`;
    }
    if (parsedData1[key] !== parsedData2[key]) {
      return `- ${key}: ${parsedData1[key]}\n+ ${key}: ${parsedData2[key]}`;
    }
    return null;
  }).filter((line) => line !== null).join('\n');

  return diff;
};

export { getFileFormat, getFileContent, genDiff };
