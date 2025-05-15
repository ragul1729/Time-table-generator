const TimeTable = require("../models/TimeTable");

const saveTimetable = async (entries) => {
  console.log("Inside time table service");
  console.log(entries);
  const newTable = new TimeTable({ entries });
  return await newTable.save();
};

module.exports = {
  saveTimetable,
};
