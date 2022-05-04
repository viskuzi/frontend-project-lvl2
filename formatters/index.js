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

const gendiff = (filepath1, filepath2, formatString = 'stylish') => {
  const firstObject = getObjectByFilename(filepath1);
  const secondObject = getObjectByFilename(filepath2);
  const diffStructure = generateDifferenceStructure(firstObject, secondObject);
  switch (formatString) {
    case 'stylish':
      return stylish(diffStructure);
    case 'plain':
      return plain(diffStructure);
    case 'json':
      return json(diffStructure);
    case 'capslock':
      return capslock(diffStructure);
    default:
      throw new Error(`Unknown format type: '${formatString}'!`);
  }
};

export default gendiff;
