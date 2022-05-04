const plain = (base, acc = '') => {
  const defineTypeOfValue = (value) => {
    if (value === null) {
      return null;
    } if (typeof value === 'boolean') {
      return value;
    } if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  };

  const result = [];

  base.forEach((element) => {
    if (element.objectType === 'removedObject') {
      result.push(`Property '${acc}${element.key}' was removed`);
    } else if (element.objectType === 'removedValue') {
      result.push(`Property '${acc}${element.key}' was removed`);
    } else if (element.objectType === 'addedValue') {
      result.push(`Property '${acc}${element.key}' was added with value: ${defineTypeOfValue(element.value)}`);
    } else if (element.objectType === 'addedObject') {
      result.push(`Property '${acc}${element.key}' was added with value: [complex value]`);
    } else if (element.objectType === 'objectToValue') {
      result.push(`Property '${acc}${element.key}' was updated. From [complex value] to ${defineTypeOfValue(element.plainValue)}`);
    } else if (element.objectType === 'valueToValue') {
      if (element.oldValue !== element.newValue) {
        result.push(`Property '${acc}${element.key}' was updated. From ${defineTypeOfValue(element.oldValue)} to ${defineTypeOfValue(element.newValue)}`);
      }
    } else if (element.objectType === 'valueToObject') {
      result.push(`Property '${acc}${element.key}' was updated. From ${defineTypeOfValue(element.plainValue)} to [complex value]`);
    } else if (element.objectType === 'objDiff') {
      const newAcc = `${acc}${element.key}.`;
      const stringWithComplexProperty = plain(element.diffs, newAcc);
      result.push(stringWithComplexProperty);
    }
  });

  return result.flat(10).join('\n');
};

export default plain;
