import _ from 'lodash';

const stringify = (dat, repl = ' ', space = 1) => {
  const iter = (data, replacer, spacesCount, depth) => {
    if (typeof data !== 'object') {
      return data.toString();
    }
    const lines = [];
    const arr = Object.entries(data);
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of arr) {
      const line = iter(value, replacer, spacesCount, depth + 1);
      lines.push(`${key}: ${line}`);
    }

    const shiftedLines = lines.map((line) => `\n${replacer.repeat(spacesCount * depth)}${line}`);

    return `{${shiftedLines.join('')}\n${replacer.repeat(spacesCount * depth - spacesCount)}}`;
  };

  return iter(dat, repl, space, 1);
};

export default stringify;

const stringify2 = (data1, data2) => {
  const iter = (dat1, dat2, depth, replacer = '  ', replacersCount = 1) => {
    if (typeof dat1 !== 'object') {
      dat1.toString();
    }
    if (typeof dat2 !== 'object') {
      dat2.toString();
    }
    if (typeof dat1 === 'object' && typeof dat2 === 'object') {
      const firstFileKeys = Object.keys(dat1);
      const secondFileKeys = Object.keys(dat2);
      const allKeys = _.union(firstFileKeys, secondFileKeys);
      const allSortedKeys = _.sortBy(allKeys);
      const PLUS_OPERATOR = '+';
      const MINUS_OPERATOR = '-';
      const lines = [];
      allSortedKeys.forEach((key) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key1, value1] of Object.entries(dat1)) {
          for (const [key2, value2] of Object.entries(dat2) ) {
            const line = iter(value1, value2, depth + 1);
            lines.push(`${key}: ${line}`);
    }
  }
});
      const shiftedLines = lines.map((line) => `\n${replacer.repeat(replacersCount * depth)}${line}`);

      return `{${shiftedLines.join('')}\n${replacer.repeat(replacersCount * depth - replacersCount)}}`;
    }
  };
  return iter(data1, data2, 1);
};

const data1 = {
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
};
const data2 = {
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": null,
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "deep": {
      "id": {
        "number": 45
      }
    },
    "fee": 100500
  }
};
stringify2(data1, data2);


if (_.has(firstObj, key) && !_.has(secondObj, key)) {
  lines.push(`${replacer.repeat(replacersCount * depth)} ${MINUS_OPERATOR}${key}: ${firstObj[key]}`);
} else if (_.has(secondObj, key) && !_.has(firstObj, key)) {
  lines.push(`${replacer.repeat(replacersCount * depth)} ${PLUS_OPERATOR}${key}: ${secondObj[key]}`);
} else if (_.has(secondObj, key) && _.has(firstObj, key) && firstObj[key].isObject && secondObj[key].isObject) {
  const line = iter(firstObj[key], secondObj[key], depth + 1);
  lines.push(`${key}: ${line}`);
}
// eslint-disable-next-line no-restricted-syntax
});
const shiftedLines = lines.map((line) => `\n${line}`);

return `{${shiftedLines.join('')}\n${replacer.repeat(replacersCount * depth - replacersCount)}}`;
};

return iter(firstObject, secondObject, 1);
};