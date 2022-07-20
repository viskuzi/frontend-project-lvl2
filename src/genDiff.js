import plain from './plain.js';
import stylish from './stylish.js';

const gendiff = (fileName1, fileName2, format) => {
  switch (format) {
    case 'stylish':
      return stylish(fileName1, fileName2);
    case 'plain':
      return plain(fileName1, fileName2);
    default:
      return `Format is not supported: ${format}`;
  }
};

export default gendiff;
