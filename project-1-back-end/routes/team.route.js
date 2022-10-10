const router = require('express').Router();
const { findAllTeams, findTeamById, createTeam, updateTeam, deleteTeamById } = require('../controllers/team.controller.js');
const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(204).send();
    } else {
        next();
    }
}

// FIND ALL TEAMS
router.get('/', async (req, res) => {
    try {
        const teams = await findAllTeams();
        res.status(200).json(teams);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET TEAM BY ID
router.get('/:id', validateObjectId, async (req, res) => {
    try {
        const team = await findTeamById(req.params.id);
        res.json(team);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
})

router.post('/', async (req, res) => {
    try {
        const team = await createTeam(req.body);
        res.status(201).json(team);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

router.put('/:id', validateObjectId, async (req, res) => {
    try {
        const team = await updateTeam(req.body);
        res.status(204).json(team);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
})

router.delete('/:id', validateObjectId, async (req, res) => {
    try {
        await deleteTeamById(req.params.id);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
})

module.exports = router;