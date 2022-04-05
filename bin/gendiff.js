#!/usr/bin/env node
import program from 'commander';
import gendiff from '../src/genDiff.js';

const stylishFormat = (key, value, depth = 1, REPLACER = '**', replacersCount = 1) => {
  return `${REPLACER.repeat(replacersCount * depth)}  ${key}: ${value}`;
};
const capslockFormat = (key, value, depth = 1, REPLACER = '**', replacersCount = 1) => {
  return `${REPLACER.repeat(replacersCount * depth)}  ${key.toUpperCase()}: ${value.toUpperCase()}`;
};

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-v, --version', 'output the version number')
  .option('-f, --format <type>', 'output for', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options = 'stylish') => {
    console.log(options.format);
    switch (options.format) {
      case 'stylish':
        console.log(gendiff(filepath1, filepath2, stylishFormat));
        return;
      case 'capslock':
        console.log(gendiff(filepath1, filepath2, capslockFormat));
        return;
      default:
        console.log(gendiff(filepath1, filepath2, stylishFormat));
        return;  
    }
  });

program.parse();



