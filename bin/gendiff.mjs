#!/usr/bin/env node
import { Command } from "commander";
import readFile from "../src/fileParse.js";
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'path to the first configuration file')
  .argument('<filepath2>', 'path to the second configuration file')
  .option('-f, --format <type>', 'output format')
  .version('0.0.1')

program.action((filepath1, filepath2) => {
  const fileData1 = readFile(filepath1);
  const fileData2 = readFile(filepath2);

  console.log('FileData 1:', fileData1);
  console.log('FileData 2:', fileData2);

});
program.parse(process.argv);

const genDiff = (filepath1, filepath2) => {
    const diff = {};
    return diff;
};


export default genDiff;