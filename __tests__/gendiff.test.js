/* eslint-disable no-undef */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import stylish from '../src/stylish.js';
import plain from '../src/plain.js';
import gendiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

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
});
