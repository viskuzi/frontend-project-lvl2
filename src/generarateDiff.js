/* eslint-disable max-len */
import _ from 'lodash';

// Creates value-to-value diff object
// - key, string name of the key
// - before, old value (plain)
// - after, new value (plain)

const createValueToValue = (key, before, after) => ({
  objectType: 'valueToValue', key, oldValue: before, newValue: after,
});

// Creates value-to-object diff object
// - key, string name of the key
// - value, old plain value
// - obj, new object value
const createValueToObject = (key, value, obj) => ({
  objectType: 'valueToObject', key, plainValue: value, objectValue: obj,
});

// Creates value-to-object diff object
// - key, string name of the key
// - obj, old object value
// - value, new plain value

const createObjectToValue = (key, obj, value) => ({
  objectType: 'objectToValue', key, objectValue: obj, plainValue: value,
});

// Creates removed-object diff object
// - key, string name of the key
// - obj, old object value
const createRemovedObject = (key, obj) => ({ objectType: 'removedObject', key, value: obj });

// Creates removed-value diff object
// - key, string name of the key
// - value, old plain value
const createRemovedValue = (key, value) => ({ objectType: 'removedValue', key, value });

// Creates added-object diff object
// - key, string name of the key
// - obj, new object value
const createAddedObject = (key, obj) => ({ objectType: 'addedObject', key, value: obj });

// Creates added-value diff object
// - key, string name of the key
// - obj, new plain value
const createAddedValue = (key, value) => ({ objectType: 'addedValue', key, value });

// Created obj-diff diff object (object is present before and after)
// - key, string name of the key
// - diffObjectArray, array of diff objects of different kinds
const createObjDiff = (key, diffObjectArray) => ({ objectType: 'objDiff', key, diffs: diffObjectArray });

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

export default generateDifferenceStructure;
