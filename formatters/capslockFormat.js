import _ from 'lodash';

const getComplexObjectStructure = (obj, DEPTH = 1, REPLACER = '    ') => {
  const fileKeys = Object.keys(obj);

  const lines = fileKeys.map((key) => {
    if (_.isObject(obj[key])) {
      const line = getComplexObjectStructure(obj[key], DEPTH + 1);
      return `${REPLACER.repeat(DEPTH)}${key}: ${line}`;
    }

    return `${REPLACER.repeat(DEPTH)}${key}: ${obj[key]}`;
  });
  const shiftedLines = lines.map((line) => `\n${line}`);
  return `{${shiftedLines.join('')}\n${REPLACER.repeat(DEPTH - 1)}}`;
};

const stylish = (base, depth = 1, replacer = '  ') => {
  const PLUS_OPERATOR = '+';
  const MINUS_OPERATOR = '-';

  const lines = base.map((element) => {
    if (element.objectType === 'objDiff') {
      const line1 = stylish(element.diffs, depth + 1);
      return `${replacer.repeat(depth * 2)}${element.key}: ${line1}`;
    } if (element.objectType === 'addedObject') {
      const line2 = getComplexObjectStructure(element.value, depth + 1);
      return `${replacer.repeat(depth * 2 - 1)}${PLUS_OPERATOR} ${element.key}: ${line2}`;
    } if (element.objectType === 'removedObject') {
      const line3 = getComplexObjectStructure(element.value, depth + 1);
      return `${replacer.repeat(depth * 2 - 1)}${MINUS_OPERATOR} ${element.key}: ${line3}`;
    } if (element.objectType === 'addedValue') {
      return `${replacer.repeat(depth * 2 - 1)}${PLUS_OPERATOR} ${element.key}: ${element.value}`;
    } if (element.objectType === 'removedValue') {
      return `${replacer.repeat(depth * 2 - 1)}${MINUS_OPERATOR} ${element.key}: ${element.value}`;
    } if (element.objectType === 'objectToValue') {
      const line4 = getComplexObjectStructure(element.objectValue, depth + 1);
      return `${replacer.repeat(depth * 2 - 1)}${MINUS_OPERATOR} ${element.key}: ${line4}\n${replacer.repeat(depth * 2 - 1)}${PLUS_OPERATOR} ${element.key}: ${element.plainValue}`;
    } if (element.objectType === 'valueToObject') {
      const line5 = getComplexObjectStructure(element.objectValue, depth + 1);
      return `${replacer.repeat(depth * 2 - 1)}${MINUS_OPERATOR} ${element.key}: ${element.plainValue}\n${replacer.repeat(depth * 2 - 1)}${PLUS_OPERATOR} ${element.key}: ${line5}`;
    } if (element.objectType === 'valueToValue') {
      if (element.oldValue === element.newValue) {
        return `${replacer.repeat(depth * 2)}${element.key}: ${element.oldValue}`;
      }
      return `${replacer.repeat(depth * 2 - 1)}${MINUS_OPERATOR} ${element.key}: ${element.oldValue}\n${replacer.repeat(depth * 2 - 1)}${PLUS_OPERATOR} ${element.key}: ${element.newValue}`;
    }

    return base;
  });
  const shiftedLines = lines.map((res) => `\n${res.toUpperCase()}`);

  return `{${shiftedLines.join('')}\n${replacer.repeat((depth - 1) * 2)}}`;
};

export default stylish;
