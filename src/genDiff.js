import _ from 'lodash';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const gendiff = (firstFileName, secondFileName) => {
  const pathToFirstFile = path.join(__dirname, '..', '__fixtures__', firstFileName);
  const pathToSecondFile = path.join(__dirname, '..', '__fixtures__', secondFileName);

  const firstObj = JSON.parse(readFileSync(pathToFirstFile), 'utf-8');
  const secondObj = JSON.parse(readFileSync(pathToSecondFile), 'utf-8');

  const firstFileKeys = Object.keys(firstObj);
  const secondFileKeys = Object.keys(secondObj);
  const allKeys = _.union(firstFileKeys, secondFileKeys);
  const allSortedKeys = _.sortBy(allKeys);
  const commonProperties = {};
  const PLUS_OPERATOR = '+';
  const MINUS_OPERATOR = '-';

  allSortedKeys.forEach((key) => {
    if (_.has(secondObj, key) && _.has(firstObj, key)) {
      if (firstObj[key] === secondObj[key]) {
        commonProperties[`  ${key}`] = firstObj[key];
      } else {
        commonProperties[`${MINUS_OPERATOR} ${key}`] = firstObj[key];
        commonProperties[`${PLUS_OPERATOR} ${key}`] = secondObj[key];
      }
    } else if (_.has(firstObj, key) && !_.has(secondObj, key)) {
      commonProperties[`${MINUS_OPERATOR} ${key}`] = firstObj[key];
    } else if (_.has(secondObj, key) && !_.has(firstObj, key)) {
      commonProperties[`${PLUS_OPERATOR} ${key}`] = secondObj[key];
    }
  });

  const result = JSON.stringify(commonProperties, null, 2);
  return result.replace(/"/g, '').replace(/,/g, '');
};

export default gendiff;
gendiff('file1.json', 'file2.json');
