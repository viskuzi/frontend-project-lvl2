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

  const elementsArray = base.map((element) => {
    if (element.objectType === 'removedObject') {
      return `Property '${acc}${element.key}' was removed`;
    } if (element.objectType === 'removedValue') {
      return `Property '${acc}${element.key}' was removed`;
    } if (element.objectType === 'addedValue') {
      return `Property '${acc}${element.key}' was added with value: ${defineTypeOfValue(element.value)}`;
    } if (element.objectType === 'addedObject') {
      return `Property '${acc}${element.key}' was added with value: [complex value]`;
    } if (element.objectType === 'objectToValue') {
      return `Property '${acc}${element.key}' was updated. From [complex value] to ${defineTypeOfValue(element.plainValue)}`;
    } if (element.objectType === 'valueToValue' && element.oldValue !== element.newValue) {
      return `Property '${acc}${element.key}' was updated. From ${defineTypeOfValue(element.oldValue)} to ${defineTypeOfValue(element.newValue)}`;
    } if (element.objectType === 'valueToObject') {
      return `Property '${acc}${element.key}' was updated. From ${defineTypeOfValue(element.plainValue)} to [complex value]`;
    } if (element.objectType === 'objDiff') {
      const newAcc = `${acc}${element.key}.`;
      const stringWithComplexProperty = plain(element.diffs, newAcc);
      return stringWithComplexProperty;
    }

    return null;
  });

  const result = elementsArray
    .filter((elem) => elem !== null);

  return result.join('\n');
};

export default plain;
