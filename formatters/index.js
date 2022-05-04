import json from './jsonFormat.js';
import stylish from './stylishFormat.js';
import plain from './plainFormat.js';
import capslock from './capslockFormat.js';
import getObjectByFilename from '../src/parsers.js';
import generateDifferenceStructure from '../src/generarateDiff.js';

// Function which handles command line program overall
//  - filepath1 - path for file 1 on computer filesystem
//  - filepath2 - path for file 2 on computer filesystem
//  - formatString - unique string passed by user as an option for --format

const gendiff = (filepath1, filepath2, formatString) => {
  const firstObject = getObjectByFilename(filepath1);
  const secondObject = getObjectByFilename(filepath2);
  const diffStructure = generateDifferenceStructure(firstObject, secondObject);

  if (formatString === 'stylish') {
    return stylish(diffStructure);
  } if (formatString === 'plain') {
    return plain(diffStructure);
  } if (formatString === 'capslock') {
    return capslock(diffStructure);
  } if (formatString === 'json') {
    return json(diffStructure);
  }

  console.log('You entered the wrong type of format. Return the result in stylish format');
  return stylish(diffStructure);
};

export default gendiff;
