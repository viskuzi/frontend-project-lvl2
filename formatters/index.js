import gendiff from '../src/genDiff.js';
import stylishFormat from '../formatters/stylishFormat.js'
import plainFormat from '../formatters/plain.js'
import capslockFormat from '../formatters/capslockFormat.js'

const diff = (filepath1, filepath2, format) => {
    switch (format) {
      case 'stylish':
        return gendiff(filepath1, filepath2, stylishFormat);
      case 'capslock':
        return gendiff(filepath1, filepath2, capslockFormat);
      case 'plain':
        return plainFormat(6);
      default:
        console.log('new erorr');
        return gendiff(filepath1, filepath2, stylishFormat);
    }
};

export default diff;
