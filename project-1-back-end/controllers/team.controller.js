const Team = require('../models/Team.model.js');

const findAllTeams = async () => await Team.find().populate('team');

const findTeamById = async id => {
    try {
        const team = await Team.findById(id).populate('team');
        if (team == null) {
            throw {status: 204, msg: `No team with id ${id} was found.`}
        }
        return team;
    } catch (err) {
        throw err;
    }
}

const createTeam = async teamToSave => {
    try {
        const team = new Team(teamToSave);
        await team.save();
        return team;
    } catch (err) {
        throw { status: 500, msg: err.message };
    }
};

const updateTeam = async teamToUpdate => {
    try {
        const team = await Team.findByIdAndUpdate(teamToUpdate._id, teamToUpdate);
    } catch (err) {
        throw { status: 400, msg: err};
    }
}

const deleteTeamById = async id => await Team.findByIdAndDelete(id);

module.exports = { findAllTeams, findTeamById, createTeam, updateTeam, deleteTeamById };