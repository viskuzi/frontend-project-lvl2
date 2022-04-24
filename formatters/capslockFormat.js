const capslockFormat = (key, value, depth = 1, REPLACER = '  ', replacersCount = 1) => {
  return `${REPLACER.repeat(replacersCount * depth)}  ${key.toUpperCase()}: ${value.toUpperCase()}`;
};

export default capslockFormat;
