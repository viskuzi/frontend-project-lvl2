/* eslint-disable no-dupe-else-if */
/* eslint-disable max-len */
// import _ from 'lodash';
// import parser from './parsers.js';

// const capslockFormat = (key, value1, depth = 1, REPLACER = '  ', replacersCount = 1, value2 = '') => {
//   const MINUS_OPERATOR = '-';
//   const PLUS_OPERATOR = '+';
//   let resultObject = {};

//   if (value1 === value2) {
//     if (value1 === null) {
//         return `${REPLACER.repeat(replacersCount * depth)}  ${key.toUpperCase()}: NULL`;
//       } else {
//         return `${REPLACER.repeat(replacersCount * depth)}  ${key.toUpperCase()}: ${value1.toString().toUpperCase()}`;
//       }
//   } else if (value1 !== value2) {
//       if (value1 === null) {
//         resultObject.outputForValue1 = `${REPLACER.repeat(replacersCount * depth)}${MINUS_OPERATOR} ${key.toUpperCase()}: NULL`,
//         resultObject.outputForValue2 = `${REPLACER.repeat(replacersCount * depth)}${PLUS_OPERATOR} ${key.toUpperCase()}: ${value2.toString().toUpperCase()}`;
//         return resultObject;
//       } else if (value2 === null) {
//           resultObject.outputForValue1 = `${REPLACER.repeat(replacersCount * depth)}${MINUS_OPERATOR} ${key.toUpperCase()}: ${value1.toString().toUpperCase()}`,
//           resultObject.outputForValue2 = `${REPLACER.repeat(replacersCount * depth)}${PLUS_OPERATOR} ${key.toUpperCase()}: NULL`;
//           return resultObject;
//       } else if (_.isObject(value1) && _.isObject(value2) ) {

//     }

//       {
//           resultObject.outputForValue1 = `${REPLACER.repeat(replacersCount * depth)}${MINUS_OPERATOR} ${key.toUpperCase()}: ${value1.toString().toUpperCase()}`,
//           resultObject.outputForValue2 = `${REPLACER.repeat(replacersCount * depth)}${PLUS_OPERATOR} ${key.toUpperCase()}: ${value2.toString().toUpperCase()}`;
//           return resultObject;
//       }
//   }
// };

// console.log(capslockFormat('setting3', { true: 'gsaa' }, 2, '  ', 1, { fff: 'iiiii' }));

// const gendiff = (firstFileName, secondFileName, formatFunction) => {
//   const firstObject = parser(firstFileName);
//   const secondObject = parser(secondFileName);

//   const iterPrint = (obj, depth = 1, replacer = '    ', replacersCount = 1) => {
//     const lines = [];
//     const fileKeys = Object.keys(obj);
//     const sortedKeys = _.sortBy(fileKeys);

//     sortedKeys.forEach((key) => {
//       if (_.isObject(obj[key])) {
//         const line = iterPrint(obj[key], depth + 1);
//         lines.push(`${replacer.repeat(replacersCount * depth)}${key}: ${line}`);
//       } else {
//         lines.push(`${replacer.repeat(replacersCount * depth)}${key}: ${obj[key]}`);
//       }
//     });
//     const shiftedLines = lines.map((line) => `\n${line}`);
//     return `{${shiftedLines.join('')}\n${replacer.repeat(replacersCount * depth - replacersCount)}}`;
//   };
//   const iter = (firstObj, secondObj, depth, replacer = '  ', replacersCount = 1) => {
//     const firstFileKeys = Object.keys(firstObj);
//     const secondFileKeys = Object.keys(secondObj);
//     const allKeys = _.union(firstFileKeys, secondFileKeys);
//     const allSortedKeys = _.sortBy(allKeys);
//     const PLUS_OPERATOR = '+';
//     const MINUS_OPERATOR = '-';

//     const lines = [];
//     allSortedKeys.forEach((key) => {
//       if (_.has(secondObj, key) && _.has(firstObj, key) && _.isObject(firstObj[key]) && _.isObject(secondObj[key])) {
//         const line = iter(firstObj[key], secondObj[key], depth + 1);
//         lines.push(formatFunction(key, line, depth, replacer = '  ', replacersCount));
//       } else if (_.has(secondObj, key) && _.has(firstObj, key) && !_.isObject(firstObj[key]) && !_.isObject(secondObj[key])) {
//         if (firstObj[key] === secondObj[key]) {
//           lines.push(formatFunction(key, firstObj[key], depth, replacer = '  ', replacersCount, secondObj[key]));
//           //  lines.push(`${replacer.repeat(replacersCount * depth)}  ${key}: ${firstObj[key]}`);
//         } else {
//           lines.push((formatFunction(key, firstObj[key], depth, '  ', replacersCount, secondObj[key])).outputForValue1);
//           lines.push((formatFunction(key, firstObj[key], depth, '  ', replacersCount, secondObj[key])).outputForValue2);
//           // lines.push(`${replacer.repeat(replacersCount * depth)}${MINUS_OPERATOR} ${key}: ${firstObj[key]}`);
//           // lines.push(`${replacer.repeat(replacersCount * depth)}${PLUS_OPERATOR} ${key}: ${secondObj[key]}`);
//         }
//       } else if (_.has(secondObj, key) && _.has(firstObj, key) && _.isObject(firstObj[key]) && !_.isObject(secondObj[key])) {
//         const line2 = iterPrint(firstObj[key], depth + 1);
//         lines.push(`${replacer.repeat(replacersCount * depth)}${MINUS_OPERATOR} ${key}: ${line2}`);
//         lines.push(`${replacer.repeat(replacersCount * depth)}${PLUS_OPERATOR} ${key}: ${secondObj[key]}`);
//       } else if (_.has(secondObj, key) && _.has(firstObj, key) && !_.isObject(firstObj[key]) && _.isObject(secondObj[key])) {
//         const line3 = iterPrint(secondObj[key], depth + 1);
//         lines.push(`${replacer.repeat(replacersCount * depth)}${MINUS_OPERATOR} ${key}: ${firstObj[key]}`);
//         lines.push(`${replacer.repeat(replacersCount * depth)}${PLUS_OPERATOR} ${key}: ${line3}`);
//       } else if (!_.has(secondObj, key) && _.has(firstObj, key)) {
//         if (_.isObject(firstObj[key])) {
//           const line4 = iterPrint(firstObj[key], depth + 1);
//           lines.push(`${replacer.repeat(replacersCount * depth)}${MINUS_OPERATOR} ${key}: ${line4}`);
//         } else {
//           lines.push(`${replacer.repeat(replacersCount * depth)}${MINUS_OPERATOR} ${key}: ${firstObj[key]}`);
//         }
//       } else if (_.has(secondObj, key) && !_.has(firstObj, key)) {
//         if (_.isObject(secondObj[key])) {
//           const line4 = iterPrint(secondObj[key], depth + 1);
//           lines.push(`${replacer.repeat(replacersCount * depth)}${PLUS_OPERATOR} ${key}: ${line4}`);
//         } else {
//           lines.push(`${replacer.repeat(replacersCount * depth)}${PLUS_OPERATOR} ${key}: ${secondObj[key]}`);
//         }
//       }
//     });
//     const shiftedLines = lines.map((line) => `\n${replacer.repeat(replacersCount * depth - replacersCount)}${line}`);
//     return `{${shiftedLines.join('')}\n${replacer.repeat(replacersCount * 2 * (depth - 1))}}`;
//   };

//   return iter(firstObject, secondObject, 1);
// };

// console.log(gendiff('file1.json', 'file2.json', capslockFormat));
