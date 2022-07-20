/* eslint-disable no-undef */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
<<<<<<< HEAD
import stylish from '../src/stylish.js';
import plain from '../src/plain.js';
import gendiff from '../src/genDiff.js';
=======
import gendiff from '../formatters/index.js';
>>>>>>> 219a93930d561f99bfbe723e5cfb3b1ef08afae6

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

<<<<<<< HEAD
test('testing stylish json files', () => {
  expect(gendiff('file1.json', 'file2.json', 'stylish')).toEqual(readFile('mainGendiff.diff'));
});

test('testing yaml files', () => {
  expect(stylish('file1.yml', 'file2.yml')).toEqual(readFile('mainGendiff.diff'));
});

test('testing plain json files', () => {
  expect(gendiff('file1plain.json', 'file2plain.json', 'plain')).toEqual(readFile('expected_file.diff'));
});

test('testing error json files', () => {
  expect(gendiff('file1.json', 'file2.json', 'plai')).toEqual('Format is not supported: plai');
=======
test('testing stylish for yaml files', () => {
  expect(gendiff('file1.yml', 'file2.yml')).toEqual(readFile('stylishFormat.diff'));
});

test('testing stylish for json', () => {
  expect(gendiff('file1.json', 'file2.json')).toEqual(readFile('stylishFormat.diff'));
});

test('testing plain format', () => {
  expect(gendiff('file1.json', 'file2.json', 'plain')).toEqual(readFile('plainFormat.diff'));
});

test('testing capslock format', () => {
  expect(gendiff('file1.json', 'file2.json', 'capslock')).toEqual(readFile('capslockFormat.diff'));
});

test('testing json format', () => {
  expect(gendiff('file1.json', 'file2.json', 'json')).toEqual(readFile('jsonFormat.diff'));
>>>>>>> 219a93930d561f99bfbe723e5cfb3b1ef08afae6
});
