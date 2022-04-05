const chooseFormat = (obj, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return obj;
    case 'capslock':
      return obj.toUpperCase();
    default:
      console.log('ERROR. Returned default format');
      return obj;
  } 
};

export default chooseFormat;


//const formatFunction = (depth, replacer, replacersCount)