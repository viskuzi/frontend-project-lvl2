import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

// Function which retrieves JSON object by given filename (entered by the user)
// - fileName, the name of the file entered by the user
const getObjectByFilename = (fileName) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pathToFile = path.join(__dirname, '..', '__fixtures__', fileName);
  const yamlString = readFileSync(pathToFile);
  const extention = path.extname(fileName);
  switch (extention) {
    case '.json':
      return JSON.parse(readFileSync(pathToFile), 'utf-8');
    case '.yml':
    case '.yaml':
      return yaml.load(yamlString, 'utf-8');
    default:
      throw new Error(`Format '${extention}' is not supported.`);
  }
};

export default getObjectByFilename;
