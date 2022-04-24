#!/usr/bin/env node
import program from 'commander';
import gendiff from '../src/genDiff.js';

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
    handleCommandLineProgram(filepath1, filepath2, options.format)
  }
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
}

// Function which generates the structure representing the difference between 2 json objects
// - objOne, the first json object
// - objTwo, the second json object
const generateDifferenceStructure = (objOne, objTwo) => {
    let commonDiffs = [] // []

    commonDiffs.push(createAddedValue("follow", false));
    // [{ objectType: "addedValue", key: "follow", value: false }]
    commonDiffs.push(createValueToValue("setting1", "Value 1", "Value 1"));
    // [{ objectType: "addedValue", key: "follow", value: false },
    // { objectType: "valueToValue", key: "setting1", oldValue: "Value 1", newValue: "Value 1"}]
    commonDiffs.push(createRemovedValue("setting2", 200));
    // [
    // { objectType: "addedValue", key: "follow", value: false },
    // { objectType: "valueToValue", key: "setting1", oldValue: "Value 1", newValue: "Value 1"},
    // { objectType: "removedValue", key: "setting2", value: 200},
    // ]
    commonDiffs.push(createRemovedValue("setting3", true));
    // [{{ objectType: "addedValue", key: "follow", value: false}},
    // { objectType: "valueToValue", key: "setting1", oldValue: "Value 1", newValue: "Value 1"},
    // { objectType: "removedValue", key: "setting2", value: 200},
    // { objectType: "removedValue", key: "setting3", value: true}]

    let topLevelDiffs = []
    // []
    topLevelDiffs.push(createObjDiff("common", commonDiffs));
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
}

// ***************************

{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
    }
}

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
const createValueToValue = (key, before, after) => {
    return { objectType: "valueToValue", key: key, oldValue: before, newValue: after};
}

// Creates value-to-object diff object
// - key, string name of the key
// - value, old plain value
// - obj, new object value
const createValueToObject = (key, value, obj) => {
    return { objectType: "valueToObject", key: key, plainValue: value, objectValue: obj};
}

// Creates value-to-object diff object
// - key, string name of the key
// - value, new plain value
// - obj, old object value
const createObjectToValue = (key, value, obj) => {
    return { objectType: "objectToValue", key: key, plainValue: value, objectValue: obj};
}

// Creates removed-object diff object
// - key, string name of the key
// - obj, old object value
const createRemovedObject = (key, obj) => {
    return { objectType: "removedObject", key: key, value: obj};
}

// Creates removed-value diff object
// - key, string name of the key
// - value, old plain value
const createRemovedValue = (key, value) => {
    return { objectType: "removedValue", key: key, value: value};
}

// Creates added-object diff object
// - key, string name of the key
// - obj, new object value
const createAddedObject = (key, obj) => {
    return { objectType: "addedObject", key: key, value: obj};
}

// Creates added-value diff object
// - key, string name of the key
// - obj, new plain value
const createAddedValue = (key, value) => {
    return { objectType: "addedValue", key: key, value: value};
}

// Created obj-diff diff object (object is present before and after)
// - key, string name of the key
// - diffObjectArray, array of diff objects of different kinds
const createObjDiff = (key, diffObjectArray) => {
    return { objectType: "objDiff", key: key, diffs: diffObjectArray};
}

program.parse();