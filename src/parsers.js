import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

// Function which retrieves JSON object by given filename (entered by the user)
// - fileName, full path to fileName;

const getObjectByFilename = (fileName) => {
  const handledFileName = fileName.split('/');
  const extention = path.extname(fileName);

  if (handledFileName.length > 1) {
    const fileBuffer = readFileSync(fileName);
    switch (extention) {
      case '.json':
        return JSON.parse(fileBuffer, 'utf-8');
      case '.yml':
      case '.yaml':
        return yaml.load(fileBuffer, 'utf-8');
      default:
        throw new Error(`Format '${extention}' is not supported.`);
    }
  } else {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const pathToFile = path.join(__dirname, '..', '__fixtures__', fileName);
    switch (extention) {
      case '.json':
        return JSON.parse(readFileSync(pathToFile), 'utf-8');
      case '.yml':
      case '.yaml':
        return yaml.load(readFileSync(pathToFile), 'utf-8');
      default:
        throw new Error(`Format '${extention}' is not supported.`);
    }
  }
};

getObjectByFilename('file1.json');
export default getObjectByFilename;
