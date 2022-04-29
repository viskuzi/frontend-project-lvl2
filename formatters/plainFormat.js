import generateDifferenceStructure from '../src/generarateDiff.js';
import objectByFilename from '../src/parsers.js';

const firstObject = objectByFilename('file1.json');
const secondObject = objectByFilename('file2.json');
const diffStructure = generateDifferenceStructure(firstObject, secondObject);
// console.log(diffStructure);

const plain = (base, sum = '') => {
  const defineTypeOfValue = (value) => {
    if (value === null) {
      return null;
    } if (typeof value === 'boolean') {
      return value;
    } if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  };

  const result = [];

  base.forEach((element) => {
    if (element.objectType === 'removedObject') {
      result.push(`Property '${sum}${element.key}' was removed`);
    } else if (element.objectType === 'removedValue') {
      result.push(`Property '${sum}${element.key}' was removed`);
    } else if (element.objectType === 'addedValue') {
      result.push(`Property '${sum}${element.key}' was added with value: ${defineTypeOfValue(element.value)}`);
    } else if (element.objectType === 'addedObject') {
      result.push(`Property '${sum}${element.key}' was added with value: [complex value]`);
    } else if (element.objectType === 'objectToValue') {
      result.push(`Property '${sum}${element.key}' was updated. From [complex value] to ${defineTypeOfValue(element.plainValue)}`);
    } else if (element.objectType === 'valueToValue') {
      if (element.oldValue !== element.newValue) {
        result.push(`Property '${sum}${element.key}' was updated. From ${defineTypeOfValue(element.oldValue)} to ${defineTypeOfValue(element.newValue)}`);
      }
    } else if (element.objectType === 'valueToObject') {
      result.push(`Property '${sum}${element.key}' was updated. From ${defineTypeOfValue(element.plainValue)} to [complex value]`);
    } else if (element.objectType === 'objDiff') {
      const acc = `${sum}${element.key}.`;
      const diffResult = plain(element.diffs, acc);
      result.push(diffResult);
    }
  });

  return result.flat(Infinity).join('\n');
};

export default plain;
