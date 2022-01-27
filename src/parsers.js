import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const parser = (fileName) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pathToFile = path.join(__dirname, '..', '__fixtures__', fileName);
  let obj;
  const extention = path.extname(fileName);
  if (extention === '.yml' || extention === '.yaml') {
    obj = yaml.load(readFileSync(pathToFile), 'utf-8');
  } else if (path.extname(fileName) === '.json') {
    obj = JSON.parse(readFileSync(pathToFile), 'utf-8');
  }
  return obj;
};

export default parser;
