// accesses a variable inside of proccess.env, throwing an error if it's not found
// always run this method in advance
// caching proccess.env

const cache: { [key: string]: string } = {};

const accessEnv = (key: string, defaultValue: string) => {
  // check if key is undefined to make sure we are caching a key
  if (!(key in process.env) || typeof key === undefined) {
    if (defaultValue) return defaultValue;
    throw new Error(`${key} not found in proccess.env!`);
  }

  if (!(key in cache)) {
    // at this point key is a string so we cast it as it
    cache[key] = process.env[key] as string;
  }

  return cache[key];
};

export default accessEnv;
