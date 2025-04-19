let cachedProgrammes = null;

exports.setProgrammes = (config) => {
  cachedProgrammes = config;
};

exports.getProgrammes = () => {
  return cachedProgrammes;
};
