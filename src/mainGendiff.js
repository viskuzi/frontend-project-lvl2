import _ from 'lodash';
import parser from './parsers.js';

const stringify = (firstFileName, secondFileName) => {
  const firstObject = parser(firstFileName);
  const secondObject = parser(secondFileName);

  const iter = (firstObj, secondObj, depth, replacer = '  ', replacersCount = 1) => {
    const firstFileKeys = Object.keys(firstObj);
    const secondFileKeys = Object.keys(secondObj);
    const allKeys = _.union(firstFileKeys, secondFileKeys);
    const allSortedKeys = _.sortBy(allKeys);
    const PLUS_OPERATOR = '+';
    const MINUS_OPERATOR = '-';

    const lines = [];
    allSortedKeys.forEach((key) => {
      if (_.has(secondObj, key) && _.has(firstObj, key)) {
        if (_.isObject(firstObj[key]) && _.isObject(secondObj[key])) {
          const line = iter(firstObj[key], secondObj[key], depth + 1);
          lines.push(`${replacer.repeat(replacersCount * depth)}  ${key}: ${line}`);
        } else {
          lines.push(`${replacer.repeat(replacersCount * depth)}${MINUS_OPERATOR} ${key}: ${firstObj[key]}`);
          lines.push(`${replacer.repeat(replacersCount * depth)}${PLUS_OPERATOR} ${key}: ${secondObj[key]}`);
        }
      } else if (_.has(firstObj, key) && !_.has(secondObj, key)) {
        lines.push(`${replacer.repeat(replacersCount * depth)}${MINUS_OPERATOR} ${key}: ${firstObj[key]}`);
      } else if (_.has(secondObj, key) && !_.has(firstObj, key)) {
        lines.push(`${replacer.repeat(replacersCount * depth)}${PLUS_OPERATOR} ${key}: ${secondObj[key]}`);
      } else if (!_.isObject(firstObj[key]) && !_.isObject(secondObj[key])) {
        if (firstObj[key] === secondObj[key]) {
          lines.push(`${replacer.repeat(replacersCount * depth)}  ${key}: ${firstObj[key]}`);
        } else {
          lines.push(`${replacer.repeat(replacersCount * depth)}${MINUS_OPERATOR} ${key}: ${firstObj[key]}`);
          lines.push(`${replacer.repeat(replacersCount * depth)}${PLUS_OPERATOR} ${key}: ${secondObj[key]}`);
        }
      }
    });
    const shiftedLines = lines.map((line) => `\n${line}`);
    return `{${shiftedLines.join('')}\n${replacer.repeat(replacersCount * depth - replacersCount)}}`;
  };

  return iter(firstObject, secondObject, 1);
};

console.log(stringify('filepath1.json', 'filepath2.json'));
