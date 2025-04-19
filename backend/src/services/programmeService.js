const { getProgrammes } = require("../utils/configStore");

const getAllProgrammes = async () => {
    const programmes = await getProgrammes();
    const degrees = programmes.Programmes.Degree.map(degree => {
        return degree.Name;
    });
    console.log(degrees);
    const degreesAndBranches = programmes.Programmes.Degree.map(degree => {
        const name = degree.Name;
        const branches = degree.Branches[0].Branch;
        return {
          name,
          branches
        };
    });
    console.log(degreesAndBranches);
    return { degrees, degreesAndBranches};
}

module.exports = {getAllProgrammes};