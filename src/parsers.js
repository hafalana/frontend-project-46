import yaml from 'js-yaml';

const parseFile = (fileContent, format) => {
  switch (format) {
  case 'json':
    return JSON.parse(fileContent);
  case 'yml':
  case 'yaml':
    return yaml.load(fileContent);
  default:
    throw new Error(`${format} is not supported`);
  }
};

export default parseFile;
