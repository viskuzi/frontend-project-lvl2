import _ from 'lodash';

const capslock = (base, depth = 1, replacer = '  ') => {
  const PLUS_OPERATOR = '+';
  const MINUS_OPERATOR = '-';
  const result = [];

  const iterPrint = (obj, DEPTH = 1, REPLACERs = '    ') => {
    const lines = [];
    const fileKeys = Object.keys(obj);

    fileKeys.forEach((key) => {
      if (_.isObject(obj[key])) {
        const line = iterPrint(obj[key], DEPTH + 1);
        lines.push(`${REPLACERs.repeat(DEPTH)}${key}: ${line}`);
      } else {
        lines.push(`${REPLACERs.repeat(DEPTH)}${key}: ${obj[key]}`);
      }
    });
    const shiftedLines = lines.map((line) => `\n${line}`);
    return `{${shiftedLines.join('')}\n${REPLACERs.repeat(DEPTH - 1)}}`;
  };

  base.forEach((element) => {
    if (element.objectType === 'objDiff') {
      const line1 = capslock(element.diffs, depth + 1);
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
  const shiftedLines = result.map((res) => `\n${res.toUpperCase()}`);

  return `{${shiftedLines.join('')}\n${replacer.repeat((depth - 1) * 2)}}`;
};

export default capslock;
