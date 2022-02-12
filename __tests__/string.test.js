/* eslint-disable no-undef */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import stringify from '../src/decisionOfValik.js';

const object = { hello: 'world', is: true, nested: 5 };
const json = { hello: 'world', is: true, nested: { count: 5 } };
const json3 = { hello: 'world', is: true, nested: { count: 5, abc: { aaaa: 3333 } } };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('testing primitive files', () => {
  expect(stringify('hello')).toEqual('hello');
});

test('testing object', () => {
  expect(stringify(object)).toEqual(readFile('objectResult.diff'));
});

test('testing json', () => {
  expect(stringify(json, '|-', 2)).toEqual(readFile('jsonResult.diff'));
});

test('testing 3 json', () => {
  expect(stringify(json3, '|-', 2)).toEqual(readFile('jsonResult3.diff'));
});
