import stylish from './stylishFormat.js';
import plain from './plainFormat.js';
import capslock from './capslockFormat.js';
import objectByFilename from '../src/parsers.js';
import generateDifferenceStructure from '../src/generarateDiff.js';

// Function which handles command line program overall
//  - filepath1 - path for file 1 on computer filesystem
//  - filepath2 - path for file 2 on computer filesystem
//  - formatString - unique string passed by user as an option for --format

const handleCommandLineProgram = (filepath1, filepath2, formatString = 'stylish') => {
  const firstObject = objectByFilename(filepath1);
  const secondObject = objectByFilename(filepath2);
  const diffStructure = generateDifferenceStructure(firstObject, secondObject);

  if (formatString === 'stylish') {
    return stylish(diffStructure);
  } if (formatString === 'plain') {
    return plain(diffStructure);
  } if (formatString === 'capslock') {
    return capslock(diffStructure);
  }

  console.log('You entered wrong type of format. Return result in stylish format');
  return stylish(diffStructure);
};

export default handleCommandLineProgram;
