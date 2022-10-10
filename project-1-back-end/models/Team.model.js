const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    team: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'Player'
        }],
        validate: [playerTeam => playerTeam.length <= 9, 'Fantasy teams have a max size of 9']
    }
})

const Team = mongoose.model('Team', teamSchema, 'Teams');

module.exports = Team;