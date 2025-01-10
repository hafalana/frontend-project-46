#!/usr/bin/env node
import { Command } from 'commander';
import parseFile from '../src/parsers.js';
import { getFileFormat, getFileContent, genDiff } from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'path to the first configuration file')
  .argument('<filepath2>', 'path to the second configuration file')
  .option('-f, --format <type>', 'output format', 'stylish')
  .version('0.0.1');

program.action((filepath1, filepath2) => {
  const fileData1 = getFileContent(filepath1);
  const fileData2 = getFileContent(filepath2);

  const parseFile1 = parseFile(fileData1, getFileFormat(filepath1));
  const parseFile2 = parseFile(fileData2, getFileFormat(filepath2));

  const difference = genDiff(parseFile1, parseFile2);

  console.log(difference);
});

program.parse(process.argv);
