import generateDifferenceStructure from '../src/generarateDiff.js';
import objectByFilename from '../src/parsers.js';

const firstObject = objectByFilename('file1.json');
const secondObject = objectByFilename('file2.json');
const diffStructure = generateDifferenceStructure(firstObject, secondObject);
// console.log(diffStructure);

const plain = (base) => {
  const result = [];
  let sum = [];
  base.forEach((element) => {
    
    if (element.objectType === 'removedObject') {
      result.push(`Property '${element.key}' was removed`);
    } else if (element.objectType === 'removedValue') {
      result.push(`Property '${element.key}' was removed`);
    } else if (element.objectType === 'addedValue') {
      sum.push(element.key); // sum = [common, folow]
      result.push(`Property '${sum.join('.')} was added with value: ${element.value}`);
    } else if (element.objectType === 'addedObject') {
      result.push(`Property '${element.key}' was added with value: [complex value]`);
    } else if (element.objectType === 'objectToValue') {
      result.push(`Property '${element.key}' was updated. From [complex value] to ${element.plainValue}`);
    } else if (element.objectType === 'valueToObject') {
      result.push(`Property '${element.key}' was updated. From ${element.plainValue} to [complex value]`);
    } else if (element.objectType === 'objDiff') {
      sum.push(`${element.key}`);
      plain(element.diffs);
      result.push(`Property '${element.key}' was updated. From ${element.plainValue} to [complex value]`);
    }
  });
  return result;
};

export default plain;

console.log(plain(diffStructure));
