/* eslint-disable no-undef */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/genDiff.js';
import handleCommandLineProgram from '../formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('testing yaml files', () => {
  expect(handleCommandLineProgram('file1.yml', 'file2.yml')).toEqual(readFile('expected_file.diff'));
});

test('testing complex json', () => {
  expect(handleCommandLineProgram('file1.json', 'file2.json')).toEqual(readFile('expected_file.diff'));
});
