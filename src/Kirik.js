import _ from 'lodash';

const iterPrint = (obj, depth = 1, replacer = '    ', replacersCount = 1) => {
  const lines = [];
  const fileKeys = Object.keys(obj);
  const sortedKeys = _.sortBy(fileKeys);

  sortedKeys.forEach((key) => {
    if (_.isObject(obj[key])) {
      const line = iterPrint(obj[key], depth + 1);
      lines.push(`${replacer.repeat(replacersCount * depth)}${key}: ${line}`);
    } else {
      lines.push(`${replacer.repeat(replacersCount * depth)}${key}: ${obj[key]}`);
    }
  });
  const shiftedLines = lines.map((line) => `\n${line}`);
  return `{${shiftedLines.join('')}\n${replacer.repeat(replacersCount * depth - replacersCount)}}`;
};

const value = { key5: 'value5' };
console.log(iterPrint(value, 2));


//************************************/

#!/usr/bin/env node
/* eslint-disable object-curly-newline */
/* eslint-disable object-shorthand */
/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import program from 'commander';
import _ from 'lodash';

// Creates value-to-value diff object
// - key, string name of the key
// - before, old value (plain)
// - after, new value (plain)

const createValueToValue = (key, before, after) => {
  return { objectType: "valueToValue", key: key, oldValue: before, newValue: after };
};

// Creates value-to-object diff object
// - key, string name of the key
// - value, old plain value
// - obj, new object value
const createValueToObject = (key, value, obj) => {
  return { objectType: "valueToObject", key: key, plainValue: value, objectValue: obj };
};

// Creates value-to-object diff object
// - key, string name of the key
// - obj, old object value
// - value, new plain value

const createObjectToValue = (key, obj, value) => {
  return { objectType: "objectToValue", key: key, objectValue: obj, plainValue: value };
};

// Creates removed-object diff object
// - key, string name of the key
// - obj, old object value
const createRemovedObject = (key, obj) => {
  return { objectType: "removedObject", key: key, value: obj };
};

// Creates removed-value diff object
// - key, string name of the key
// - value, old plain value
const createRemovedValue = (key, value) => {
  return { objectType: "removedValue", key: key, value: value };
};

// Creates added-object diff object
// - key, string name of the key
// - obj, new object value
const createAddedObject = (key, obj) => {
  return { objectType: "addedObject", key: key, value: obj };
};

// Creates added-value diff object
// - key, string name of the key
// - obj, new plain value
const createAddedValue = (key, value) => {
  return { objectType: "addedValue", key: key, value: value };
};

// Created obj-diff diff object (object is present before and after)
// - key, string name of the key
// - diffObjectArray, array of diff objects of different kinds
const createObjDiff = (key, diffObjectArray) => {
  return { objectType: "objDiff", key: key, diffs: diffObjectArray };
};

// Function which generates the structure representing the difference between 2 json objects
// - firstObject, the first json object
// - secondObject, the second json object
const generateDifferenceStructure = (firstObject, secondObject) => {
  const firstFileKeys = Object.keys(firstObject);
  const secondFileKeys = Object.keys(secondObject);
  const allKeys = _.union(firstFileKeys, secondFileKeys);
  const allSortedKeys = _.sortBy(allKeys);

  const commonDiffs = [];
  allSortedKeys.forEach((key) => {
    if (_.has(secondObject, key) && !_.has(firstObject, key) && !_.isObject(secondObject[key])) {
      commonDiffs.push(createAddedValue(key, secondObject[key]));
    } else if (_.has(secondObject, key) && !_.has(firstObject, key) && _.isObject(secondObject[key])) {
      commonDiffs.push(createAddedObject(key, secondObject[key]));
    } else if (!_.has(secondObject, key) && _.has(firstObject, key) && !_.isObject(firstObject[key])) {
      commonDiffs.push(createRemovedValue(key, firstObject[key]));
    } else if (!_.has(secondObject, key) && _.has(firstObject, key) && _.isObject(firstObject[key])) {
      commonDiffs.push(createRemovedObject(key, firstObject[key]));
    } else if (_.has(secondObject, key) && _.has(firstObject, key) && _.isObject(firstObject[key]) && !_.isObject(secondObject[key])) {
      commonDiffs.push(createObjectToValue(key, firstObject[key], secondObject[key]));
    } else if (_.has(secondObject, key) && _.has(firstObject, key) && !_.isObject(firstObject[key]) && _.isObject(secondObject[key])) {
      commonDiffs.push(createValueToObject(key, firstObject[key], secondObject[key]));
    } else if (_.has(secondObject, key) && _.has(firstObject, key) && !_.isObject(firstObject[key]) && !_.isObject(secondObject[key])) {
      commonDiffs.push(createValueToValue(key, firstObject[key], secondObject[key]));
    } else if (_.has(secondObject, key) && _.has(firstObject, key) && _.isObject(firstObject[key]) && _.isObject(secondObject[key])) {
      const cardArray = generateDifferenceStructure(firstObject[key], secondObject[key]);
      const envelope = createObjDiff(key, cardArray);
      commonDiffs.push(envelope);
    }
  });
  return commonDiffs;
};

const stylish = (base, depth = 1, replacer = '  ') => {
  const PLUS_OPERATOR = "+";
  const MINUS_OPERATOR = "-";
  const result = [];

  const iterPrint = (obj, DEPTH = 1, REPLACER = '    ') => {
    const lines = [];
    const fileKeys = Object.keys(obj);

    fileKeys.forEach((key) => {
      if (_.isObject(obj[key])) {
        const line = iterPrint(obj[key], DEPTH + 1);
        lines.push(`${REPLACER.repeat(DEPTH)}${key}: ${line}`);
      } else {
        lines.push(`${REPLACER.repeat(DEPTH)}${key}: ${obj[key]}`);
      }
    });
    const shiftedLines = lines.map((line) => `\n${line}`);
    return `{${shiftedLines.join('')}\n${REPLACER.repeat(DEPTH - 1)}}`;
  };

  base.forEach((element) => {
    if (element.objectType === 'objDiff') {
      const line1 = gendiff(element.diffs, depth + 1);
      result.push(`${replacer.repeat(depth * 2)}${element.key}: ${line1}`);
    } else if (element.objectType === 'addedObject') {
      const line2 = iterPrint(element.value, depth + 1);
      result.push(`${replacer.repeat(depth * 2 - 1)}${PLUS_OPERATOR} ${element.key}: ${line2}`);
    } else if (element.objectType === 'removedObject') {
      const line3 = iterPrint(element.value, depth + 1);
      result.push(`${replacer.repeat(depth * 2 - 1)}${MINUS_OPERATOR} ${element.key}: ${line3}`);
    } else if (element.objectType === 'addedValue') {
      result.push(`${replacer.repeat(depth * 2 - 1)}${PLUS_OPERATOR} ${element.key}: ${element.value}`);
    } else if (element.objectType === 'removedValue') {
      result.push(`${replacer.repeat(depth * 2 - 1)}${MINUS_OPERATOR} ${element.key}: ${element.value}`);
    } else if (element.objectType === 'objectToValue') {
      const line4 = iterPrint(element.objectValue, depth + 1);
      result.push(`${replacer.repeat(depth * 2 - 1)}${MINUS_OPERATOR} ${element.key}: ${line4}`);
      result.push(`${replacer.repeat(depth * 2 - 1)}${PLUS_OPERATOR} ${element.key}: ${element.plainValue}`);
    } else if (element.objectType === 'valueToObject') {
      const line5 = iterPrint(element.objectValue, depth + 1);
      result.push(`${replacer.repeat(depth * 2 - 1)}${MINUS_OPERATOR} ${element.key}: ${element.plainValue}`);
      result.push(`${replacer.repeat(depth * 2 - 1)}${PLUS_OPERATOR} ${element.key}: ${line5}`);
    } else if (element.objectType === 'valueToValue') {
      if (element.oldValue === element.newValue) {
        result.push(`${replacer.repeat(depth * 2)}${element.key}: ${element.oldValue}`);
      } else {
        result.push(`${replacer.repeat(depth * 2 - 1)}${MINUS_OPERATOR} ${element.key}: ${element.oldValue}`);
        result.push(`${replacer.repeat(depth * 2 - 1)}${PLUS_OPERATOR} ${element.key}: ${element.newValue}`);
      }
    }
  });
  const shiftedLines = result.map((res) => `\n${res}`);

  return `{${shiftedLines.join('')}\n${replacer.repeat(2 * (depth - 1))}}`;
};

// const diffStructure = generateDifferenceStructure(fileOne, fileTwo);
// console.log(gendiff(diffStructure));

// ****************************

// Function which retrieves JSON object given filename (entered by the user)
// - fileName, the name of the file entered by the user
const objectByFilename = (fileName) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pathToFile = path.join(__dirname, '..', '__fixtures__', fileName);
  let obj;
  const extention = path.extname(fileName);
  if (extention === '.yml' || extention === '.yaml') {
    obj = yaml.load(readFileSync(pathToFile), 'utf-8');
  } else if (path.extname(fileName) === '.json') {
    obj = JSON.parse(readFileSync(pathToFile), 'utf-8');
  }
  return obj;
};

// Function which handles command line program overall
//  - filepath1 - path for file 1 on computer filesystem
//  - filepath2 - path for file 2 on computer filesystem
//  - formatString - unique string passed by user as an option for --format
const handleCommandLineProgram = (filepath1, filepath2, formatString) => {
  const firstObject = objectByFilename(filepath1);
  const secondObject = objectByFilename(filepath2);
  const diffStructure = generateDifferenceStructure(firstObject, secondObject);

  if (formatString === 'stylish') {
    console.log(stylish(diffStructure));
  } console.log(36);

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-v, --version', 'output the version number')
  .option('-f, --format <type>', 'output for', 'stylish')
  .arguments('<filepath1> <filepath2>')
  // Parameters:
  //  - filepath1 - path for file 1 on computer filesystem
  //  - filepath2 - path for file 2 on computer filesystem
  //  - options - object which contains all the options (see .option() function) supported by this program
  .action((filepath1, filepath2, options = 'stylish') => {
    handleCommandLineProgram(filepath1, filepath2, options.format);
  });

program.parse();

export default handleCommandLineProgram;
