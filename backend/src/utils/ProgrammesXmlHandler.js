const fs = require('fs');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

exports.readProgrammesXml = async (filePath) => {
  const xml = fs.readFileSync(filePath, 'utf-8', (err, data) => {
    if(err){
        console.log(err);
        throw err;
    }
  });
  const result = await parser.parseStringPromise(xml);
  return result;
};