const stringify = (data, replacer = ' ', spacesCount = 1) => {
  if (typeof data !== 'object') {
    return data.toString();
  }
  const lines = [];
  for (const [key, value] of Object.entries(data)) {
    const line = stringify(value, replacer, spacesCount + 2);
    lines.push(`${key}: ${line}`);
  }

  const shiftedLines = lines.map((line) => `\n${replacer.repeat(spacesCount)}${line}`);

  return `{${shiftedLines.join('')}\n${replacer.repeat(spacesCount - 2 <= 0 ? 0 : spacesCount - 2)}}`;
};

export default stringify;

const file = { hello: 'world', is: true, nested: { count: 5 } };
console.log(stringify(file, '|-', 2));
