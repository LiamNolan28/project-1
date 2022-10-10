const Player = require('../models/Player.model.js');

const findAllPlayers = async () => await Player.find();

const findPlayerById = async id => {
    try {
        const player = await Player.findById(id);
        if (player == null) {
            throw {status: 204, msg: `No player with id ${id} was found.`}
        }
        return player;
    } catch (err) {
        throw err;
    }
}

const createPlayer = async playerToSave => {
    try {
        const player = new Player(playerToSave);
        await player.save();
        return player;
    } catch (err) {
        throw err;
    }
}

const updatePlayer = async playerToUpdate => {
    try {
        const player = await Player.findByIdAndUpdate(playerToUpdate._id, playerToUpdate);
    } catch (err) {
        throw { status: 400, msg: err };
    }
}

const deletePlayerById = async id => await Player.findByIdAndDelete(id);

module.exports = { findAllPlayers, findPlayerById, createPlayer, updatePlayer, deletePlayerById };