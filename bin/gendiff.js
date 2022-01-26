#!/usr/bin/env node

import program from 'commander';
import gendiff from '../src/genDiff.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-v, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((firstFileName, secondFileName) => console.log(gendiff(firstFileName, secondFileName)));

program.parse();
