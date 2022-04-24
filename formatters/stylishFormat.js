const stylishFormat = (key, value, depth = 1, REPLACER = '  ', replacersCount = 1) => {
  return `${REPLACER.repeat(replacersCount * depth)}  ${key}: ${value}`;
};

export default stylishFormat;
