#!/usr/bin/env node
import program from 'commander';
import gendiff from '../formatters/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-v, --version', 'output the version number')
<<<<<<< HEAD
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((firstFileName, secondFileName, { format }) => {
    console.log(gendiff(firstFileName, secondFileName, format));
  });
=======
  .option('-f, --format <type>', 'output for', 'stylish')
  .arguments('<filepath1> <filepath2>')
  // Parameters:
  //  - filepath1 - path for file 1 on computer filesystem
  //  - filepath2 - path for file 2 on computer filesystem
  //  - options - object which contains all the options (see .option() function) sup by this program
  .action((filepath1, filepath2, options = 'stylish') => {
    console.log(gendiff(filepath1, filepath2, options.format));
  });

>>>>>>> 219a93930d561f99bfbe723e5cfb3b1ef08afae6
program.parse();
