import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

const gendiff = (firstFileName, secondFileName) => {
  const firstFile = JSON.parse(readFileSync(path.resolve(firstFileName)));
  const secondFile = JSON.parse(readFileSync(path.resolve(secondFileName)));

  const firstFileKeys = Object.keys(firstFile);
  const secondFileKeys = Object.keys(secondFile);
  const allKeys = _.union(firstFileKeys, secondFileKeys);
  const allSortedKeys = _.sortBy(allKeys);
  const commonProperties = {};
  const PLUS_OPERATOR = '+';
  const MINUS_OPERATOR = '-';

  allSortedKeys.forEach((key) => {
    if (_.has(secondFile, key) && _.has(firstFile, key)) {
      if (firstFile[key] === secondFile[key]) {
        commonProperties[`  ${key}`] = firstFile[key];
      } else {
        commonProperties[`${MINUS_OPERATOR} ${key}`] = firstFile[key];
        commonProperties[`${PLUS_OPERATOR} ${key}`] = secondFile[key];
      }
    } else if (_.has(firstFile, key) && !_.has(secondFile, key)) {
      commonProperties[`${MINUS_OPERATOR} ${key}`] = firstFile[key];
    } else if (_.has(secondFile, key) && !_.has(firstFile, key)) {
      commonProperties[`${PLUS_OPERATOR} ${key}`] = secondFile[key];
    }
  });

  const result = JSON.stringify(commonProperties, null, ' ');
  return result.replace(/"/g, '');
};

export default gendiff;
