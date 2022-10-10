const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    team: String,
    position: {
        type: String,
        required: true
    }
});

const Player = mongoose.model('Player', playerSchema, 'Players');

module.exports = Player;