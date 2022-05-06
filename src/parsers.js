import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Function which retrieves JSON object by given filename (entered by the user)
// - fileName, full path to fileName;
const getObjectByFilename = (fileName) => {
  const fileBuffer = readFileSync(fileName);
  const extention = path.extname(fileName);
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
