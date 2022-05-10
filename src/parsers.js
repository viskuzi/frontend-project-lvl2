import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

// Function which retrieves JSON object by given filename (entered by the user)
// - fileName, full path to fileName;
const detectFileNamePath = (filename) => {
  const handledFileName = filename.split('/');
  if (handledFileName.length > 1) {
    return readFileSync(filename);
  }
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pathToFile = path.join(__dirname, '..', '__fixtures__', filename);
  return readFileSync(pathToFile);
};

const getObjectByFilename = (fileName) => {
  const extention = path.extname(fileName);
  const fileBuffer = detectFileNamePath(fileName);

  switch (extention) {
    case '.json':
      return JSON.parse(fileBuffer, 'utf-8');
    case '.yml':
    case '.yaml':
      return yaml.load(fileBuffer, 'utf-8');
    default:
      throw new Error(`Format '${extention}' is not supported.`);
  }
};

export default getObjectByFilename;
