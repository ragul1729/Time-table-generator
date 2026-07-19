const TimeTable = require("../models/TimeTable");

const saveTimetable = async ({ name, className, section, description, entries, degree, branch }) => {
  console.log("Inside time table service");
  console.log(entries);
  console.log(name);
  const createdAt = new Date();
  const updatedAt = new Date();
  const newTable = new TimeTable({
    name,
    className,
    section,
    description,
    entries,
    createdAt,
    updatedAt,
    degree,
    branch
  });
  return await newTable.save();
};

const getAllTimeTables = async () => {
  return await TimeTable.find({}).sort({ updatedAt: -1, createdAt: -1 });
};

const getTimeTable = async (id) => {
  return await TimeTable.findById(id);
};

const updateTimeTable = async (id, data) => {
  return await TimeTable.findByIdAndUpdate(
    id,
    {
      ...data,
      updatedAt: new Date()
    },
    { new: true, runValidators: true }
  );
};

const deleteTimeTable = async (id) => {
  return await TimeTable.findByIdAndDelete(id);
};

module.exports = {
  saveTimetable,
  getAllTimeTables,
  getTimeTable,
  updateTimeTable,
  deleteTimeTable
};
