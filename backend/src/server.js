const express = require('express');
const app = express();
const { readProgrammesXml } = require('./utils/ProgrammesXmlHandler');
const { setProgrammes } = require('./utils/configStore');

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const programmesXml = async () => {
  const Programmes= await readProgrammesXml('./config/Programmes.xml');
  console.log(JSON.stringify(Programmes));
  setProgrammes(Programmes)
};
programmesXml(); 

 

