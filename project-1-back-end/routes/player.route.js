const router = require('express').Router();
const { findAllPlayers, findPlayerById, createPlayer, updatePlayer, deletePlayerById } = require('../controllers/player.controller.js');
const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(204).send();
    } else {
        next();
    }
}

// GET ALL PLAYERS
router.get('/', async (req, res) => {
    try {
        const Player = await findAllPlayers();
        res.json(Player);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET PLAYER BY ID
router.get('/:id', validateObjectId, async (req, res) => {
    try {
        const player = await findPlayerById(req.params.id);
        res.json(player);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const player = await createPlayer(req.body);
        res.status(201).json(player);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

router.put('/:id', validateObjectId, async (req, res) => {
    try {
        const player = await updatePlayer(req.body);
        res.status(204).json(player);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

router.delete('/:id', validateObjectId, async (req, res) => {
    try {
        await deletePlayerById(req.params.id);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
})

module.exports = router;