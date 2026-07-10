const TimeTable = require("../models/TimeTable");

const saveTimetable = async (name, entries, degree, branch) => {
  console.log("Inside time table service");
  console.log(entries);
  console.log(name);
  const createdAt = new Date();
  const updatedAt = new Date();
  const newTable = new TimeTable({ name, entries, createdAt, updatedAt, degree, branch});
  return await newTable.save();
};

const getAllTimeTables = async () => {
  return await TimeTable.find({});
};

module.exports = {
  saveTimetable, getAllTimeTables
};
