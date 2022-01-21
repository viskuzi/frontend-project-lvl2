#!/usr/bin/env node

import program from 'commander';
// eslint-disable-next-line import/extensions
import gendiff from '../src/genDiff.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-v, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  // eslint-disable-next-line no-console
  .action((filename1, filename2) => console.log(gendiff(filename1, filename2)));

program.parse();
