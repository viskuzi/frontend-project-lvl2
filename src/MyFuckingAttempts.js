#!/usr/bin/env node
/* eslint-disable object-curly-newline */
/* eslint-disable object-shorthand */
/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import program from 'commander';
import _ from 'lodash';

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

// Created obj-diff diff object (object is present before and after)
// - key, string name of the key
// - diffObjectArray, array of diff objects of different kinds

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

// Function which handles command line program overall
//  - filepath1 - path for file 1 on computer filesystem
//  - filepath2 - path for file 2 on computer filesystem
//  - formatString - unique string passed by user as an option for --format
const handleCommandLineProgram = (filepath1, filepath2, formatString) => {
  const firstObject = objectByFilename(firstFileName);
  const secondObject = objectByFilename(secondFileName);
  const diffStructure = generateDifferenceStructure(firstObject, secondObject);

  // 2. Based on this diff object, print out the result in the respective format
};

// Function which generates the structure representing the difference between 2 json objects
// - firstObject, the first json object
// - secondObject, the second json object
const generateDifferenceStructure = (firstObject, secondObject) => {
  const firstFileKeys = Object.keys(firstObject);
  const secondFileKeys = Object.keys(secondObject);
  const allKeys = _.union(firstFileKeys, secondFileKeys);
  const allSortedKeys = _.sortBy(allKeys);
  const PLUS_OPERATOR = '+';
  const MINUS_OPERATOR = '-';
  const topLevelDiffs = [];
  const commonDiffs = [];
  allSortedKeys.forEach((key) => {
    if (_.has(secondObject, key) && !_.has(firstObject, key) && !_.isObject(secondObject[key])) {
      commonDiffs.push(createAddedValue(key, secondObject[key]));
    }
    // [{ objectType: "addedValue", key: "follow", value: false }]
    else if (_.has(secondObject, key) && !_.has(firstObject, key) && _.isObject(secondObject[key])) {
      commonDiffs.push(createAddedObject(key, secondObject[key]));
    }
    else if (!_.has(secondObject, key) && _.has(firstObject, key) && !_.isObject(firstObject[key])) {
      commonDiffs.push(createRemovedValue(key, firstObject[key]));
    }
    else if (!_.has(secondObject, key) && _.has(firstObject, key) && _.isObject(firstObject[key])) {
      commonDiffs.push(createRemovedObject(key, firstObject[key]));
    }
    else if (_.has(secondObject, key) && _.has(firstObject, key) && _.isObject(firstObject[key]) && !_.isObject(secondObject[key])) {
      commonDiffs.push(createObjectToValue(key, firstObject[key], secondObject[key]));
    }
    else if (_.has(secondObject, key) && _.has(firstObject, key) && !_.isObject(firstObject[key]) && _.isObject(secondObject[key])) {
      commonDiffs.push(createValueToObject(key, firstObject[key], secondObject[key]));
    }
    else if (_.has(secondObject, key) && _.has(firstObject, key) && !_.isObject(firstObject[key]) && !_.isObject(secondObject[key])) {
      commonDiffs.push(createValueToValue(key, firstObject[key], secondObject[key]));
    }
    else if (_.has(secondObject, key) && _.has(firstObject, key) && _.isObject(firstObject[key]) && _.isObject(secondObject[key])) {
      generateDifferenceStructure(firstObject[key], secondObject[key]);
    }

    // commonDiffs.push(createValueToValue("setting1", "Value 1", "Value 1"));
    // [{ objectType: "addedValue", key: "follow", value: false },
    // { objectType: "valueToValue", key: "setting1", oldValue: "Value 1", newValue: "Value 1"}]
    // commonDiffs.push(createRemovedValue("setting2", 200));
    // [
    // { objectType: "addedValue", key: "follow", value: false },
    // { objectType: "valueToValue", key: "setting1", oldValue: "Value 1", newValue: "Value 1"},
    // { objectType: "removedValue", key: "setting2", value: 200},
    // ]
    // commonDiffs.push(createRemovedValue("setting3", true));
    // [{{ objectType: "addedValue", key: "follow", value: false}},
    // { objectType: "valueToValue", key: "setting1", oldValue: "Value 1", newValue: "Value 1"},
    // { objectType: "removedValue", key: "setting2", value: 200},
    // { objectType: "removedValue", key: "setting3", value: true}]

    // let topLevelDiffs = []
    // []
    // topLevelDiffs.push(createObjDiff("common", commonDiffs));
    // [{ objectType: "objDiff", key: "common",
    //     diffs: [{ objectType: "addedValue", key: "follow", value: false },
    //          { objectType: "valueToValue", key: "setting1", oldValue: "Value 1", newValue: "Value 1"},
    //          { objectType: "removedValue", key: "setting2", value: 200},
    //          { objectType: "removedValue", key: "setting3", value: true}]}]

    // Magic happens here 🙂
//    topLevelDiffs.forEach(element => {
//        // Handle element
//        if (element.objectType = "objDiff") {
//            // Display our key
//            const str = "+ " + element.key;
//            // Go into recursion
//            let internalDiffs = element.diffs;
//
//            internalDiffs.forEach(internalElement => {
//                if (internalElement.objectType = "objDiff") {
//                  // do something
//                } else if (element.objectType = "blabla") ...
//            })
//        } else if (element.objectType = "blabla")
//    });

    return topLevelDiffs;
  });
};
const fileOne = {
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
};
const fileTwo = {
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": null,
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "deep": {
      "id": {
        "number": 45
      }
    },
    "fee": 100500
  }
};
console.log(generateDifferenceStructure(fileOne, fileTwo));
// ***************************

// {
//     common: {
//       + follow: false
//         setting1: Value 1
//       - setting2: 200
//       - setting3: true
//     }
// }

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

// ******** Utility function fot creation of diff objects ***********

// Creates value-to-value diff object
// - key, string name of the key
// - before, old value (plain)
// - after, new value (plain)
program.parse();
