/* eslint-disable no-undef */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

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
});
