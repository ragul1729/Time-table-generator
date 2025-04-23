const express = require('express');
const app = express();
const cors = require('cors');
const { readProgrammesXml } = require('./utils/ProgrammesXmlHandler');
const { setProgrammes } = require('./utils/configStore');
const { connectDB } = require("./utils/db");

const courseRoutes = require("./routes/courseRoutes");
const lectureSlotRoutes = require("./routes/lectureSlotRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const previousTimeTableRoutes = require("./routes/previousTimeTableRoutes");
const programmeRoutes = require("./routes/programmeRoutes");

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use("/programmes", programmeRoutes);
app.use("/lectureslots", lectureSlotRoutes);
app.use("/sections", sectionRoutes);
app.use("/courses", courseRoutes);
app.use("/previoustimetables", previousTimeTableRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

connectDB(); 

const programmesXml = async () => {
  const Programmes= await readProgrammesXml('./config/Programmes.xml');
  console.log(JSON.stringify(Programmes));
  setProgrammes(Programmes)
};
programmesXml(); 


 

