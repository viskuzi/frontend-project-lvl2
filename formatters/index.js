import stylish from './stylishFormat.js';
import plainFormat from './plain.js';
import objectByFilename from '../src/parsers.js';
import generateDifferenceStructure from '../src/GENDIFF.js';

// Function which handles command line program overall
//  - filepath1 - path for file 1 on computer filesystem
//  - filepath2 - path for file 2 on computer filesystem
//  - formatString - unique string passed by user as an option for --format

const handleCommandLineProgram = (filepath1, filepath2, formatString) => {
  const firstObject = objectByFilename(filepath1);
  const secondObject = objectByFilename(filepath2);
  const diffStructure = generateDifferenceStructure(firstObject, secondObject);

  if (formatString === 'stylish') {
    return stylish(diffStructure);
  } return plainFormat(6);
};

export default handleCommandLineProgram;
