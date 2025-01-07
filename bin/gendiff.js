#!/usr/bin/env node
import { Command } from 'commander';
import readFile from '../src/fileParse.js';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'path to the first configuration file')
  .argument('<filepath2>', 'path to the second configuration file')
  .option('-f, --format <type>', 'output format', 'stylish')
  .version('0.0.1')

program.action((filepath1, filepath2) => {
  try {
  const fileData1 = readFile(filepath1);
  const fileData2 = readFile(filepath2);

  const difference = genDiff(fileData1, fileData2);
  console.log(difference);
  } catch (error) {
    console.error(`Error reading files: ${error.message}`);
  }

});
program.parse(process.argv);