// eslint-disable-next-line no-unused-vars
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
